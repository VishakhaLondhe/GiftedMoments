package com.gifted_moments.api.service.basic_info;

import java.util.List;

import com.gifted_moments.api.dto.CategoryDto;
import com.gifted_moments.api.request.BasicInfoRequest;

public interface ICategoryService {
    CategoryDto createCategory(BasicInfoRequest basicInfoRequest);

    CategoryDto updateCategory(Long categoryId, BasicInfoRequest basicInfoRequest);

    void deleteCategory(Long categoryId);

    List<CategoryDto> getAllCategories();
}
