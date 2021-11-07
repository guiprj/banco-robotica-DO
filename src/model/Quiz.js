const Sequelize = require('sequelize');
const connection = require('../db/config')

const Quiz = connection.define('quizes', {
  quiz: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  id_AlunoQuiz: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  statusQuiz: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
  
})

//Quiz.sync({force: true})

module.exports = Quiz;