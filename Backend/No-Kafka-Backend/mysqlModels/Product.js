const Sequelize = require('sequelize');
const sequelize = require('../db/SQLdatabase');
const Comments = require('./Comments')
const Votes=require('./votes')

const ProductImages=require('./productImages')

const Product = sequelize.define('product', {
  productName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sellerName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  rating: {
    type: Sequelize.DOUBLE,
  },
  description: {
    type: Sequelize.STRING,
  },
  inventory: {
    type: Sequelize.DOUBLE,
  },
  thumbNail: {
    type: Sequelize.STRING,
  },
});

Product.hasMany(Comments);
Product.hasMany(Votes);

Product.hasMany(ProductImages)


module.exports = Product;
