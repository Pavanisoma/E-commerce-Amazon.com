const Sequelize = require('sequelize');
const sequelize = require('../db/SQLdatabase');
const Product=require('./Product');
const User=require('./User')

const Seller = sequelize.define('seller', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address1: {
    type: Sequelize.STRING,
  },
  address2: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  country: {
    type: Sequelize.STRING,
  },
  zipcode: {
    type: Sequelize.STRING,
  },
  profilePicUrl: {
    type: Sequelize.STRING,
  },
});

Seller.hasMany(Product);

Seller.belongsTo(User)


module.exports = Seller;
