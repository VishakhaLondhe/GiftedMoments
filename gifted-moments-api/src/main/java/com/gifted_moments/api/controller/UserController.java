package com.gifted_moments.api.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gifted_moments.api.entity.Role;
import com.gifted_moments.api.entity.Seller;
import com.gifted_moments.api.entity.User;
import com.gifted_moments.api.exception.ResourceNotFoundException;
import com.gifted_moments.api.request.UserRequest;
import com.gifted_moments.api.response.ApiResponse;
import com.gifted_moments.api.service.role.IRoleService;
import com.gifted_moments.api.service.seller.ISellerService;
import com.gifted_moments.api.service.user.IUserService;
import com.gifted_moments.api.util.Constants;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {

    private final IUserService userService;
    private final ISellerService sellerService;
    final IRoleService roleService;

    @Transactional
    @PostMapping
    public ResponseEntity<ApiResponse> createUser(@RequestBody UserRequest createUserRequest) {
        try {
            Role role = roleService.getRoleById(createUserRequest.getRoleId());

            User user = new User();
            user.setUserName(createUserRequest.getUserName());
            user.setEmailId(createUserRequest.getEmailId());
            user.setPassword(createUserRequest.getPassword());
            user.setContactNo(createUserRequest.getContactNo());
            user.setAddress(createUserRequest.getAddress());
            user.setRole(role);
            User createdUser = userService.createUser(user);

            if (role.getRoleId() == 3L) {
                Seller seller = new Seller();
                seller.setUser(createdUser);
                seller.setShopName(createUserRequest.getSeller().getShopName());
                seller.setGstinNo(createUserRequest.getSeller().getGstinNo());
                seller.setRegistrationNo(createUserRequest.getSeller().getRegistrationNo());
                sellerService.createSeller(seller);
            }
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, "User Created Successfully",createdUser));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    // Update an existing user
    @PutMapping("/{userId}")
    public ResponseEntity<ApiResponse> updateUser(@PathVariable Long userId, @RequestBody User user) {
        try {
            User updatedUser = userService.updateUser(userId, user);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS,"User Updated Successfully", updatedUser));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    // Delete a user
    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable Long userId) {
        try {
            userService.deleteUser(userId);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, "User deleted successfully"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    // Get user by ID
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse> getUserById(@PathVariable Long userId) {
        try {
            User user = userService.getUserById(userId);
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, user));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }

    // Get all users
    @GetMapping
    public ResponseEntity<ApiResponse> getAllUsers() {
        try {
            List<User> users = userService.getAllUsers();
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, users));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        }
    }
}
