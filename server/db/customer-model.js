const Sequelize = require('sequelize')

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
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  zip: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    // validation removed because it was causing problems on front end
    // validate: {
    //   isEmail: true,
    // }
  },
  taxID: {
    type: Sequelize.STRING
  },
}, {
  getterMethods: {
    address() {
      return `${this.street}\n${this.city}, ${this.state} ${this.zip}`
    }
  }
})