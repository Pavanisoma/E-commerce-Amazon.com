const Sequelize = require('sequelize');

const db = new Sequelize('amazon', 'admin', 'amazon123', {
    host: 'amazon.c9dc4qxfj8jx.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });

  db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  //db.sync({force: true});

  module.exports = db;
