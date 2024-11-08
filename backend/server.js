// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize, LeaveRequest } = require('./models');
const Joi = require('joi'); // ใช้ Joi สำหรับการตรวจสอบข้อมูล
const app = express();

app.use(cors());
app.use(express.json());

// Schema สำหรับตรวจสอบข้อมูลการลางาน
const leaveRequestSchema = Joi.object({
    fullName: Joi.string().required(),
    department: Joi.string().optional().allow(null, ''),
    email: Joi.string().email().optional().allow(null, ''),
    phone: Joi.string().pattern(/^[0-9]+$/).required(),
    leaveType: Joi.string().required(),
    reason: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required()
});

// POST /api/leave-requests - สร้างข้อมูลการลางานใหม่
app.post('/api/leave-requests', async (req, res) => {
    const { error } = leaveRequestSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "ข้อมูลไม่ถูกต้อง", error: error.details[0].message });
    }

    try {
        const newLeaveRequest = await LeaveRequest.create(req.body);
        res.status(201).json(newLeaveRequest);
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "ไม่สามารถบันทึกข้อมูลได้", error: error.message });
    }
});

// GET /api/leave-requests - ดึงข้อมูลการลางานทั้งหมด
app.get('/api/leave-requests', async (req, res) => {
    try {
        const leaveRequests = await LeaveRequest.findAll();
        res.status(200).json(leaveRequests);
    } catch (error) {
        console.error("Error retrieving data:", error);
        res.status(500).json({ message: "ไม่สามารถดึงข้อมูลได้" });
    }
});

const PORT = process.env.PORT || 5000;

// ฟังก์ชันสำหรับเริ่มเซิร์ฟเวอร์
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
        await sequelize.authenticate();
        console.log("Connected to the database successfully.");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
});
