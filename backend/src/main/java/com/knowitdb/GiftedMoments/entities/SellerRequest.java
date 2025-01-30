package com.knowitdb.GiftedMoments.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SellerRequest {
	private String uname;
	private String email;
    private String password;
    private Long role;
    private String contact;
    private String address;
    private String gstNo;
    private String regNo;
    private String shopname;

}
