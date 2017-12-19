const Sequelize = require('sequelize')

module.exports = db => db.define('Dealer', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: Sequelize.STRING,
    validate: {
      len: [10, 10]
    }
  },
  // address: {
  //   type: Sequelize.JSON // expect {street, city, state, zip}
  // }
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
})