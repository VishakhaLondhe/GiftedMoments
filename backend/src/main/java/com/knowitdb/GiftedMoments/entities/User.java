package com.knowitdb.GiftedMoments.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "login")
public class User {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-generated primary key
    @Column(name = "user_id")
    private int userId;

    @Column(name = "uname", nullable = false)
    private String uname;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "role_id")
    @JsonIgnoreProperties("users")
    private Role role;  // One Role can have many Users

    @Column(name = "contact")
    private String contact;

    @Column(name = "address")
    private String address;
    
    @JsonIgnore
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Seller seller;
    
 // Adding helper method for bidirectional relationship
    public void setSeller(Seller seller) {
        this.seller = seller;
        if (seller != null) {
            seller.setUser(this);
        }
    }

}
