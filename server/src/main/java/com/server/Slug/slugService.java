package com.server.Slug;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.server.repository;

@Service
@Validated
public class slugService {
    
    @Autowired
    private repository userRepository;
}
