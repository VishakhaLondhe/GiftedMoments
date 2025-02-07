package com.gifted_moments.api.service.seller_product;

import java.io.IOException;
import java.util.List;

import com.gifted_moments.api.dto.SellerProductDto;
import com.gifted_moments.api.request.SellerProductRequest;

public interface ISellerProductService {
    SellerProductDto createSellerProduct(SellerProductRequest request) throws IOException;

    SellerProductDto updateSellerProduct(Long sellerProductId, SellerProductRequest request) throws IOException;

    void deleteSellerProduct(Long sellerProductId) throws IOException;

    SellerProductDto getSellerProductById(Long sellerProductId);

    List<SellerProductDto> getAllSellerProducts();
    List<SellerProductDto> getSellerProductsByProductId(Long productId);

    List<SellerProductDto> getSellerProductsBySellerId(Long sellerId);

    List<SellerProductDto> getSellerProductsByCategoryId(Long categoryId);

    List<SellerProductDto> getSellerProductsByOccasionId(Long occasionId);

    List<SellerProductDto> getSellerProductsByBrandId(Long brandId);

    List<SellerProductDto> getSellerProductsByIsActive(boolean isActive);
}
