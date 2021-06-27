const Sequelize = require('sequelize');
const connection = require('../db/config')

const Like = connection.define('likes', {
    like_IdPublic: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    like_IdUser: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    like_UserName: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })
  
  //Like.sync({force: false})

  module.exports = Like;