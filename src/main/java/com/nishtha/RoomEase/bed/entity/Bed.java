package com.nishtha.RoomEase.bed.entity;

import com.nishtha.RoomEase.common.enums.BedStatus;
import com.nishtha.RoomEase.room.entity.Room;
import jakarta.persistence.*;
        import lombok.*;
        import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "beds")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bedId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @Column(nullable = false)
    private String bedLabel;

    @Column(nullable = false)
    private BigDecimal monthlyRent;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BedStatus status;

}