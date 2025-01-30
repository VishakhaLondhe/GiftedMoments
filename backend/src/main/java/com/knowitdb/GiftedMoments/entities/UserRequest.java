package com.knowitdb.GiftedMoments.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
	    private String uname;
	    private String email;
	    private String password;
	    private long role; 
	    private String contact;
	    private String address;
	

}
