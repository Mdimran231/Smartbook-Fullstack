package com.example.jwtbackend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import com.example.jwtbackend.model.Booking;

public interface BookingRepository extends MongoRepository<Booking, String> {
    List<Booking> findByUserId(String userId);
}