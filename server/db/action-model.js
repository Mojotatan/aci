const Sequelize = require('sequelize')

module.exports = db => db.define('Action', {
  activity: {
    type: Sequelize.STRING
  },
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
    type: Sequelize.ENUM('Working', 'Approved', 'Hold', 'Declined', 'Expired'),
    defaultValue: 'Working'
  },
  notes: {
    type: Sequelize.TEXT,
    defaultValue: ''
  }
})