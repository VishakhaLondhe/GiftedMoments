package com.gifted_moments.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gifted_moments.api.entity.ProductImage;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {

    List<ProductImage> findBySellerProductSellerProductId(Long productId);

}
