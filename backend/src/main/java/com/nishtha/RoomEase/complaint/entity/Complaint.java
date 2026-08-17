package com.nishtha.RoomEase.complaint.entity;

import com.nishtha.RoomEase.common.enums.ComplaintStatus;
import com.nishtha.RoomEase.room.entity.Room;
import com.nishtha.RoomEase.tenant.entity.Tenant;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "complaints")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "complaint_id")
    private Long complaintId;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tenant_id", nullable = false)
    private Tenant tenant;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;


    @Column(nullable = false, length = 200)
    private String title;


    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ComplaintStatus status;


    @Column(columnDefinition = "TEXT")
    private String response;


    @Column(
            name = "created_at",
            insertable = false,
            updatable = false
    )
    private LocalDateTime createdAt;


    @Column(
            name = "updated_at",
            insertable = false,
            updatable = false
    )
    private LocalDateTime updatedAt;

}