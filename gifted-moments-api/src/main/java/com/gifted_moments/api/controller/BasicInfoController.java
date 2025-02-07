package com.gifted_moments.api.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.gifted_moments.api.dto.CategoryDto;
import com.gifted_moments.api.dto.OccasionDto;
import com.gifted_moments.api.entity.Brand;
import com.gifted_moments.api.request.BasicInfoRequest;
import com.gifted_moments.api.response.ApiResponse;
import com.gifted_moments.api.service.basic_info.IBrandService;
import com.gifted_moments.api.service.basic_info.ICategoryService;
import com.gifted_moments.api.service.basic_info.IOccasionService;
import com.gifted_moments.api.util.Constants;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/data")
public class BasicInfoController {

    final IBrandService brandService;
    final ICategoryService categoryService;
    final IOccasionService occasionService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllBrandCategoryOccasion() {
        try {

            Map<String, Object> responseData = new HashMap<>();
            responseData.put("brands", brandService.getAllBrands());
            responseData.put("categories", categoryService.getAllCategories());
            responseData.put("occasions", occasionService.getAllOccasions());

            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, responseData));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    // Get all brands
    @GetMapping("/brands")
    public ResponseEntity<ApiResponse> getAllBrands() {
        try {
            List<Brand> brandList = brandService.getAllBrands();
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, brandList));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    // Create a brand
    @PostMapping("/brands")
    public ResponseEntity<ApiResponse> createBrand(@RequestBody BasicInfoRequest basicInfoRequest) {
        try {
            Brand createdBrand = brandService.createBrand(basicInfoRequest);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, createdBrand));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    // Update a brand
    @PutMapping("/brands/{brandId}")
    public ResponseEntity<ApiResponse> updateBrand(@PathVariable Long brandId,
            @RequestBody BasicInfoRequest basicInfoRequest) {
        try {
            Brand updatedBrand = brandService.updateBrand(brandId, basicInfoRequest);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, updatedBrand));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    // Delete a brand
    @DeleteMapping("/brands/{brandId}")
    public ResponseEntity<ApiResponse> deleteBrand(@PathVariable Long brandId) {
        try {
            brandService.deleteBrand(brandId);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, "Brand deleted successfully"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    // Get all categories
    @GetMapping("/categories")
    public ResponseEntity<ApiResponse> getAllCategories() {
        try {
            List<CategoryDto> categoryList = categoryService.getAllCategories();
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, categoryList));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    // Create a category
    @PostMapping("/categories")
    public ResponseEntity<ApiResponse> createCategory(@RequestBody BasicInfoRequest basicInfoRequest) {
        try {
            CategoryDto createdCategory = categoryService.createCategory(basicInfoRequest);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, createdCategory));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    // Update a category
    @PutMapping("/categories/{categoryId}")
    public ResponseEntity<ApiResponse> updateCategory(@PathVariable Long categoryId,
            @RequestBody BasicInfoRequest basicInfoRequest) {
        try {
            CategoryDto updatedCategory = categoryService.updateCategory(categoryId, basicInfoRequest);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, updatedCategory));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    // Delete a category
    @DeleteMapping("/categories/{categoryId}")
    public ResponseEntity<ApiResponse> deleteCategory(@PathVariable Long categoryId) {
        try {
            categoryService.deleteCategory(categoryId);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, "Category deleted successfully"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    // Get all occasions
    @GetMapping("/occasions")
    public ResponseEntity<ApiResponse> getAllOccasions() {
        try {
            List<OccasionDto> occasionList = occasionService.getAllOccasions();
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, occasionList));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    // Create an occasion
    @PostMapping("/occasions")
    public ResponseEntity<ApiResponse> createOccasion(@RequestBody BasicInfoRequest basicInfoRequest) {
        try {
            OccasionDto createdOccasion = occasionService.createOccasion(basicInfoRequest);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, createdOccasion));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    // Update an occasion
    @PutMapping("/occasions/{occasionId}")
    public ResponseEntity<ApiResponse> updateOccasion(@PathVariable Long occasionId,
            @RequestBody BasicInfoRequest basicInfoRequest) {
        try {
            OccasionDto updatedOccasion = occasionService.updateOccasion(occasionId, basicInfoRequest);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, updatedOccasion));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    // Delete an occasion
    @DeleteMapping("/occasions/{occasionId}")
    public ResponseEntity<ApiResponse> deleteOccasion(@PathVariable Long occasionId) {
        try {
            occasionService.deleteOccasion(occasionId);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, "Occasion deleted successfully"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }
}
