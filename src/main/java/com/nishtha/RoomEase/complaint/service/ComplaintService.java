package com.nishtha.RoomEase.complaint.service;


import com.nishtha.RoomEase.complaint.dto.ComplaintResponse;
import com.nishtha.RoomEase.complaint.dto.CreateComplaintRequest;
import com.nishtha.RoomEase.complaint.dto.UpdateComplaintRequest;

import java.util.List;

public interface ComplaintService {

    ComplaintResponse createComplaint(CreateComplaintRequest request);

    List<ComplaintResponse> getMyComplaints();

    List<ComplaintResponse> getComplaintsForProperty(Long propertyId);

    ComplaintResponse updateComplaint(Long complaintId, UpdateComplaintRequest request);
}