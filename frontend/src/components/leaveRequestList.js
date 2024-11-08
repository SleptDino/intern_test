import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeaveRequestList = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/leave-requests');
      setLeaveRequests(response.data);
    } catch (error) {
      console.error("There was an error fetching the leave requests!", error);
      alert('เกิดข้อผิดพลาดในการดึงข้อมูลคำขอลาหยุด');
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  return (
    <div>
      {leaveRequests.length > 0 ? (
        leaveRequests.map((request) => (
          <div key={request.id}>
            <p>ชื่อ: {request.fullName}</p>
            <p>ประเภทการลา: {request.leaveType}</p>
            <p>วันที่ลา: {request.startDate} ถึง {request.endDate}</p>
            <p>สถานะ: {request.status}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>ไม่มีคำขอลาหยุด</p>
      )}
    </div>
  );
};

export default LeaveRequestList;
