package com.example.jwtbackend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

import com.example.jwtbackend.model.Booking;
import com.example.jwtbackend.service.BookingService;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // USER create booking
    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Booking> create(
            @RequestBody Booking booking,
            @AuthenticationPrincipal UserDetails userDetails) {

        String email = userDetails.getUsername();

        booking.setUserId(email);
        booking.setUserName(email); // ✅ NEW LINE (user name save hoga)

        return ResponseEntity.ok(bookingService.createBooking(booking));
    }

    // USER view own bookings
    @GetMapping("/my")
    @PreAuthorize("hasRole('USER')")
    public List<Booking> myBookings(
            @AuthenticationPrincipal UserDetails userDetails) {

        return bookingService.getUserBookings(userDetails.getUsername());
    }

    // ADMIN view all bookings
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Booking> allBookings() {
        return bookingService.getAllBookings();
    }

    // ADMIN update status
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Booking updateStatus(
            @PathVariable String id,
            @RequestParam String status) {

        return bookingService.updateStatus(id, status);
    }

    // ADMIN delete booking
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable String id) {
        bookingService.deleteBooking(id);
    }
}