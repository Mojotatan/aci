const Sequelize = require('sequelize')

module.exports = db => db.define('Region', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})