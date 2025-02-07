package com.gifted_moments.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gifted_moments.api.entity.Brand;

public interface BrandRepository extends JpaRepository<Brand, Long> {

    boolean existsByBrandName(String brand);

}
