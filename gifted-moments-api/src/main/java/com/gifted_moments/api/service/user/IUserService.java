package com.gifted_moments.api.service.user;

import java.util.List;

import com.gifted_moments.api.dto.UserDto;
import com.gifted_moments.api.entity.User;



public interface IUserService {
    User createUser(User user);
    User updateUser(Long userId, User user);
    void deleteUser(Long userId);
    User getUserById(Long userId);
    List<User> getAllUsers();
    UserDto login(String userName, String password);
}
