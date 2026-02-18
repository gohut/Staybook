package com.booking.auth.controller;

import com.booking.auth.entity.User;
import com.booking.auth.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    // ✅ MANUAL CONSTRUCTOR (fixes error)
    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    @PostMapping("/login")
    public String login(@RequestBody User request) {
        return authService.login(
                request.getEmail(),
                request.getPassword()
        );
    }

    
    
    

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return authService.register(user);
    }
}
