package com.nishtha.RoomEase.property.repository;

import com.nishtha.RoomEase.common.enums.PropertyStatus;
import com.nishtha.RoomEase.property.entity.Property;
import com.nishtha.RoomEase.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PropertyRepository extends JpaRepository<Property,Long> {

    List<Property> findByOwner(User owner);
    Optional<Property> findByPropertyIdAndOwner_UserId(
            Long propertyId,
            Long userId
    );

    List<Property> findByPropertyStatus(PropertyStatus propertyStatus);

}
