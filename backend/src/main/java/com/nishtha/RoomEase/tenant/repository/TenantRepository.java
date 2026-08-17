package com.nishtha.RoomEase.tenant.repository;

import com.nishtha.RoomEase.common.enums.TenantStatus;
import com.nishtha.RoomEase.property.entity.Property;
import com.nishtha.RoomEase.tenant.entity.Tenant;
import com.nishtha.RoomEase.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface TenantRepository extends JpaRepository<Tenant, Long> {

    Optional<Tenant> findByUserAndStatus(User user, TenantStatus status);

    List<Tenant> findByPropertyAndStatus(Property property, TenantStatus status);

    long countByPropertyOwnerAndStatus(User owner, TenantStatus status);

    @Query("""
       SELECT COALESCE(SUM(t.monthlyRent), 0)
       FROM Tenant t
       WHERE t.property.owner.userId = :ownerId
       AND t.status = :status
       """)
    BigDecimal sumMonthlyRentByOwnerAndStatus(
            @Param("ownerId") Long ownerId,
            @Param("status") TenantStatus status
    );

}