const Sequelize = require('sequelize')

const {getDate, forceDate} = require('../../util')

module.exports = db => db.define('Application', {
  status: {
    type: Sequelize.ENUM('Draft', 'New', 'Working', 'Approved', 'Expired', 'Hold', 'Declined'),
    defaultValue: 'Draft',
    get() {
      return (this.getDataValue('expiry') > getDate() || !this.getDataValue('expiry')) ?
        this.getDataValue('status') : 'Expired'
    }
  },
  date: {
    type: Sequelize.DATEONLY, // stored as plaintext 'YYYY-MM-DD'
    // defaultValue: getDate()
    set(val) {
      this.setDataValue('date', forceDate(val)) // make sure all inputs are 'YYYY-MM-DD'
    }
  },
  amount: {
    type: Sequelize.DECIMAL(11, 2) // overflows at 1 billion
  },
  expiry: {
    type: Sequelize.DATEONLY, // stored as plaintext 'YYYY-MM-DD'
    defaultValue: null,
    allowNull: true,
    set(val) {
      this.setDataValue('expiry', forceDate(val)) // make sure all inputs are 'YYYY-MM-DD'
    }
  },
  term: {
    type: Sequelize.STRING, // expecting either a stringified number (in months)
    //                        or a string starting with "co-term"
    defaultValue: '60',
    allowNull: false
  },
  advancedPayments: {
    type: Sequelize.ENUM('0', '1', '2'),
    defaultValue: '2'
  },
  endOfTerm: {
    type: Sequelize.ENUM('FMV', '1$ out', '9%'),
    defaultValue: 'FMV'
  },
  type: {
    type: Sequelize.ENUM('New', 'Existing'),
    defaultValue: 'New'
  },
  existingType: { // only relevant if type is set to 'Existing'
    type: Sequelize.ENUM('Addition', 'Upgrade'),
    defaultValue: 'Addition'
  },
  existingCustomer: { // only relevant if type is set to 'Existing'
    type: Sequelize.STRING
  },

  comments: {
    type: Sequelize.TEXT,
    defaultValue: ''
  },

  // admin only fields

  // approvalNumber: {
  //   type: Sequelize.STRING
  // },
  // approvalDate: {
  //   type: Sequelize.DATEONLY
  // },
  // approvalFrom: {
  //   type: Sequelize.STRING
  // },
  funding: {
    type: Sequelize.DECIMAL(9, 2) // overflows at 10 million
  },
  repRate: {
    type: Sequelize.STRING
  },


})