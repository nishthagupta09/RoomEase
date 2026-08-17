package com.nishtha.RoomEase.room.repository;

import com.nishtha.RoomEase.property.entity.Property;
import com.nishtha.RoomEase.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findByProperty(Property property);

}