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
  address: {
    type: Sequelize.JSON // expect {street, city, state, zip}
  },
  taxID: {
    type: Sequelize.INTEGER
  },
})