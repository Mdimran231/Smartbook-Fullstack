package com.example.jwtbackend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.jwtbackend.model.User;
import com.example.jwtbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ProfileImageService {

    private final Cloudinary cloudinary;
    private final UserRepository userRepository;

    public String uploadProfileImage(
            String email,
            MultipartFile file) throws IOException {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Map uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap(
                        "folder", "smartbook/profile-images"
                )
        );

        String imageUrl = uploadResult.get("secure_url").toString();

        user.setProfileImageUrl(imageUrl);

        userRepository.save(user);

        return imageUrl;
    }
}