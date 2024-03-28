package com.server.User;

import com.server.http.exception;
import com.server.repository;
import com.server.User.dto.createUser;
import com.server.User.entity.userEntity;

import lombok.NonNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;

@Service
@Validated
public class userService {

    @Autowired
    private repository userRepository;

    public userEntity findUser(@NonNull String email){
        return userRepository.findByEmail(email);
    }

    public userEntity create(@NonNull createUser createUserDTO) {
        userEntity existUser = this.findUser(createUserDTO.getEmail());
        if (existUser != null && Objects.equals(existUser.getEmail(), createUserDTO.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Já existe um usuário cadastrado nesse email");
        }
        userEntity UserEntity = createUserDTO.toUser();
        return userRepository.insert(UserEntity);
    }
}