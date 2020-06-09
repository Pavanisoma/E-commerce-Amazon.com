const Sequelize = require('sequelize');
const sequelize = require('../db/SQLdatabase');

const ProductImages = sequelize.define('productImages', {
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});




module.exports = ProductImages;
