package com.nishtha.RoomEase.application.entity;

import com.nishtha.RoomEase.common.enums.ApplicationStatus;
import com.nishtha.RoomEase.property.entity.Property;
import com.nishtha.RoomEase.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long appId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "property_id")
    private Property property;

    private String preferredRoomType;

    private LocalDate expectedMoveIn;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;

    @Column(columnDefinition = "TEXT")
    private String ownerRemark;

    private LocalDateTime createdAt;

    private LocalDateTime reviewedAt;
}