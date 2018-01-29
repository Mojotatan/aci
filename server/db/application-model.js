const Sequelize = require('sequelize')

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
  },
  amount: {
    type: Sequelize.DECIMAL(9, 2) // overflows at 10 million
  },
  expiry: {
    type: Sequelize.DATEONLY // stored as plaintext 'YYYY-MM-DD'
  },
  term: {
    type: Sequelize.STRING, // expecting either a stringified number (in months)
    //                        or a string starting with "co-term"
    defaultValue: '',
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
  

  // I didn't see a need for the leases attached to apps to be actual lease entries on the db,
  // so for now they are just arrays on the app table. This might change in the future.
  leaseCompany: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  },
  leaseNumber: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
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

// Utility func to get current date and return as 'YYYY-MM-DD'
const getDate = () => {
  let now = new Date()
  let obj = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate()
  }
  if (obj.month.toString().length === 1) obj.month = `0${obj.month}`
  if (obj.day.toString().length === 1) obj.day = `0${obj.day}`
  return `${obj.year}-${obj.month}-${obj.day}`
}