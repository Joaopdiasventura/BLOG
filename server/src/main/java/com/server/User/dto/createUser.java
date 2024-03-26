package com.server.User.dto;

import org.springframework.lang.NonNull;

import com.server.User.entity.userEntity;

import jakarta.validation.constraints.NotBlank;

public class createUser {
    @NotBlank(message = "Email não pode ficar em branco")
    private String email;
    @NotBlank(message = "Nome não pode ficar em branco")
    private String name;
    @NotBlank(message = "Senha não pode ficar em branco")
    private String password;
    @NonNull
    private Boolean isAdm;

    public createUser(String email, String name, String password) {
        this.isAdm = false;
        this.email = email;
        this.name = name;
        this.password = password;
    }

    public void setPassword(String p){
        this.password = p;
    }

    public String getEmail() {
        return this.email;
    }

    public String getName() {
        return this.name;
    }

    public String getPassword() {
        return this.password;
    }

    public Boolean getIsAdm() {
        return this.isAdm;
    }

    public userEntity toPessoa (){
        return new userEntity(
            this.email,
            this.name,
            this.password,
            this.isAdm
        );
    }

}
