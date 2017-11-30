// Define db
const Sequelize = require('sequelize')
const dbUrl = process.env.DATABASE_URL || 'postgres://localhost:5432/aci'
let db = new Sequelize(dbUrl, {logging: false})

// Import tables
const models = [
  require('./user-model'),
  require('./company-model'),
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
let {User, Company, Region, Branch, Application, Guarantee, Customer} = db.models

// let associations = {}
  User.belongsTo(Company, {as: 'company'})
  User.belongsTo(Region, {as: 'region'})
  User.belongsTo(Branch, {as: 'branch'})

  Branch.belongsTo(Region, {as: 'region'})
  // Branch.belongsTo(Company, {as: 'company'})

  Region.belongsTo(Company, {as: 'company'})

  Application.belongsTo(User, {as: 'rep'})
  Application.belongsTo(Guarantee, {as: 'guarantee'})
  Application.belongsTo(Customer, {as: 'customer'})

  Customer.belongsTo(User, {as: 'rep'})



// Export db
module.exports = {db}