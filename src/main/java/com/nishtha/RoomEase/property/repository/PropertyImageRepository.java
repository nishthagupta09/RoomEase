package com.nishtha.RoomEase.property.repository;

import com.nishtha.RoomEase.property.entity.Property;
import com.nishtha.RoomEase.property.entity.PropertyImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyImageRepository extends JpaRepository<PropertyImage, Long> {

    List<PropertyImage> findByProperty(Property property);

}