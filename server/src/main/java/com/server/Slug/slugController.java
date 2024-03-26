package com.server.Slug;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/slug")
@CrossOrigin("*")
public class slugController {
    
    @Autowired
    private slugService service;
}
