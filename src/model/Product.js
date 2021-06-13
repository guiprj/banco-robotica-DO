const Sequelize = require('sequelize');
const connection = require('../db/config')

const Product = connection.define('products',{
  nameProduct: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageProduct: {
    type: Sequelize.STRING,
    allowNull: true
  },
  priceProduct: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
  
})

//Product.sync({ force: true })

module.exports = Product;