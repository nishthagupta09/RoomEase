package com.nishtha.RoomEase.application.repository;

import com.nishtha.RoomEase.application.entity.Application;
import com.nishtha.RoomEase.common.enums.ApplicationStatus;
import com.nishtha.RoomEase.property.entity.Property;
import com.nishtha.RoomEase.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application,Long> {

    boolean existsByUserAndPropertyAndStatus(
            User user,
            Property property,
            ApplicationStatus status
    );
    List<Application> findByUser(User user);
    List<Application> findByProperty(Property property);
}
