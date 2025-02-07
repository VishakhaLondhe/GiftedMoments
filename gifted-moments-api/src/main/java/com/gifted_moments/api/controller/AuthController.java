package com.gifted_moments.api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gifted_moments.api.dto.UserDto;
import com.gifted_moments.api.exception.ResourceInvalidException;
import com.gifted_moments.api.exception.ResourceNotFoundException;
import com.gifted_moments.api.request.UserLoginRequest;
import com.gifted_moments.api.response.ApiResponse;
import com.gifted_moments.api.service.user.IUserService;
import com.gifted_moments.api.util.Constants;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final IUserService userService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody UserLoginRequest request) {
        try {
            UserDto userDto = userService.login(request.getEmailId(), request.getPassword());
            return ResponseEntity.ok(new ApiResponse(Constants.SUCCESS, userDto));
        } catch (ResourceNotFoundException | ResourceInvalidException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(Constants.ERROR, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(Constants.ERROR, "Something went wrong"));
        }
    }
}
