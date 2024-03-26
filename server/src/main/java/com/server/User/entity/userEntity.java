package com.server.User.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.*;

@Document(collection = "user")
@Getter
@Setter
@AllArgsConstructor
@Builder
public class userEntity {
    @Id
    private String email;
    private String name;
    private String password;
    private Boolean isAdm;
}
