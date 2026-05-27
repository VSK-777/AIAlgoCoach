package com.vsk.cpanalyzer.dto;

public class ErrorResponseDTO {

    private String message;

    private int status;

    private boolean success;

    public ErrorResponseDTO() {
    }

    public ErrorResponseDTO(
            String message,
            int status,
            boolean success
    ) {

        this.message = message;

        this.status = status;

        this.success = success;
    }

    public String getMessage() {

        return message;
    }

    public void setMessage(
            String message
    ) {

        this.message = message;
    }

    public int getStatus() {

        return status;
    }

    public void setStatus(
            int status
    ) {

        this.status = status;
    }

    public boolean isSuccess() {

        return success;
    }

    public void setSuccess(
            boolean success
    ) {

        this.success = success;
    }
}