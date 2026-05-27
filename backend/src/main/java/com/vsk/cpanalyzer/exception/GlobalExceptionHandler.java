package com.vsk.cpanalyzer.exception;

import com.vsk.cpanalyzer.dto.ApiResponseDTO;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

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

        Map<String, String> errors =
                new HashMap<>();

        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error ->

                        errors.put(
                                error.getField(),
                                error.getDefaultMessage()
                        )
                );

        ApiResponseDTO<Object> response =
                new ApiResponseDTO<>(
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

        ApiResponseDTO<Object> response =
                new ApiResponseDTO<>(
                        false,
                        ex.getMessage(),
                        null
                );

        return new ResponseEntity<>(
                response,
                HttpStatus.BAD_REQUEST
        );
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
                        ex.getMessage(),
                        null
                );

        return new ResponseEntity<>(
                response,
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}