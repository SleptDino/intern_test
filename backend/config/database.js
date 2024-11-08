const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('leave_requests', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
