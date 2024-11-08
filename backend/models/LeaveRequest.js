const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const LeaveRequest = sequelize.define('LeaveRequest', {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  department: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  leaveType: {
    type: DataTypes.ENUM('ลาป่วย', 'ลากิจ', 'พักร้อน', 'อื่นๆ'),
    defaultValue: 'อื่นๆ',
    allowNull: false
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('รอพิจารณา', 'อนุมัติ', 'ไม่อนุมัติ'),
    defaultValue: 'รอพิจารณา'
  }
}, {
  tableName: 'leave_requests',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = LeaveRequest;
