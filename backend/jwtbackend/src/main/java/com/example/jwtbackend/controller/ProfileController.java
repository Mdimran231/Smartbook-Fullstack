package com.example.jwtbackend.controller;

import com.example.jwtbackend.model.User;
import com.example.jwtbackend.repository.UserRepository;
import com.example.jwtbackend.service.ProfileImageService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileImageService profileImageService;
    private final UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(user);
    }

    @PostMapping("/image")
    public ResponseEntity<?> uploadProfileImage(
            @RequestParam("file") MultipartFile file,
            Authentication authentication) throws IOException {

        String email = authentication.getName();

        String imageUrl =
                profileImageService.uploadProfileImage(email, file);

        return ResponseEntity.ok(
                Map.of(
                        "message", "Profile image uploaded successfully",
                        "imageUrl", imageUrl
                )
        );
    }
}