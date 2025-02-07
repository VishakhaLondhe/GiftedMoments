package com.gifted_moments.api.service.seller;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.gifted_moments.api.dto.SellerDto;
import com.gifted_moments.api.entity.Seller;
import com.gifted_moments.api.exception.ResourceNotFoundException;
import com.gifted_moments.api.repository.SellerRepository;
import com.gifted_moments.api.request.SellerRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SellerService implements ISellerService {

    final SellerRepository sellerRepository;
    final ModelMapper modelMapper;

    @Override
    public SellerDto createSeller(Seller seller) {
        return convertToDto(sellerRepository.save(seller));
    }

    @Override
    public SellerDto updateSeller(Long sellerId, SellerRequest seller) {
        Optional<Seller> existingSeller = sellerRepository.findById(sellerId);
        if (existingSeller.isPresent()) {
            Seller updatedSeller = existingSeller.get();
            updatedSeller.setGstinNo(seller.getGstinNo());
            updatedSeller.setShopName(seller.getShopName());
            updatedSeller.setRegistrationNo(seller.getRegistrationNo());
            return convertToDto(sellerRepository.save(updatedSeller));
        }
        throw new ResourceNotFoundException("User not found with ID: " + sellerId);
    }

    @Override
    public void deleteSeller(Long sellerId) {
        sellerRepository.deleteById(sellerId);
    }

    @Override
    public SellerDto getSellerById(Long sellerId) {
        return convertToDto(sellerRepository.findById(sellerId)
                .orElseThrow(() -> new RuntimeException("Seller not found with ID: " + sellerId)));
    }

    @Override
    public List<SellerDto> getAllSellers() {
        return sellerRepository.findAll().stream().map(this::convertToDto).toList();
    }

    public SellerDto convertToDto(Seller seller) {
        SellerDto sellerDto = new SellerDto();
        sellerDto.setSellerId(seller.getSellerId());
        sellerDto.setRegistrationNo(seller.getRegistrationNo());
        sellerDto.setGstinNo(seller.getGstinNo());
        sellerDto.setShopName(seller.getShopName());
        if (seller.getUser() != null) {
            sellerDto.setUserId(seller.getUser().getUserId());
            sellerDto.setUserName(seller.getUser().getUserName());
            sellerDto.setEmailId(seller.getUser().getEmailId());
            sellerDto.setPassword(seller.getUser().getPassword());
            sellerDto.setContactNo(seller.getUser().getContactNo());
            sellerDto.setAddress(seller.getUser().getAddress());
            if (seller.getUser().getRole() != null) {
                sellerDto.setRole(seller.getUser().getRole());
            }
        }

        return sellerDto;
    }

}
