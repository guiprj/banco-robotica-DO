const Sequelize = require('sequelize');
const connection = require('../db/config')
const Profile = require('../model/Profile')

const Transaction = connection.define('transactions', {
  nameAluno: {
    type: Sequelize.STRING,
    allowNull: false
  },
  usernameAluno: {
    type: Sequelize.STRING,
    allowNull: false
  },
  classroomAluno: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nameItem: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageItem: {
    type: Sequelize.STRING,
    allowNull: true
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  id_Aluno: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

//Profile.hasMany(Transaction);
//Transaction.belongsTo(Profile);

//Transaction.sync({force: true})

module.exports = Transaction;