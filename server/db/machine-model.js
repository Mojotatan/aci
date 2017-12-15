const Sequelize = require('sequelize')

module.exports = db => db.define('Machine', {
  serial: {
    type: Sequelize.STRING
  },
  make: {
    type: Sequelize.STRING
  },
  model: {
    type: Sequelize.STRING
  },
  location: {
    type: Sequelize.STRING
  }

})