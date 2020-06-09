const Sequelize = require('sequelize');
const sequelize = require('../db/SQLdatabase');

const Cart = sequelize.define('cart', {

  
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  flag:{
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

module.exports = Cart;
