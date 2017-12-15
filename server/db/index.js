// Define db
const Sequelize = require('sequelize')
const dbUrl = process.env.DATABASE_URL || 'postgres://localhost:5432/aci'
let db = new Sequelize(dbUrl, {logging: false})

// Import tables
const models = [
  require('./user-model'),
  require('./dealer-model'),
  require('./region-model'),
  require('./branch-model'),
  require('./application-model'),
  require('./guarantee-model'),
  require('./customer-model')
]

models.forEach(model => {
  model(db)
})

// Associations
let {User, Dealer, Region, Branch, Application, Guarantee, Customer} = db.models

  User.belongsTo(Dealer, {as: 'dealer'})
  User.belongsTo(Region, {as: 'region'})
  User.belongsTo(Branch, {as: 'branch'})

  Branch.belongsTo(Region, {as: 'region'})
  // Branch.belongsTo(Dealer, {as: 'dealer'})

  Region.belongsTo(Dealer, {as: 'dealer'})

  Application.belongsTo(User, {as: 'rep'})
  Application.belongsTo(Guarantee, {as: 'guarantee'}) // Note: guarantees are not currently being implemented on the front end
  Application.belongsTo(Customer, {as: 'customer'})

  Customer.belongsTo(User, {as: 'rep'})



// Export db
module.exports = {db}