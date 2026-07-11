package com.vsk.cpanalyzer.exception;

import com.vsk.cpanalyzer.dto.ApiResponseDTO;

import com.vsk.cpanalyzer.exception.RateLimitException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Validation Exceptions
    @ExceptionHandler(
            MethodArgumentNotValidException.class
    )
    public ResponseEntity<ApiResponseDTO<Object>>
    handleValidationExceptions(
            MethodArgumentNotValidException ex
    ) {

        Map<String, java.util.List<String>> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error -> {
            errors.computeIfAbsent(error.getField(), k -> new java.util.ArrayList<>())
                  .add(error.getDefaultMessage());
        });

        ApiResponseDTO<Object> response = new ApiResponseDTO<>(
                false,
                "Validation failed",
                errors
        );

        return new ResponseEntity<>(
                response,
                HttpStatus.BAD_REQUEST
        );
    }

    // Runtime Exceptions
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponseDTO<Object>>
    handleRuntimeException(
            RuntimeException ex
    ) {
        String message = ex.getMessage();
        // Mask specific errors to prevent information disclosure
        if (message == null || message.contains("SQL") || message.contains("NullPointer")) {
            message = "An error occurred";
        }

        ApiResponseDTO<Object> response =
                new ApiResponseDTO<>(
                        false,
                        message,
                        null
                );

        return new ResponseEntity<>(
                response,
                HttpStatus.BAD_REQUEST
        );
    }

    // Rate Limit Exceptions
    @ExceptionHandler(RateLimitException.class)
    public ResponseEntity<ApiResponseDTO<Object>>
    handleRateLimitException(
            RateLimitException ex
    ) {
        ApiResponseDTO<Object> response =
                new ApiResponseDTO<>(
                        false,
                        "Too many attempts. Please try again later.",
                        null
                );
        return new ResponseEntity<>(
                response,
                HttpStatus.TOO_MANY_REQUESTS
        );
    }
    
    // Auth Exceptions
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiResponseDTO<Object>>
    handleBadCredentialsException(
            BadCredentialsException ex
    ) {
        ApiResponseDTO<Object> response =
                new ApiResponseDTO<>(
                        false,
                        "Invalid username or password",
                        null
                );
        return new ResponseEntity<>(
                response,
                HttpStatus.UNAUTHORIZED
        );
    }

    @ExceptionHandler(org.springframework.security.access.AccessDeniedException.class)
    public ResponseEntity<ApiResponseDTO<Object>> handleAccessDeniedException(
            org.springframework.security.access.AccessDeniedException ex
    ) {
        ApiResponseDTO<Object> response = new ApiResponseDTO<>(
                false,
                "Access denied.",
                null
        );
        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(org.springframework.web.servlet.resource.NoResourceFoundException.class)
    public ResponseEntity<ApiResponseDTO<Object>> handleNotFoundException(
            org.springframework.web.servlet.resource.NoResourceFoundException ex
    ) {
        ApiResponseDTO<Object> response = new ApiResponseDTO<>(
                false,
                "Requested resource not found.",
                null
        );
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    // Generic Exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponseDTO<Object>>
    handleGenericException(
            Exception ex
    ) {

        ApiResponseDTO<Object> response =
                new ApiResponseDTO<>(
                        false,
                        "Something went wrong. Please try again later.",
                        null
                );

        return new ResponseEntity<>(
                response,
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}