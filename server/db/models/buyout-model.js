const Sequelize = require('sequelize')

const {forceDate} = require('../../util')

module.exports = db => db.define('Buyout', {
  status: {
    type: Sequelize.ENUM('Draft', 'New', 'Working', 'Complete', 'Expired'),
    defaultValue: 'Draft'
  },
  date: {
    type: Sequelize.STRING, // stored as plaintext 'YYYY-MM-DD'
    defaultValue: null,
    allowNull: true,
    set(val) {
      this.setDataValue('date', forceDate(val)) // make sure all inputs are 'YYYY-MM-DD'
    }
  },
  expiry: {
    type: Sequelize.STRING, // stored as plaintext 'YYYY-MM-DD'
    defaultValue: null,
    allowNull: true,
    set(val) {
      this.setDataValue('expiry', forceDate(val)) // make sure all inputs are 'YYYY-MM-DD'
    }
  },
  comments: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  pdfs: {
    type: Sequelize.ARRAY(Sequelize.STRING), // expect filename
    defaultValue: []
  },
  pdfNotes: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  }
  
})