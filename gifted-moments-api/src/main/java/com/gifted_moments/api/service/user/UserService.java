package com.gifted_moments.api.service.user;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.gifted_moments.api.dto.UserDto;
import com.gifted_moments.api.entity.Seller;
import com.gifted_moments.api.entity.User;
import com.gifted_moments.api.exception.ResourceInvalidException;
import com.gifted_moments.api.exception.ResourceNotFoundException;
import com.gifted_moments.api.repository.SellerRepository;
import com.gifted_moments.api.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final UserRepository userRepository;

    private final SellerRepository sellerRepository;

    final ModelMapper modelMapper;

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(Long userId, User user) {
        Optional<User> existingUser = userRepository.findById(userId);
        if (existingUser.isPresent()) {
            User updatedUser = existingUser.get();
            updatedUser.setUserName(user.getUserName());
            updatedUser.setEmailId(user.getEmailId());
            updatedUser.setPassword(user.getPassword());
            updatedUser.setContactNo(user.getContactNo());
            updatedUser.setAddress(user.getAddress());
            return userRepository.save(updatedUser);
        }
        throw new ResourceNotFoundException("User not found with ID: " + userId);
    }

    @Transactional
    @Override
    public void deleteUser(Long userId) {

        userRepository.deleteById(userId);
    }

    @Override
    public User getUserById(Long userId) {

        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findByRoleRoleId(2L);
    }

    @Override
    public UserDto login(String emailId, String password) {
        Optional<User> user = userRepository.findByEmailId(emailId);
        if (user.isPresent()) {
            if (user.get().getPassword().equals(password)) {
                UserDto userDto = modelMapper.map(user.get(), UserDto.class);

                Optional<Seller> optionalSeller = sellerRepository.findByUserUserId(user.get().getUserId());

                return optionalSeller.map(volunteer -> {
                    userDto.setSellerId(volunteer.getSellerId());
                    return userDto;
                }).orElseGet(() -> userDto);

            }
            throw new ResourceInvalidException("Invalid password");
        }
        throw new ResourceNotFoundException("User not found with emailId: " + emailId);
    }

}
