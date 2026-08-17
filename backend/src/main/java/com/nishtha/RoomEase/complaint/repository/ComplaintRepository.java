package com.nishtha.RoomEase.complaint.repository;

import com.nishtha.RoomEase.common.enums.ComplaintStatus;
import com.nishtha.RoomEase.complaint.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    // All complaints raised by a particular tenant
    List<Complaint> findByTenant_TenantIdOrderByCreatedAtDesc(Long tenantId);


    // All complaints belonging to a particular property
    List<Complaint> findByTenant_Property_PropertyIdOrderByCreatedAtDesc(Long propertyId);


    // Optional: filter property complaints by status
    List<Complaint> findByTenant_Property_PropertyIdAndStatusOrderByCreatedAtDesc(Long propertyId, ComplaintStatus status);

}