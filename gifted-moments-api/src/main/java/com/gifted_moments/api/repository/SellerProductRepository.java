package com.gifted_moments.api.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.gifted_moments.api.entity.SellerProduct;

public interface SellerProductRepository extends JpaRepository<SellerProduct, Long> {

   
    List<SellerProduct> findByProductProductId(Long productId);

    List<SellerProduct> findBySellerSellerId(Long sellerId);

    List<SellerProduct> findByProductCategoriesCategoryId(Long categoryId);

    List<SellerProduct> findByIsActive(boolean isActive);

    List<SellerProduct> findByBrandBrandId(Long brandId);

    List<SellerProduct> findByProductOccasionsOccasionId(Long occasionId);
}
