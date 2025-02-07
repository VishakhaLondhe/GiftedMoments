package com.gifted_moments.api.dto;

import com.gifted_moments.api.entity.Role;

import lombok.Data;

@Data
public class SellerDto {

    private Long sellerId;

    private String registrationNo;
    private String gstinNo;
    private String shopName;

    private Long userId;
    private String userName;

    private String emailId;
    private String password;
    private String contactNo;
    private String address;

    private Role role;
}
