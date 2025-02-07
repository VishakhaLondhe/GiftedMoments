package com.gifted_moments.api.dto;

import java.math.BigDecimal;
import java.util.List;

import com.gifted_moments.api.entity.Brand;

import lombok.Data;

@Data
public class SellerProductDto {
    private Long sellerProductId;
    private BigDecimal productPrice;
    private int productQuantity;
    private boolean isActive;
    private List<ProductImageDto> images;
    private SellerDto seller;
    private ProductDto product;
    private Brand brand;
}