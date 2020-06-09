const Sequelize = require('sequelize');
const sequelize = require('../db/SQLdatabase');
const User=require('./User')

const Admin = sequelize.define('admin', {
  name: {
    type: Sequelize.STRING,
  }
});

Admin.belongsTo(User);

module.exports = Admin;
