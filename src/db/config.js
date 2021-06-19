const Sequelize = require('sequelize')

/* const connection = new Sequelize('bancorobotica', 'root', 'dvs2208612', {
  host: 'localhost',
  dialect: 'mysql',
  freezeTableName: true,
  timezone: "-03:00"
}) */

const connection = new Sequelize('boncorobotica', 'guidevprof', 'dvs22086122', {
  host: 'mysql742.umbler.com',
  dialect: 'mysql',
  freezeTableName: true
})

module.exports = connection;
