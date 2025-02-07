package com.gifted_moments.api.dto;

import com.gifted_moments.api.entity.Role;

import lombok.Data;

@Data
public class UserDto {
    private Long userId;
    private String userName;
    private String emailId;
    private String password;
    private String contactNo;
    private String address;
    private Role role;

    private Long sellerId;
}
