const Sequelize = require('sequelize')

module.exports = db => db.define('Lease', {
  status: {
    type: Sequelize.ENUM('pending', 'approved', 'expired', 'working', 'new', 'hold', 'ordered', 'declined'),
    defaultValue: 'new'
  },
  date: {
    type: Sequelize.DATEONLY
  },

  comments: {
    type: Sequelize.STRING,
    defaultValue: ''
  }

})