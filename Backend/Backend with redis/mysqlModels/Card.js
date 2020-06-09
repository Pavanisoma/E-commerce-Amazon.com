const Sequelize = require('sequelize');
const sequelize = require('../db/SQLdatabase');

const Card = sequelize.define('card', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cardNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  expirationDate: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cvv: {
    type: Sequelize.STRING,
  },
});

module.exports = Card;
