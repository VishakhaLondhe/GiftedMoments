package com.gifted_moments.api.service.basic_info;

import java.util.List;

import com.gifted_moments.api.dto.OccasionDto;
import com.gifted_moments.api.request.BasicInfoRequest;

public interface IOccasionService {
    OccasionDto createOccasion(BasicInfoRequest basicInfoRequest);

    OccasionDto updateOccasion(Long occasionId, BasicInfoRequest basicInfoRequest);

    void deleteOccasion(Long occasionId);

    List<OccasionDto> getAllOccasions();
}
