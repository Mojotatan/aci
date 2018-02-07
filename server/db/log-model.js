const Sequelize = require('sequelize')

module.exports = db => db.define('Log', {
  date: {
    type: Sequelize.DATEONLY
  },
  activity: {
    type: Sequelize.STRING
  }
})