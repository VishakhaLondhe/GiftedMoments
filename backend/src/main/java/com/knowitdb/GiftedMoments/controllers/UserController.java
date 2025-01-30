package com.knowitdb.GiftedMoments.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.knowitdb.GiftedMoments.entities.Role;
import com.knowitdb.GiftedMoments.entities.User;
import com.knowitdb.GiftedMoments.entities.UserRequest;
import com.knowitdb.GiftedMoments.repositories.RoleRepository;
import com.knowitdb.GiftedMoments.services.UserService;


@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
	private RoleRepository roleRepository;

    //A method to handle user login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User loggedInUser = userService.login(user.getEmail(), user.getPassword());
        
        if (loggedInUser != null) {
            return ResponseEntity.ok(loggedInUser); // Return the entire user object
        } else {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }
    }

    

    
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserRequest userRequest) {
        try {
            // Map UserRequest to User entity
            User user = new User();
            user.setUname(userRequest.getUname());
            user.setEmail(userRequest.getEmail());
            user.setPassword(userRequest.getPassword());
            user.setContact(userRequest.getContact());
            user.setAddress(userRequest.getAddress());

            
            Role role = roleRepository.findById(userRequest.getRole())
					.orElseThrow(() -> new RuntimeException("Role Not Found"));
			user.setRole(role);
            

            // Save the user via the service layer
            userService.createUser(user);

            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }
  
}

