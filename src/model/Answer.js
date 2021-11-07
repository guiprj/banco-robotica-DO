const Sequelize = require('sequelize');
const connection = require('../db/config')

const Answer = connection.define('answers', {
  answer: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  points: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  id_Question: {
    type: Sequelize.INTEGER,
    allowNull: false
  } 
})

//Answer.sync({force: true})

module.exports = Answer;