package com.gifted_moments.api.dto;

import java.util.Set;
import java.util.stream.Collectors;

import com.gifted_moments.api.entity.Product;
import lombok.Data;

@Data
public class ProductDto {
    private Long productId;
    private String productName;
    private String productDescription;
    private Set<CategoryDto> categories;
    private Set<OccasionDto> occasions;

    public static ProductDto fromProduct(Product product) {
        ProductDto productDto = new ProductDto();
        productDto.setProductId(product.getProductId());
        productDto.setProductName(product.getProductName());
        productDto.setProductDescription(product.getProductDescription());

        productDto.setCategories(
                product.getCategories().stream().map(CategoryDto::fromCategory).collect(Collectors.toSet()));
        productDto.setOccasions(
                product.getOccasions().stream().map(OccasionDto::fromOccasion).collect(Collectors.toSet()));

        return productDto;
    }
}
