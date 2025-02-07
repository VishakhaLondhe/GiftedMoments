package com.gifted_moments.api.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gifted_moments.api.dto.ProductDto;
import com.gifted_moments.api.request.ProductRequest;
import com.gifted_moments.api.response.ApiResponse;
import com.gifted_moments.api.service.product.IProductService;
import com.gifted_moments.api.util.Constants;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/products")
public class ProductController {

    private final IProductService productService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllProducts() {
        try {
            List<ProductDto> productList = productService.getAllProducts().stream().map(ProductDto::fromProduct)
                    .toList();
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, productList));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ApiResponse> getProductById(@PathVariable Long productId) {
        try {
            ProductDto product = ProductDto.fromProduct(productService.getProductById(productId));
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, product));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createProduct(@RequestBody ProductRequest createProductRequest) {
        try {
            ProductDto product = ProductDto.fromProduct(productService.createProduct(createProductRequest));
            return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse(Constants.SUCCESS, product));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @PutMapping("/{productId}")
    public ResponseEntity<ApiResponse> updateProduct(@PathVariable Long productId,
            @RequestBody ProductRequest createProductRequest) {
        try {
            ProductDto updatedProduct = ProductDto
                    .fromProduct(productService.updateProduct(productId, createProductRequest));
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, updatedProduct));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable Long productId) {
        try {
            productService.deleteProduct(productId);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, "Product deleted successfully"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<ApiResponse> getProductsByCategoryId(@PathVariable Long categoryId) {
        try {
            List<ProductDto> productList = productService.getProductsByCategoryId(categoryId).stream()
                    .map(ProductDto::fromProduct).toList();
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, productList));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @GetMapping("/occasion/{occasionId}")
    public ResponseEntity<ApiResponse> getProductsByOccasionId(@PathVariable Long occasionId) {
        try {
            List<ProductDto> productList = productService.getProductsByOccasionId(occasionId).stream()
                    .map(ProductDto::fromProduct).toList();
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, productList));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }
}
