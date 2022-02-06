const Sequelize = require('sequelize')

/* const connection = new Sequelize('bancorobotica', 'root', 'dvs2208612', {
  host: 'localhost',
  dialect: 'mysql',
  freezeTableName: true,
  timezone: "-03:00"
}) */

const connection = new Sequelize('bancorobotica', 'root', 'dvs2208612', {
  host: 'localhost',
  dialect: 'mysql',
  freezeTableName: true,
  timezone: "-03:00"
})

module.exports = connection;
