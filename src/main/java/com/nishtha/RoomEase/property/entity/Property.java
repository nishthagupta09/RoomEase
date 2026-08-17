package com.nishtha.RoomEase.property.entity;

import com.nishtha.RoomEase.common.enums.GenderType;
import com.nishtha.RoomEase.common.enums.PropertyStatus;
import com.nishtha.RoomEase.room.entity.Room;
import com.nishtha.RoomEase.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="properties")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="property_id")
    private Long propertyId;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User owner;

    private String propertyName;

    private String description;

    private String address;

    private String city;

    private String state;

    private String pincode;

    private String contactInfo;

    private Integer totalRooms;

    private BigDecimal minRent;

    private BigDecimal maxRent;

    @Enumerated(EnumType.STRING)
    private GenderType genderType;

    @Enumerated(EnumType.STRING)
    private PropertyStatus propertyStatus;

    private Boolean hasWifi;

    private Boolean hasFood;

    private Boolean hasParking;

    @OneToMany(
            mappedBy = "property",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<PropertyImage> images = new ArrayList<>();

    @OneToMany(
            mappedBy = "property",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Room> rooms = new ArrayList<>();



}
