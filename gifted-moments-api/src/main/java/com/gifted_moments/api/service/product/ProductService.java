package com.gifted_moments.api.service.product;

import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;
import com.gifted_moments.api.entity.Category;
import com.gifted_moments.api.entity.Occasion;
import com.gifted_moments.api.entity.Product;
import com.gifted_moments.api.repository.CategoryRepository;
import com.gifted_moments.api.repository.OccasionRepository;
import com.gifted_moments.api.repository.ProductRepository;
import com.gifted_moments.api.request.ProductRequest;
import com.gifted_moments.api.util.Constants;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService {

    private final ProductRepository productRepository;

    private final CategoryRepository categoryRepository;

    private final OccasionRepository occasionRepository;

    @Override
    public Product createProduct(ProductRequest createProductRequest) {
        Category category = categoryRepository.findById(createProductRequest.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));

        Occasion occasion = occasionRepository.findById(createProductRequest.getOccasionId())
                .orElseThrow(() -> new IllegalArgumentException("Occasion not found"));

        Product product = new Product();
        product.setProductName(createProductRequest.getProductName());
        product.setProductDescription(createProductRequest.getProductDescription());

        product.setCategories(Set.of(category));

        product.setOccasions(Set.of(occasion));

        product = productRepository.save(product);

        return product;
    }

    @Override
    public Product updateProduct(Long productId, ProductRequest request) {
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException(Constants.NOT_FOUND));

        existingProduct.setProductName(request.getProductName());
        existingProduct.setProductDescription(request.getProductDescription());

        // Update Category
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));
        existingProduct.getCategories().clear();
        existingProduct.getCategories().add(category);

        // Update Occasion
        Occasion occasion = occasionRepository.findById(request.getOccasionId())
                .orElseThrow(() -> new IllegalArgumentException("Occasion not found"));
        existingProduct.getOccasions().clear();
        existingProduct.getOccasions().add(occasion);

        return productRepository.save(existingProduct);
    }

    @Override
    public void deleteProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException(Constants.NOT_FOUND));

        productRepository.delete(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> getProductsByCategoryId(Long categoryId) {
        return productRepository.findByCategoriesCategoryId(categoryId);
    }

    @Override
    public Product getProductById(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException(Constants.NOT_FOUND));
    }

    @Override
    public List<Product> getProductsByOccasionId(Long occasionId) {
        return productRepository.findByOccasionsOccasionId(occasionId);
    }
}
