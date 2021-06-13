const Sequelize = require('sequelize')

const connection = new Sequelize('boncorobotica', 'guidevprof', 'dvs2208612', {
  host: 'mysql742.umbler.com',
  dialect: 'mysql',
  freezeTableName: true
})

module.exports = connection;
