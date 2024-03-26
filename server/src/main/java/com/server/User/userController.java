package com.server.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.server.User.dto.createUser;
import com.server.User.entity.userEntity;

import lombok.NonNull;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class userController {

    @Autowired
    private userService service;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping()
    public ResponseEntity<userEntity> create(@RequestBody @Validated @NonNull createUser DTO){
        DTO.setPassword(passwordEncoder.encode(DTO.getPassword()));
        
        userEntity user = service.create(DTO);

        return ResponseEntity.ok(user);
    }
}
