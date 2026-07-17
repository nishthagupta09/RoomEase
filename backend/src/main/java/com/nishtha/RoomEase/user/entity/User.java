package com.nishtha.RoomEase.user.entity;

import com.nishtha.RoomEase.common.enums.Role;
import com.nishtha.RoomEase.property.entity.Property;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="user_id")
    private Long userId;

    private String fullName;

    @Column(unique = true)
    private String email;

    @Column(unique=true)
    private String phone;

    private String passwordHash;

    private String pfpUrl;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private UserStatus status;

    @Column(name="is_verified")
    private boolean isVerified;

    @Column(name="profile_completed")
    private boolean profileCompleted;

    public enum UserStatus{
        ACTIVE,INACTIVE
    }

    @OneToMany(
            mappedBy = "owner",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Property> properties = new ArrayList<>();

}
