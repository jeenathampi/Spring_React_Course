package com.example.ppmtool.exceptions;

public class UsernameExceptionResponse {

    private String Username;

    public UsernameExceptionResponse(String username) {
        Username = username;
    }

    public String getUsername() {
        return Username;
    }

    public void setUsername(String username) {
        Username = username;
    }
}
