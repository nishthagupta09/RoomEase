package com.nishtha.RoomEase.bed.repository;

import com.nishtha.RoomEase.bed.entity.Bed;
import com.nishtha.RoomEase.common.enums.BedStatus;
import com.nishtha.RoomEase.room.entity.Room;
import com.nishtha.RoomEase.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BedRepository extends JpaRepository<Bed,Long> {
    List<Bed> findByRoom(Room room);

    boolean existsByRoomAndBedLabel(Room room, String bedLabel);

    long countByRoom(Room room);

    long countByRoomPropertyOwner(User owner);

    long countByRoomPropertyOwnerAndStatus(User owner,BedStatus status);
}
