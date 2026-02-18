package com.booking.auth.service;

import com.booking.auth.entity.User;
import com.booking.auth.repository.UserRepository;
import com.booking.auth.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {
this.userRepository = userRepository;
this.passwordEncoder = passwordEncoder;
this.jwtUtil = jwtUtil;
}

    // ✅ REGISTER
    public User register(User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // ✅ LOGIN (JWT generation)
    public String login(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // generate JWT token
        return jwtUtil.generateToken(email);
    }
}
