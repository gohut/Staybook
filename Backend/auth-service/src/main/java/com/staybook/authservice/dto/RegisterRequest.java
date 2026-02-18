package com.staybook.authservice.dto;

import com.staybook.authservice.entity.Role;
import lombok.Data;

@Data
public class RegisterRequest {

    private String name;
    private String email;
    private String password;
    private Role role;
}
