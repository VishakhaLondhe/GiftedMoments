package com.gifted_moments.api.request;

import lombok.Data;

@Data
public class UserLoginRequest {
    private String emailId;
    private String password;
}
