package com.gifted_moments.api.dto;

import com.gifted_moments.api.entity.Category;

import lombok.Data;

@Data
public class CategoryDto {
    private Long categoryId;
    private String categoryName;
    private String categoryDescription;


    public static CategoryDto fromCategory(Category category) {
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setCategoryId(category.getCategoryId());
        categoryDto.setCategoryName(category.getCategoryName());
        categoryDto.setCategoryDescription(category.getCategoryDescription());

        return categoryDto;
    }

    
}
