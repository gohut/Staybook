package com.staybook.authservice.service;

import com.staybook.authservice.entity.Role;
import com.staybook.authservice.entity.User;
import com.staybook.authservice.repository.UserRepository;
import com.staybook.authservice.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public String register(String name, String email, String password, Role role) {

        if (userRepository.existsByEmail(email)) {
            if (role == Role.PARTNER || role == Role.SUB_PARTNER) {
                User existingUser = userRepository.findByEmail(email)
                        .orElseThrow(() -> new RuntimeException("User not found"));
                existingUser.setRole(role);
                existingUser.setPassword(passwordEncoder.encode(password));
                userRepository.save(existingUser);
                return "Partner account updated successfully";
            }
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .name(name)
                .email(email)
                .password(passwordEncoder.encode(password))
                .role(role)
                .build();

        userRepository.save(user);

        return "User registered successfully";
    }


    public Map<String, Object> login(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return Map.of(
                "token", jwtUtil.generateToken(email),
                "role", user.getRole().name()
        );
    }

    public String changePassword(String email, String currentPassword, String newPassword) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Invalid current password");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        return "Password updated successfully";
    }
}
