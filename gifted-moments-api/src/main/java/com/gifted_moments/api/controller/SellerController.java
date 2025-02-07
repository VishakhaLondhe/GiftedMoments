package com.gifted_moments.api.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gifted_moments.api.dto.SellerDto;
import com.gifted_moments.api.request.SellerRequest;
import com.gifted_moments.api.response.ApiResponse;
import com.gifted_moments.api.service.seller.ISellerService;
import com.gifted_moments.api.util.Constants;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/seller")
public class SellerController {
    private final ISellerService sellerService;

    // Get a seller by ID
    @GetMapping("/{sellerId}")
    public ResponseEntity<ApiResponse> getSellerById(@PathVariable Long sellerId) {
        try {
            SellerDto seller = sellerService.getSellerById(sellerId);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, seller));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(Constants.ERROR, "Seller not found with ID: " + sellerId));
        }
    }

    

    // Update an existing seller
    @PutMapping("/{sellerId}")
    public ResponseEntity<ApiResponse> updateSeller(@PathVariable Long sellerId,
            @RequestBody SellerRequest sellerRequest) {
        try {
            SellerDto updatedSeller = sellerService.updateSeller(sellerId, sellerRequest);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, updatedSeller));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    // Delete a seller by ID
    @DeleteMapping("/{sellerId}")
    public ResponseEntity<ApiResponse> deleteSeller(@PathVariable Long sellerId) {
        try {
            sellerService.deleteSeller(sellerId);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, "Seller deleted successfully"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(Constants.ERROR, "Seller not found with ID: " + sellerId));
        }
    }

    // Get all sellers
    @GetMapping
    public ResponseEntity<ApiResponse> getAllSellers() {
        try {
            List<SellerDto> sellers = sellerService.getAllSellers();
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, sellers));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }
}
