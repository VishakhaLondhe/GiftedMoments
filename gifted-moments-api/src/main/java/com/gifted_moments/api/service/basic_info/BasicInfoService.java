package com.gifted_moments.api.service.basic_info;

import java.util.List;

import org.springframework.stereotype.Service;

import com.gifted_moments.api.dto.CategoryDto;
import com.gifted_moments.api.dto.OccasionDto;
import com.gifted_moments.api.entity.Brand;
import com.gifted_moments.api.entity.Category;
import com.gifted_moments.api.entity.Occasion;
import com.gifted_moments.api.repository.BrandRepository;
import com.gifted_moments.api.repository.CategoryRepository;
import com.gifted_moments.api.repository.OccasionRepository;
import com.gifted_moments.api.request.BasicInfoRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BasicInfoService implements IBrandService, ICategoryService, IOccasionService {

    private final BrandRepository brandRepository;

    private final CategoryRepository categoryRepository;

    private final OccasionRepository occasionRepository;

    // Brand Operations
    @Override
    public Brand createBrand(BasicInfoRequest basicInfoRequest) {
        Brand brand = new Brand();
        brand.setBrandName(basicInfoRequest.getName());
        return brandRepository.save(brand);
    }

    @Override
    public Brand updateBrand(Long brandId, BasicInfoRequest basicInfoRequest) {
        Brand brand = brandRepository.findById(brandId)
                .orElseThrow(() -> new RuntimeException("Brand not found"));
        brand.setBrandName(basicInfoRequest.getName());

        return brandRepository.save(brand);
    }

    @Override
    public void deleteBrand(Long brandId) {
        brandRepository.deleteById(brandId);
    }

    @Override
    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    // Category Operations
    @Override
    public CategoryDto createCategory(BasicInfoRequest basicInfoRequest) {
        Category category = new Category();
        category.setCategoryName(basicInfoRequest.getName());
        category.setCategoryDescription(basicInfoRequest.getDescription());
        categoryRepository.save(category);
        return CategoryDto.fromCategory(category);
    }

    @Override
    public CategoryDto updateCategory(Long categoryId, BasicInfoRequest basicInfoRequest) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        category.setCategoryName(basicInfoRequest.getName());
        category.setCategoryDescription(basicInfoRequest.getDescription());
        categoryRepository.save(category);
        return CategoryDto.fromCategory(category);
    }

    @Override
    public void deleteCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }

    @Override
    public List<CategoryDto> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream().map(CategoryDto::fromCategory).toList();
    }

    // Occasion Operations
    @Override
    public OccasionDto createOccasion(BasicInfoRequest basicInfoRequest) {
        Occasion occasion = new Occasion();
        occasion.setOccasionName(basicInfoRequest.getName());
        occasionRepository.save(occasion);
        return OccasionDto.fromOccasion(occasion);
    }

    @Override
    public OccasionDto updateOccasion(Long occasionId, BasicInfoRequest basicInfoRequest) {
        Occasion occasion = occasionRepository.findById(occasionId)
                .orElseThrow(() -> new RuntimeException("Occasion not found"));
        occasion.setOccasionName(basicInfoRequest.getName());
        occasionRepository.save(occasion);
        return OccasionDto.fromOccasion(occasion);
    }

    @Override
    public void deleteOccasion(Long occasionId) {
        occasionRepository.deleteById(occasionId);
    }

    @Override
    public List<OccasionDto> getAllOccasions() {
        List<Occasion> occasions = occasionRepository.findAll();
        return occasions.stream().map(OccasionDto::fromOccasion).toList();
    }

}
