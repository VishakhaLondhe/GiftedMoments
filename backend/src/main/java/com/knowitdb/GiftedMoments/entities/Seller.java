package com.knowitdb.GiftedMoments.entities;

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

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name="seller")
public class Seller {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seller_id")
    private Long sellerId;

    @Column(name = "reg_no", nullable = false)
    private String regNo;

    @Column(name = "gst_no", nullable = false)
    private String gstNo;

    @Column(name = "shopname", nullable = false)
    private String shopname;

    @OneToOne
    @JoinColumn(name = "u_id", nullable = false)
    private User user;  

}
