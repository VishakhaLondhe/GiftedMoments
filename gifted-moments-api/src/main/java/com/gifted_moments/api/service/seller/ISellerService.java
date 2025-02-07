package com.gifted_moments.api.service.seller;

import java.util.List;

import com.gifted_moments.api.dto.SellerDto;
import com.gifted_moments.api.entity.Seller;
import com.gifted_moments.api.request.SellerRequest;



public interface ISellerService {
    SellerDto createSeller(Seller seller);
    SellerDto updateSeller(Long sellerId, SellerRequest seller);
    void deleteSeller(Long sellerId);
    SellerDto getSellerById(Long sellerId);
    List<SellerDto> getAllSellers();
}
