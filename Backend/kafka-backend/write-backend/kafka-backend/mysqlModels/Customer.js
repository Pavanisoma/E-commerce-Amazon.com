const Sequelize = require('sequelize');
const sequelize = require('../db/SQLdatabase');

const Address = require('./CustomerAddress')
const Card = require('./Card')
const Votes = require('./votes')
const Comments = require('./Comments')
const Product = require('./Product');
const Cart = require('./Cart');

const User=require('./User')

const Customer = sequelize.define('customer', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  profilePicUrl: {
    type: Sequelize.STRING,
  },

});

Customer.hasMany(Address);
Customer.hasMany(Card);
Customer.hasMany(Votes);
Customer.hasMany(Comments);

Customer.belongsToMany(Product, { through: Cart });

Customer.belongsTo(User);
module.exports = Customer;
