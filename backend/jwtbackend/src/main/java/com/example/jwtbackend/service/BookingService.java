package com.example.jwtbackend.service;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import com.example.jwtbackend.model.Booking;
import com.example.jwtbackend.repository.BookingRepository;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    // Create new booking
    public Booking createBooking(Booking booking) {

        // default status
        booking.setStatus("PENDING");

        return bookingRepository.save(booking);
    }

    // Get bookings for specific user
    public List<Booking> getUserBookings(String userId) {
        return bookingRepository.findByUserId(userId);
    }

    // Admin: get all bookings
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // Admin: update booking status
    public Booking updateStatus(String id, String status) {

        Optional<Booking> optional = bookingRepository.findById(id);

        if (optional.isEmpty()) {
            throw new RuntimeException("Booking not found");
        }

        Booking booking = optional.get();
        booking.setStatus(status);

        return bookingRepository.save(booking);
    }

    // Delete booking
    public void deleteBooking(String id) {
        bookingRepository.deleteById(id);
    }
}