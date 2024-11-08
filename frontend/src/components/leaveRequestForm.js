import React, { useState } from 'react';
import axios from 'axios';
import './LeaveRequestForm.css';

const LeaveRequestForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    department: '',
    email: '',
    phone: '',
    leaveType: 'อื่นๆ',
    reason: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/leave-requests', formData);
      alert('การขอลาหยุดของคุณถูกบันทึกเรียบร้อยแล้ว!');
      setFormData({
        fullName: '',
        department: '',
        email: '',
        phone: '',
        leaveType: 'อื่นๆ',
        reason: '',
        startDate: '',
        endDate: ''
      });
    } catch (error) {
      console.error("Error submitting leave request:", error);
      alert('เกิดข้อผิดพลาด: ' + (error.response?.data?.message || 'ไม่สามารถบันทึกข้อมูลได้'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="fullName"
        placeholder="ชื่อ - นามสกุล"
        value={formData.fullName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="department"
        placeholder="สังกัด/ตำแหน่ง"
        value={formData.department}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="อีเมล์"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="เบอร์โทรศัพท์"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <select name="leaveType" value={formData.leaveType} onChange={handleChange} required>
        <option value="ลาป่วย">ลาป่วย</option>
        <option value="ลากิจ">ลากิจ</option>
        <option value="พักร้อน">พักร้อน</option>
        <option value="อื่นๆ">อื่นๆ</option>
      </select>
      <input
        type="text"
        name="reason"
        placeholder="สาเหตุการลา"
        value={formData.reason}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
        required
      />
      <button type="submit">ส่งคำขอ</button>
    </form>
  );
};

export default LeaveRequestForm;
