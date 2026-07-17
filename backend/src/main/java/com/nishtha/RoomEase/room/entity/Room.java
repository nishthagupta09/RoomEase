package com.nishtha.RoomEase.room.entity;

import com.nishtha.RoomEase.property.entity.Property;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name="rooms")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id")
    private Property property;

    private String roomNo;

    private String floorNo;

    private Integer capacity;

    private Integer currOccupancy;

    private Boolean hasAc;

    private Boolean hasAttachedBathroom;



}
