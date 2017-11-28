const Sequelize = require('sequelize')

module.exports = db => db.define('Guarantee', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.JSON // expect {street, city, state, zip}
  },
  title: {
    type: Sequelize.STRING
  },
  dateOfBirth: {
    type: Sequelize.DATEONLY // stored as plaintext 'YYYY-MM-DD'
  }
}, {
  getterMethods: {
    fullName() {
      return `${this.firstName} ${this.lastName}`
    }
  }
})