import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class GroqTest {
    public static void main(String[] args) throws Exception {
        String json = "{\"model\": \"llama-3.3-70b-versatile\", \"messages\": [{\"role\": \"user\", \"content\": \"Hello\"}]}";
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.groq.com/openai/v1/chat/completions"))
                .header("Authorization", "Bearer fake-key")
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .build();

        HttpClient client = HttpClient.newHttpClient();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        
        System.out.println("Status: " + response.statusCode());
        System.out.println("Body: " + response.body());
    }
}
