const Sequelize = require('sequelize');
const connection = require('../db/config')

const KeyPix = connection.define('keyPixes', {
  keyPix_IdAluno: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  keyPix: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 0
  }
})

//KeyPix.sync({force: true})

module.exports = KeyPix;