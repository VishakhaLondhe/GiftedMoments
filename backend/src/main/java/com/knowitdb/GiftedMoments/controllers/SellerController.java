package com.knowitdb.GiftedMoments.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.knowitdb.GiftedMoments.entities.Role;
import com.knowitdb.GiftedMoments.entities.Seller;
import com.knowitdb.GiftedMoments.entities.SellerRequest;
import com.knowitdb.GiftedMoments.entities.User;
import com.knowitdb.GiftedMoments.repositories.RoleRepository;
import com.knowitdb.GiftedMoments.repositories.SellerRepository;
import com.knowitdb.GiftedMoments.repositories.UserRepository;

@RestController
@RequestMapping("/sellers")
public class SellerController {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private SellerRepository sellerRepository;

	@PostMapping("/create")
	public ResponseEntity<String> createSeller(@RequestBody SellerRequest sellerRequest) {
		try {
			// Create User entity
			User user = new User();
			user.setUname(sellerRequest.getUname());
			user.setEmail(sellerRequest.getEmail());
			user.setPassword(sellerRequest.getPassword());
			user.setContact(sellerRequest.getContact());
			user.setAddress(sellerRequest.getAddress());

			Role role = roleRepository.findById(sellerRequest.getRole())
					.orElseThrow(() -> new RuntimeException("Role Not Found"));
			user.setRole(role);
 
			// Create Seller entity
			Seller seller = new Seller();

			seller.setGstNo(sellerRequest.getGstNo());
			seller.setRegNo(sellerRequest.getRegNo());
			seller.setShopname(sellerRequest.getShopname());

			// Establish bidirectional relationship
			user.setSeller(seller);

			// Save only the User; Seller will be saved automatically
			userRepository.save(user);

			return ResponseEntity.ok("Seller created successfully!");
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("Error creating seller: " + e.getMessage());
		}
	}

}
