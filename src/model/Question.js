const Sequelize = require('sequelize');
const connection = require('../db/config')

const Question = connection.define('questions', {
  question: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  numberQuestion: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  idQuiz: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})


//Question.sync({force: true})

module.exports = Question;