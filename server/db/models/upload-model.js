const Sequelize = require('sequelize')

module.exports = db => db.define('Upload', {
  // id serves as file name
  name: {
    type: Sequelize.STRING
  },
  notes: {
    type: Sequelize.STRING
  }
})