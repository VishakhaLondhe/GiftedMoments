package com.gifted_moments.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gifted_moments.api.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByOccasionsOccasionId(Long occasionId);

    List<Product> findByCategoriesCategoryId(Long categoryId);

}
