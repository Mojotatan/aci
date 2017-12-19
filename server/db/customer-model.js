const Sequelize = require('sequelize')

module.exports = db => db.define('Customer', {
  name: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING,
    validate: {
      len: [10, 10]
    }
  },
  // address: {
  //   type: Sequelize.JSON // expect {street, city, state, zip}
  // },
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
    type: Sequelize.INTEGER
  },
})