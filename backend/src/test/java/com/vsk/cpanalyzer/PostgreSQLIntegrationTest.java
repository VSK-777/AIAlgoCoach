package com.vsk.cpanalyzer;

import com.vsk.cpanalyzer.model.*;
import com.vsk.cpanalyzer.repository.*;
import com.zaxxer.hikari.HikariDataSource;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@Testcontainers
@ActiveProfiles("test")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@Disabled("Requires Docker Desktop for Testcontainers")
public class PostgreSQLIntegrationTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15-alpine")
            .withDatabaseName("cpanalyzer_test")
            .withUsername("testuser")
            .withPassword("testpass");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
        registry.add("spring.datasource.driver-class-name", postgres::getDriverClassName);
        registry.add("spring.jpa.hibernate.ddl-auto", () -> "create-drop");
        registry.add("spring.jpa.show-sql", () -> "true");
        registry.add("spring.jpa.properties.hibernate.format_sql", () -> "true");
        registry.add("spring.datasource.hikari.maximum-pool-size", () -> "10");
        registry.add("spring.datasource.hikari.minimum-idle", () -> "2");
        registry.add("spring.datasource.hikari.connection-timeout", () -> "5000");
        registry.add("spring.datasource.hikari.idle-timeout", () -> "600000");
    }

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DataSource dataSource;

    @Autowired
    private PlatformTransactionManager transactionManager;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
    }

    @Test
    @Order(1)
    void testSchemaVerification() throws Exception {
        try (Connection connection = dataSource.getConnection()) {
            DatabaseMetaData metaData = connection.getMetaData();
            String[] expectedTables = {"users"};
            for (String tableName : expectedTables) {
                ResultSet rs = metaData.getTables(null, null, tableName, new String[]{"TABLE"});
                assertThat(rs.next()).as("Table " + tableName + " should exist").isTrue();
            }
        }
    }

    @Test
    @Order(2)
    void testCRUDVerification() {
        // UserRepository CRUD
        User user = User.builder().username("crudUser").password("pass").role(Role.USER).build();
        user = userRepository.save(user);
        assertThat(userRepository.findById(user.getId())).isPresent();
        user.setCodeforcesHandle("crudHandle");
        userRepository.save(user);
        assertThat(userRepository.findByUsername("crudUser").get().getCodeforcesHandle()).isEqualTo("crudHandle");
        userRepository.deleteById(user.getId());
        assertThat(userRepository.existsByUsername("crudUser")).isFalse();
    }

    @Test
    @Order(3)
    void testUniqueConstraints() {
        User user1 = User.builder().username("uniqueUser").password("pass").role(Role.USER).build();
        userRepository.save(user1);

        User user2 = User.builder().username("uniqueUser").password("pass2").role(Role.USER).build();
        assertThrows(DataIntegrityViolationException.class, () -> {
            userRepository.saveAndFlush(user2);
        });
    }

    @Test
    @Order(4)
    void testTransactionRollbacks() {
        TransactionTemplate template = new TransactionTemplate(transactionManager);
        
        try {
            template.execute(status -> {
                User user = User.builder().username("rollbackUser").password("pass").role(Role.USER).build();
                userRepository.save(user);
                
                // Force a rollback
                status.setRollbackOnly();
                return null;
            });
        } catch (Exception ignored) {}

        // Verify partial writes were rolled back
        assertThat(userRepository.findAll()).isEmpty();
    }

    @Test
    @Order(5)
    void testConcurrentDatabaseAccess() throws InterruptedException {
        int threadCount = 20;
        ExecutorService executor = Executors.newFixedThreadPool(threadCount);
        CountDownLatch latch = new CountDownLatch(threadCount);

        long startTime = System.currentTimeMillis();
        for (int i = 0; i < threadCount; i++) {
            final int index = i;
            executor.submit(() -> {
                try {
                    User user = User.builder().username("concurrentUser" + index).password("pass").role(Role.USER).build();
                    userRepository.save(user);
                } finally {
                    latch.countDown();
                }
            });
        }
        
        latch.await(10, TimeUnit.SECONDS);
        long duration = System.currentTimeMillis() - startTime;
        System.out.println("Performance Observation: 20 concurrent inserts took " + duration + "ms");

        assertThat(userRepository.findAll()).hasSize(threadCount);
        executor.shutdown();
    }

    @Test
    @Order(6)
    void testConnectionPoolSettings() {
        assertThat(dataSource).isInstanceOf(HikariDataSource.class);
        HikariDataSource hikari = (HikariDataSource) dataSource;
        
        assertThat(hikari.getMaximumPoolSize()).isEqualTo(10);
        assertThat(hikari.getMinimumIdle()).isEqualTo(2);
        assertThat(hikari.getConnectionTimeout()).isEqualTo(5000);
        assertThat(hikari.getIdleTimeout()).isEqualTo(600000);
    }
}
