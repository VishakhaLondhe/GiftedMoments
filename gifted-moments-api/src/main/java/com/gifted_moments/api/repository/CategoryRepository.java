package com.gifted_moments.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gifted_moments.api.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    boolean existsByCategoryName(String string);

}
