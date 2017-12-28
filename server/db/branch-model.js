const Sequelize = require('sequelize')

module.exports = db => db.define('Branch', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // address: {
  //   type: Sequelize.JSON // expect {street, city, state, zip}
  // }
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
  }
}, {
  getterMethods: {
    address() {
      return `${this.street}\n${this.city}, ${this.state} ${this.zip}`
    }
  }
})