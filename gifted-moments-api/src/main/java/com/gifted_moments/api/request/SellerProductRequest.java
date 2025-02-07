package com.gifted_moments.api.request;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class SellerProductRequest {

    private Long productId;
    private BigDecimal productPrice;
    private int productQuantity;
    private Long brandId;
    private Long sellerId;
    private boolean isActive;
    private List<MultipartFile> productImages;
}