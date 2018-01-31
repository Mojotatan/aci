const Sequelize = require('sequelize')

module.exports = db => db.define('Buyout', {
  status: {
    type: Sequelize.ENUM('Draft', 'New', 'Working', 'Complete'),
    defaultValue: 'Draft'
  },
  date: {
    type: Sequelize.DATEONLY, // stored as plaintext 'YYYY-MM-DD'
    set(val) {
      this.setDataValue('date', forceDate(val)) // make sure all inputs are 'YYYY-MM-DD'
    }
  },
  expiry: {
    type: Sequelize.DATEONLY, // stored as plaintext 'YYYY-MM-DD'
    set(val) {
      this.setDataValue('expiry', forceDate(val)) // make sure all inputs are 'YYYY-MM-DD'
    }
  },
  comments: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  pdf: {
    type: Sequelize.STRING // expect url to file
  }
  
})

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