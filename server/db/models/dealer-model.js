const Sequelize = require('sequelize')

const {getPrettyCity} = require('../../util')

module.exports = db => db.define('Dealer', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: Sequelize.STRING,
  },
  // address: {
  //   type: Sequelize.JSON // expect {street, city, state, zip}
  // }
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
  logo: {
    type: Sequelize.STRING
  }
}, {
  getterMethods: {
    address() {
      return `${this.street}\n${this.city}, ${this.state} ${this.zip}`
    }
  }
})