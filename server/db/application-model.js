const Sequelize = require('sequelize')

module.exports = db => db.define('Application', {
  status: {
    type: Sequelize.ENUM('pending', 'approved', 'expired', 'working', 'new', 'hold', 'ordered', 'declined'),
    defaultValue: 'new'
  },
  date: {
    type: Sequelize.DATEONLY
  },
  amount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  expiry: {
    type: Sequelize.DATEONLY // stored as plaintext 'YYYY-MM-DD'
  },
  term: {
    type: Sequelize.INTEGER // in months
  },
  advancedPayments: {
    type: Sequelize.ENUM('0', '1', '2')
  },
  endOfTerm: {
    type: Sequelize.ENUM('FMV', '1$ out', '9%')
  },
  comments: {
    type: Sequelize.STRING,
    defaultValue: ''
  }

})