package com.gifted_moments.api.request;

import lombok.Data;

@Data
public class UserRequest {
    private Long userId;
    private String userName;
    private String emailId;
    private String password;
    private String contactNo;
    private String address;

    private Long roleId;

    private SellerRequest seller;
}
