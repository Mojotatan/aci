const Sequelize = require('sequelize')

module.exports = db => db.define('Buyout', {
  status: {
    type: Sequelize.ENUM('Draft', 'Submitted', 'Approved', 'Expired', 'Hold', 'Declined'),
    defaultValue: 'Draft'
  },
  date: {
    type: Sequelize.DATEONLY
  },
  expiry: {
    type: Sequelize.DATEONLY // stored as plaintext 'YYYY-MM-DD'
  },
  comments: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  pdf: {
    type: Sequelize.STRING // expect url to file
  }
  
})