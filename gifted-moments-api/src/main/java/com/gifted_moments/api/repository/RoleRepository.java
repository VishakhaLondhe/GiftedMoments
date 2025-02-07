package com.gifted_moments.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gifted_moments.api.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

    boolean existsByRoleName(String role);

}
