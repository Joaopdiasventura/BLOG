package com.server;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.server.User.entity.userEntity;

public interface repository extends MongoRepository<userEntity, String>{}
