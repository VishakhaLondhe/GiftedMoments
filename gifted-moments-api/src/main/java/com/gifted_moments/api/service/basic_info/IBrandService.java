package com.gifted_moments.api.service.basic_info;

import java.util.List;

import com.gifted_moments.api.entity.Brand;
import com.gifted_moments.api.request.BasicInfoRequest;

public interface IBrandService {
    Brand createBrand(BasicInfoRequest basicInfoRequest);
    Brand updateBrand(Long brandId, BasicInfoRequest basicInfoRequest);
    void deleteBrand(Long brandId);
    List<Brand> getAllBrands();
}
