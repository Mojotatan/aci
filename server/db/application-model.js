const Sequelize = require('sequelize')

module.exports = db => db.define('Application', {
  status: {
    type: Sequelize.ENUM('Draft', 'Submitted', 'Approved', 'Expired', 'Hold', 'Declined'),
    defaultValue: 'Draft'
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
    type: Sequelize.ENUM('0', '1', '2')
  },
  endOfTerm: {
    type: Sequelize.ENUM('FMV', '1$ out', '9%')
  },
  type: {
    type: Sequelize.ENUM('New Customer', 'Existing Customer Addition', 'Existing Customer Upgrade')
  },
  currentLeaseCompany: {
    // Default options are EverBank, DLL, Marlin, Balboa, Wells Fargo, CIT, and Leaf
    // But this can't be an ENUM b/c user can pick 'other'
    type: Sequelize.STRING
  },
  erp: {
    type: Sequelize.STRING
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
  },

  comments: {
    type: Sequelize.STRING,
    defaultValue: ''
  }

})