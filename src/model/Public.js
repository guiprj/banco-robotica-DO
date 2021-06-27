const Sequelize = require('sequelize');
const connection = require('../db/config')

const Public = connection.define('publics', {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false
    },
    body: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    created_Id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    created_userName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    created_avatar: {
      type: Sequelize.STRING,
      allowNull: false
    },
    views: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  })
  
  //Public.sync({force: false})

  module.exports = Public;