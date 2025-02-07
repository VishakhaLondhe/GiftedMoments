package com.gifted_moments.api.dto;

import com.gifted_moments.api.entity.ProductImage;

import lombok.Data;

@Data
public class ProductImageDto {
    private Long imageId;
    private String fileName;
    private String fileType;
    private String downloadUrl;

    public static ProductImageDto fromProductImage(ProductImage productImage) {
        ProductImageDto imageDto = new ProductImageDto();
        imageDto.setImageId(productImage.getImageId());
        imageDto.setFileName(productImage.getFileName());
        imageDto.setFileType(productImage.getFileType());
        imageDto.setDownloadUrl(productImage.getDownloadUrl());
        return imageDto;
    }
}
