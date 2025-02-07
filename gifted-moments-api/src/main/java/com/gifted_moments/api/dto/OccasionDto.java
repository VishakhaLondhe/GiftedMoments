package com.gifted_moments.api.dto;

import com.gifted_moments.api.entity.Occasion;

import lombok.Data;

@Data
public class OccasionDto {
    private Long occasionId;
    private String occasionName;

    public static OccasionDto fromOccasion(Occasion occasion) {
        OccasionDto occasionDto = new OccasionDto();
        occasionDto.setOccasionId(occasion.getOccasionId());
        occasionDto.setOccasionName(occasion.getOccasionName());

        return occasionDto;
    }
}
