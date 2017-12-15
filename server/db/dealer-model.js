const Sequelize = require('sequelize')

module.exports = db => db.define('Dealer', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING,
    validate: {
      len: [10, 10]
    }
  },
  address: {
    type: Sequelize.JSON // expect {street, city, state, zip}
  }
})