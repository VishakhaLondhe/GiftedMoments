package com.gifted_moments.api.service.product_image;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.gifted_moments.api.entity.ProductImage;

public interface IImageService {
    ProductImage createSellerProductImage(Long productId, MultipartFile image);

    ProductImage updateSellerProductImage(Long imageId, MultipartFile image);

    void deleteSellerProductImage(Long imageId);

    List<ProductImage> getImagesBySellerProductId(Long productId);
}
