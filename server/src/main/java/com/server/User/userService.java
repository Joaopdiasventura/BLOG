package com.server.User;

import com.server.repository;
import com.server.User.dto.createUser;
import com.server.User.entity.userEntity;

import lombok.NonNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

@Service
@Validated
public class userService {

    @Autowired
    private repository userRepository;

    public userEntity create(@NonNull createUser createUserDTO) {
        userEntity UserEntity = createUserDTO.toPessoa();
            return userRepository.insert(UserEntity);
    }
}
