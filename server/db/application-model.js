const Sequelize = require('sequelize')

module.exports = db => db.define('Application', {
  status: {
    type: Sequelize.ENUM('approved', 'expired', 'working', 'new', 'hold', 'ordered', 'declined'),
    defaultValue: 'new'
  },
  date: {
    type: Sequelize.DATEONLY
  },

  customerName: {
    type: Sequelize.STRING
  },
  customerPhone: {
    type: Sequelize.STRING,
    validate: {
      len: [10, 10]
    }
  },
  customerAddress: {
    type: Sequelize.JSON // expect {street, city, state, zip}
  },
  customerTaxID: {
    type: Sequelize.INTEGER
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