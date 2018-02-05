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
    set(val) {
      this.setDataValue('date', forceDate(val)) // make sure all inputs are 'YYYY-MM-DD'
    }
  },
  amount: {
    type: Sequelize.DECIMAL(11, 2) // overflows at 1 billion
  },
  expiry: {
    type: Sequelize.DATEONLY, // stored as plaintext 'YYYY-MM-DD'
    set(val) {
      this.setDataValue('expiry', forceDate(val)) // make sure all inputs are 'YYYY-MM-DD'
    }
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

// Utility func to take a date string and make sure it ends up as 'YYYY-MM-DD'
const forceDate = (dat) => {
  if (!dat) return dat
  let arr = dat.split('-')
  if (arr.length === 1) arr = dat.split('/') // Checking for slashes
  if (arr[0].length === 4) { // Checking for YYYY
    if (arr[1].length === 1) arr[1] = '0' + arr[1] // Checking for missing 0 in front of month or day
    if (arr[2].length === 1) arr[2] = '0' + arr[2]
    return arr.join('-')
  } else if (dat.length <= 8) { // Assuming a string of ≤8 length is in the form of 'MM-DD-YY'
    if (arr[0].length === 1) arr[0] = '0' + arr[0] // Checking for missing 0 in front of month or day
    if (arr[1].length === 1) arr[1] = '0' + arr[1]
    return `20${arr[2]}-${arr[0]}-${arr[1]}`
  } else return dat
}