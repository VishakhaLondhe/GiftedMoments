package com.gifted_moments.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gifted_moments.api.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmailId(String userName);

    Optional<User> findByEmailId(String emailId);

    List<User> findByRoleRoleId(long l);

}












