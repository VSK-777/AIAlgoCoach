package com.vsk.cpanalyzer.integration;

import com.vsk.cpanalyzer.dto.CFRatingChange;
import com.vsk.cpanalyzer.dto.CFResponse;
import com.vsk.cpanalyzer.dto.CFSubmission;
import com.vsk.cpanalyzer.dto.CFUserInfo;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
public class CodeforcesService {

    private final RestClient restClient;
    private static final String BASE_URL = "https://codeforces.com/api/";

    public CodeforcesService(RestClient restClient) {
        this.restClient = restClient;
    }

    public CFUserInfo getUserInfo(String handle) {
        String url = BASE_URL + "user.info?handles=" + handle;
        
        ParameterizedTypeReference<CFResponse<CFUserInfo>> responseType = 
                new ParameterizedTypeReference<>() {};
                
        CFResponse<CFUserInfo> response = restClient.get()
                .uri(url)
                .retrieve()
                .body(responseType);
        
        if (response != null && "OK".equals(response.getStatus()) && !response.getResult().isEmpty()) {
            return response.getResult().get(0);
        }
        throw new RuntimeException("Could not fetch user info for handle: " + handle);
    }

    public List<CFSubmission> getUserSubmissions(String handle) {
        String url = BASE_URL + "user.status?handle=" + handle;
        
        ParameterizedTypeReference<CFResponse<CFSubmission>> responseType = 
                new ParameterizedTypeReference<>() {};
                
        CFResponse<CFSubmission> response = restClient.get()
                .uri(url)
                .retrieve()
                .body(responseType);
        
        if (response != null && "OK".equals(response.getStatus())) {
            return response.getResult();
        }
        throw new RuntimeException("Could not fetch submissions for handle: " + handle);
    }

    public List<CFRatingChange> getUserRatingHistory(String handle) {
        String url = BASE_URL + "user.rating?handle=" + handle;
        
        ParameterizedTypeReference<CFResponse<CFRatingChange>> responseType = 
                new ParameterizedTypeReference<>() {};
                
        CFResponse<CFRatingChange> response = restClient.get()
                .uri(url)
                .retrieve()
                .body(responseType);
        
        if (response != null && "OK".equals(response.getStatus())) {
            return response.getResult();
        }
        throw new RuntimeException("Could not fetch rating history for handle: " + handle);
    }
}
