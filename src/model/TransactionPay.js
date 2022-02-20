const Sequelize = require('sequelize');
const connection = require('../db/config')

const TransactionPay = connection.define('transactionpays', {
  idPayingStudent: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  idReceivingStudent: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  valueTransaction: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  userNamePay: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userNameReceiving: {
    type: Sequelize.STRING,
    allowNull: false
  },
})

//TransactionPay.sync({force: true})

module.exports = TransactionPay;