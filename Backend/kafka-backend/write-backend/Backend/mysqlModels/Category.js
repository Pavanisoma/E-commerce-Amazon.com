const Sequelize = require('sequelize');
const sequelize = require('../db/SQLdatabase');
const Product=require('./Product');

const Category = sequelize.define('category', {
  categoryName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});


Category.hasMany(Product);



module.exports = Category;
