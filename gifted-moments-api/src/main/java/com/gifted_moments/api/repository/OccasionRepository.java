package com.gifted_moments.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gifted_moments.api.entity.Occasion;

public interface OccasionRepository extends JpaRepository<Occasion, Long> {

    boolean existsByOccasionName(String occasion);

}
