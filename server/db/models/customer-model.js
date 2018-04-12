const Sequelize = require('sequelize')

const {getPrettyCity} = require('../../util')

module.exports = db => db.define('Customer', {
  name: {
    type: Sequelize.STRING // no strict validation but attempting to save a customer with no name thru
    // api/apps or buyouts will delete any blank customers created
  },
  phone: {
    type: Sequelize.STRING,
  },
  street: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('city', getPrettyCity(val)) // make sure all cities are capitalized
    }
  },
  state: {
    type: Sequelize.STRING
  },
  zip: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    }
  },
  taxID: {
    type: Sequelize.STRING
  },
}, {
  getterMethods: {
    address() {
      return `${this.street || ''}\n${this.city || ''}, ${this.state || ''} ${this.zip || ''}`
    }
  }
})