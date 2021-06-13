const Sequelize = require('sequelize');
const connection = require('../db/config')

const Profile = connection.define('profiles', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  avatar: {
    type: Sequelize.STRING,
    allowNull: true
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  totalBalance: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  classroom: {
    type: Sequelize.INTEGER
  },
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

//Profile.sync({force: true})

module.exports = Profile;