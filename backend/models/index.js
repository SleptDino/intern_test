const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('leave_requests', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const LeaveRequest = sequelize.define('LeaveRequest', {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    department: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    leaveType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

sequelize.sync().then(() => {
    console.log("Database synced");
}).catch((error) => {
    console.error("Unable to sync the database:", error);
});

module.exports = { sequelize, LeaveRequest };
