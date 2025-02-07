package com.gifted_moments.api.service.product;

import java.util.List;

import com.gifted_moments.api.entity.Product;
import com.gifted_moments.api.request.ProductRequest;

public interface IProductService {
    Product createProduct(ProductRequest createProductRequest);

    Product updateProduct(Long productId, ProductRequest createProductRequest);

    void deleteProduct(Long productId);

    List<Product> getAllProducts();

    List<Product> getProductsByCategoryId(Long categoryId);

    Product getProductById(Long productId);

    List<Product> getProductsByOccasionId(Long occasionId);
}
