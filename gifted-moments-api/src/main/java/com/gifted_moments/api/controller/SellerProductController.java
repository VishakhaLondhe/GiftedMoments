package com.gifted_moments.api.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gifted_moments.api.dto.SellerProductDto;
import com.gifted_moments.api.request.SellerProductRequest;
import com.gifted_moments.api.response.ApiResponse;
import com.gifted_moments.api.service.seller_product.ISellerProductService;
import com.gifted_moments.api.util.Constants;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/seller-products")
public class SellerProductController {
    private final ISellerProductService sellerProductService;

    @PostMapping
    public ResponseEntity<ApiResponse> createSellerProduct(@ModelAttribute SellerProductRequest request) {
        try {
            SellerProductDto sellerProduct = sellerProductService.createSellerProduct(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse(Constants.SUCCESS, sellerProduct));
        } catch (IOException e) {
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getSellerProduct() {
        try {
            List<SellerProductDto> sellerProduct = sellerProductService.getAllSellerProducts();
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, sellerProduct));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @PutMapping("/{sellerProductId}")
    public ResponseEntity<ApiResponse> updateSellerProduct(@PathVariable Long sellerProductId,
            @ModelAttribute SellerProductRequest request) {
        try {
            SellerProductDto sellerProduct = sellerProductService.updateSellerProduct(sellerProductId, request);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, sellerProduct));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @DeleteMapping("/{sellerProductId}")
    public ResponseEntity<ApiResponse> deleteSellerProduct(@PathVariable Long sellerProductId) {
        try {
            sellerProductService.deleteSellerProduct(sellerProductId);
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(new ApiResponse(Constants.SUCCESS, "Seller product deleted successfully"));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @GetMapping("/{sellerProductId}")
    public ResponseEntity<ApiResponse> getSellerProductById(@PathVariable Long sellerProductId) {
        try {
            SellerProductDto sellerProduct = sellerProductService.getSellerProductById(sellerProductId);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, sellerProduct));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<ApiResponse> getSellerProductsByProductId(@PathVariable Long productId) {
        try {
            List<SellerProductDto> products = sellerProductService.getSellerProductsByProductId(productId);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, products));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<ApiResponse> getSellerProductsBySellerId(@PathVariable Long sellerId) {
        try {
            List<SellerProductDto> products = sellerProductService.getSellerProductsBySellerId(sellerId);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, products));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<ApiResponse> getSellerProductsByCategoryId(@PathVariable Long categoryId) {
        try {
            List<SellerProductDto> products = sellerProductService.getSellerProductsByCategoryId(categoryId);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, products));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @GetMapping("/occasion/{occasionId}")
    public ResponseEntity<ApiResponse> getSellerProductsByOccasionId(@PathVariable Long occasionId) {
        try {
            List<SellerProductDto> products = sellerProductService.getSellerProductsByOccasionId(occasionId);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, products));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @GetMapping("/brand/{brandId}")
    public ResponseEntity<ApiResponse> getSellerProductsByBrandId(@PathVariable Long brandId) {
        try {
            List<SellerProductDto> products = sellerProductService.getSellerProductsByBrandId(brandId);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, products));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    @GetMapping("/active/{isActive}")
    public ResponseEntity<ApiResponse> getSellerProductsByIsActive(@PathVariable boolean isActive) {
        try {
            List<SellerProductDto> products = sellerProductService.getSellerProductsByIsActive(isActive);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, products));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }
}
