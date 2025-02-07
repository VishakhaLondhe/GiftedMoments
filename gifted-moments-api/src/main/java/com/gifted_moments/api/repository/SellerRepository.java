package com.gifted_moments.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gifted_moments.api.entity.Seller;

public interface SellerRepository extends JpaRepository<Seller, Long>{

    Optional<Seller> findByUserUserId(Long userId);

}
