package com.hotel.demo.dto;

import jakarta.validation.constraints.NotBlank;

public class LoginForm {
    @NotBlank(message = "Usuario no debe estar en blanco.")
    private String username;
    @NotBlank(message = "Password no debe estar en blanco.")
    private String password;

    public LoginForm() {
    }

    public LoginForm(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getters y Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
