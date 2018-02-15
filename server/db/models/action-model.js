const Sequelize = require('sequelize')

const {forceDate} = require('../../util')

module.exports = db => db.define('Action', {
  date: {
    type: Sequelize.DATEONLY
  },
  leasingCompany: {
    type: Sequelize.STRING
  },
  appNumber: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.ENUM('Working', 'Submitted', 'Approved', 'Hold', 'Declined'),
    defaultValue: 'Working'
  },
  legalName: {
    type: Sequelize.STRING
  },
  expiry: {
    type: Sequelize.DATEONLY, // stored as plaintext 'YYYY-MM-DD'
    defaultValue: null,
    allowNull: true,
    set(val) {
      this.setDataValue('expiry', forceDate(val)) // make sure all inputs are 'YYYY-MM-DD'
    }
  },
  notes: {
    type: Sequelize.TEXT,
    defaultValue: ''
  }
})