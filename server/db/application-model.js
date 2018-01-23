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
    type: Sequelize.DATEONLY
  },
  amount: {
    type: Sequelize.DECIMAL(9, 2) // overflows at 10 million
  },
  expiry: {
    type: Sequelize.DATEONLY // stored as plaintext 'YYYY-MM-DD'
  },
  term: {
    type: Sequelize.INTEGER // in months
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
    type: Sequelize.ENUM('New Customer', 'Existing Customer Addition', 'Existing Customer Upgrade')
  },
  currentLeaseCompany: {
    type: Sequelize.STRING
  },
  leaseNumber: {
    type: Sequelize.STRING
  },

  comments: {
    type: Sequelize.STRING,
    defaultValue: ''
  },

  // admin only fields

  approvalNumber: {
    type: Sequelize.STRING
  },
  approvalDate: {
    type: Sequelize.DATEONLY
  },
  approvalFrom: {
    type: Sequelize.STRING
  },
  funding: {
    type: Sequelize.DECIMAL(9, 2) // overflows at 10 million
  },
  repRate: {
    type: Sequelize.STRING
  },

  // bank: {
  //   type: Sequelize.JSON, // expect {bankName: 'Y' || 'N', ...}
  //   defaultValue: JSON.stringify({})
  // },

  // banks
  everBank: {
    type: Sequelize.ENUM('Y', 'N', 'P', ''),
    defaultValue: ''
  },
  ge: {
    type: Sequelize.ENUM('Y', 'N', 'P', ''),
    defaultValue: ''
  },
  cit: {
    type: Sequelize.ENUM('Y', 'N', 'P', ''),
    defaultValue: ''
  },
  unifiFred: {
    type: Sequelize.ENUM('Y', 'N', 'P', ''),
    defaultValue: ''
  },
  dll: {
    type: Sequelize.ENUM('Y', 'N', 'P', ''),
    defaultValue: ''
  },
  usb: {
    type: Sequelize.ENUM('Y', 'N', 'P', ''),
    defaultValue: ''
  },
  emr: {
    type: Sequelize.ENUM('Y', 'N', 'P', ''),
    defaultValue: ''
  }

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