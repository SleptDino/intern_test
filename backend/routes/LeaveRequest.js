const express = require('express');
const LeaveRequest = require('../models/LeaveRequest');
const router = express.Router();

// สร้างคำขอลาใหม่
router.post('/leave-requests', async (req, res) => {
  const { fullName, department, email, phone, leaveType, reason, startDate, endDate } = req.body;

  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  // ตรวจสอบเงื่อนไขการลาพักร้อน
  if (leaveType === 'พักร้อน') {
    if ((start - today) / (1000 * 60 * 60 * 24) < 3) {
      return res.status(400).json({ message: 'กรุณาลาพักร้อนล่วงหน้าอย่างน้อย 3 วัน' });
    }
    if ((end - start) / (1000 * 60 * 60 * 24) > 2) {
      return res.status(400).json({ message: 'ไม่สามารถลาพักร้อนได้เกิน 2 วันติดต่อกัน' });
    }
  }

  // ตรวจสอบการลาย้อนหลัง
  if (start < today) {
    return res.status(400).json({ message: 'ไม่อนุญาตให้ลาย้อนหลัง' });
  }

  try {
    const newLeaveRequest = await LeaveRequest.create({
      fullName, department, email, phone, leaveType, reason, startDate, endDate
    });
    res.status(201).json(newLeaveRequest);
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
  }
});

// อัปเดตสถานะ
router.put('/leave-requests/:id/status', async (req, res) => {
  const { status } = req.body;
  const leaveRequest = await LeaveRequest.findByPk(req.params.id);

  if (!leaveRequest || leaveRequest.status !== 'รอพิจารณา') {
    return res.status(400).json({ message: 'สามารถปรับสถานะได้เฉพาะคำขอที่รอพิจารณาเท่านั้น' });
  }

  leaveRequest.status = status;
  await leaveRequest.save();
  res.json(leaveRequest);
});

module.exports = router;
