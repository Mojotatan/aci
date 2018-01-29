const Sequelize = require('sequelize')

module.exports = db => db.define('Lease', {
  number: {
    type: Sequelize.STRING
  },
  company: {
    type: Sequelize.STRING
  },
  // amount: {
  //   type: Sequelize.DECIMAL(9, 2) // overflows at 10 million
  // },
  quote: {
    type: Sequelize.ENUM('Full', 'Partial'),
    defaultValue: 'Full'
  }

})