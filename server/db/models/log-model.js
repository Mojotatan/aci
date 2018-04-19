const Sequelize = require('sequelize')

module.exports = db => db.define('Log', {
  date: {
    type: Sequelize.STRING
  },
  activity: {
    type: Sequelize.STRING,
    allowNull: false
  }
})