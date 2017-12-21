const Sequelize = require('sequelize')

module.exports = db => db.define('Buyout', {
  status: {
    type: Sequelize.ENUM('Draft', 'Submitted', 'Approved', 'Expired', 'Hold', 'Declined'),
    defaultValue: 'Draft'
  },
  date: {
    type: Sequelize.DATEONLY
  },
  quote: {
    type: Sequelize.ENUM('full', 'partial'),
    defaultValue: 'full'
  },
  comments: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  pdf: {
    type: Sequelize.STRING // expect url to file
  }
  
})