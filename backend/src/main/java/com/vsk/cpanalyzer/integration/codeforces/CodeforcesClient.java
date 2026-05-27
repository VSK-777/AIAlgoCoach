package com.vsk.cpanalyzer.integration.codeforces;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class CodeforcesClient {

    private final RestTemplate restTemplate =
            new RestTemplate();

    // Fetch user profile
    public String fetchUserData(
            String handle
    ) {

        String url =
                "https://codeforces.com/api/user.info?handles="
                        + handle;

        return restTemplate.getForObject(
                url,
                String.class
        );
    }

    // Fetch user submissions
    public String fetchUserSubmissions(
            String handle
    ) {

        String url =
                "https://codeforces.com/api/user.status?handle="
                        + handle;

        return restTemplate.getForObject(
                url,
                String.class
        );
    }

    // Fetch contest history
    public String fetchContestHistory(
            String handle
    ) {

        String url =
                "https://codeforces.com/api/user.rating?handle="
                        + handle;

        return restTemplate.getForObject(
                url,
                String.class
        );
    }
}