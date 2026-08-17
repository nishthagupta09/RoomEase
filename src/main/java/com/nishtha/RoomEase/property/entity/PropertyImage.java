package com.nishtha.RoomEase.property.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="property_images")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PropertyImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    @Column(name="img_id")
    private Long imageId;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="property_id")
    private Property property;

    private String imageUrl;
}
