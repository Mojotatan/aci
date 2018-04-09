const Sequelize = require('sequelize')

module.exports = db => db.define('Pdf', {
  // id serves as file name
  name: {
    type: Sequelize.STRING
  },
  notes: {
    type: Sequelize.STRING
  }
})