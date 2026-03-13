package com.example.jwtbackend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/demo")
public class DemoController {

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER')")
    public String user() {
        return "Hello USER";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String admin() {
        return "Hello ADMIN";
    }
}