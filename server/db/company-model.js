const Sequelize = require('sequelize')

module.exports = db => db.define('Company', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // address: {
  //   type: Sequelize.JSON // expect {street, city, state, zip}
  // }
})