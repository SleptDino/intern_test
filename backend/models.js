const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('leave_requests', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

// สร้างโมเดล LeaveRequest
const LeaveRequest = sequelize.define('LeaveRequest', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'leave_requests', // ตั้งชื่อของตาราง
    timestamps: true,  // จะเพิ่ม createdAt และ updatedAt ให้โดยอัตโนมัติ
});

// ซิงค์โมเดลกับฐานข้อมูล
sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch((error) => console.error('Unable to sync the database:', error));

module.exports = { sequelize, LeaveRequest };
