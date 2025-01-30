package com.knowitdb.GiftedMoments.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.knowitdb.GiftedMoments.entities.User;
import com.knowitdb.GiftedMoments.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Existing methods...

    public User login(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }
}