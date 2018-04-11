const Sequelize = require('sequelize')

const {getPrettyCity} = require('../../util')

module.exports = db => db.define('Branch', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
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
  }
}, {
  getterMethods: {
    address() {
      return `${this.street}\n${this.city}, ${this.state} ${this.zip}`
    }
  }
})