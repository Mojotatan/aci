const Sequelize = require('sequelize')

module.exports = db => db.define('Buyout', {
  status: {
    type: Sequelize.ENUM('pending', 'approved', 'expired', 'working', 'new', 'hold', 'ordered', 'declined', 'draft'),
    defaultValue: 'draft'
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