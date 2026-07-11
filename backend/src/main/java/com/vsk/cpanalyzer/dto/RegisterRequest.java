package com.vsk.cpanalyzer.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    
    @NotBlank(message = "Username is required.")
    @Size(min = 3, max = 30, message = "Username must be between 3 and 30 characters.")
    @Pattern(regexp = "^[A-Za-z0-9_.]+$", message = "Username may contain only letters, numbers, underscores (_) and periods (.).")
    @Pattern(regexp = "^[^\\s]*$", message = "Spaces are not allowed.")
    private String username;
    
    @NotBlank(message = "Password is required.")
    @Size(min = 8, max = 64, message = "Password must be between 8 and 64 characters.")
    @Pattern(regexp = ".*[A-Z].*", message = "Password must contain at least one uppercase letter.")
    @Pattern(regexp = ".*[a-z].*", message = "Password must contain at least one lowercase letter.")
    @Pattern(regexp = ".*\\d.*", message = "Password must contain at least one number.")
    @Pattern(regexp = ".*[^a-zA-Z\\d\\s].*", message = "Password must contain at least one special character.")
    private String password;
    
    @NotBlank(message = "Codeforces handle is required.")
    @Size(min = 1, max = 30, message = "Codeforces handle must be between 1 and 30 characters.")
    @Pattern(regexp = "^[A-Za-z0-9_.-]+$", message = "Invalid Codeforces handle.")
    private String codeforcesHandle;
}
