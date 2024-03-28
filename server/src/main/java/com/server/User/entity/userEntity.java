package com.server.User.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.*;

@Document(collection = "user")
@Getter
@Setter
@Builder
public class userEntity {
    @Id
    private String email;
    private String name;
    private String password;
    private Boolean isAdm;

    public userEntity(String email, String name, String password, Boolean isAdm) {
        this.isAdm = isAdm;
        this.email = email;
        this.name = name;
        this.password = password;
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
}
