package com.gifted_moments.api.request;


import lombok.Data;

@Data
public class ProductRequest {

    private Long productId;
    private String productName;
    private String productDescription;
    private Long categoryId;
    private Long occasionId;

}
