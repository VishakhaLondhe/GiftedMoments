package com.gifted_moments.api.request;

import lombok.Data;

@Data
public class SellerRequest {
    private Long sellerId;
    private Long userId;
    private String registrationNo;
    private String gstinNo;
    private String shopName;
}
