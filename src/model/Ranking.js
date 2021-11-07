const Sequelize = require('sequelize');
const connection = require('../db/config')

const Ranking = connection.define('rankings', {
  totalPoints: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  idAlunoRanking: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
})

//Ranking.sync({force: true})

module.exports = Ranking;