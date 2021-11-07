const Sequelize = require('sequelize');
const connection = require('../db/config')

const QuestionsAnswer = connection.define('questionsansweres', {
  questionId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  alunoId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})


//QuestionsAnswer.sync({force: true})

module.exports = QuestionsAnswer;