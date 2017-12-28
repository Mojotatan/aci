const Sequelize = require('sequelize')

module.exports = db => db.define('Customer', {
  name: {
    type: Sequelize.STRING
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
      return `${this.street}\n${this.city}, ${this.state} ${this.zip}`
    }
  }
})