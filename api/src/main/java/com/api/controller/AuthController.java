package com.api.controller;

import com.api.model.User;
import com.api.repository.UserRepository;
import com.api.security.JwtUtil;
import com.api.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus; // Import für HttpStatus
import java.util.Map; // Import für Map
import java.util.Optional;
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/auth")
public class AuthController {

    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public AuthController(UserService userService, JwtUtil jwtUtil, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already in use");
        }
        User newUser = userService.registerUser(user);
        return ResponseEntity.ok("User registered successfully");
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User existingUser = userRepository.findByEmail(user.getEmail()).orElseThrow();

        if (!userService.checkPassword(user.getPassword(), existingUser.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }

        String token = jwtUtil.generateToken(existingUser.getEmail());

        return ResponseEntity.ok()
                .header("Authorization", "Bearer " + token)
                .body(token);
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Kein gültiger Token");
        }

        String token = authHeader.substring(7);
        String email = jwtUtil.extractUsername(token);

        return ResponseEntity.ok(Map.of("email", email, "token", token));
    }
    @PutMapping("/updateprofile")
    public ResponseEntity<?> updateProfile(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, String> updates) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Kein gültiger Token");
        }

        String token = authHeader.substring(7);
        String email = jwtUtil.extractUsername(token);

        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Benutzer nicht gefunden");
        }

        User user = optionalUser.get();

        // E-Mail aktualisieren, falls angegeben
        if (updates.containsKey("newEmail") && !updates.get("newEmail").isBlank()) {
            String newEmail = updates.get("newEmail");
            if (userRepository.existsByEmail(newEmail)) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("E-Mail bereits vergeben");
            }
            user.setEmail(newEmail);
        }

        // Passwort aktualisieren, falls angegeben
        if (updates.containsKey("newPassword") && !updates.get("newPassword").isBlank()) {
            String newPassword = updates.get("newPassword");
            user.setPassword(passwordEncoder.encode(newPassword));
        }

        // Änderungen speichern
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "Profil erfolgreich aktualisiert"));
    }


}
