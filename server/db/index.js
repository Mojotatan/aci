// Define db
const Sequelize = require('sequelize')
const dbUrl = process.env.DATABASE_URL || 'postgres://localhost:5432/aci'
let db = new Sequelize(dbUrl, {logging: false})

// Import tables
const models = [
  require('./user'),
  require('./company'),
  require('./region'),
  require('./branch'),
  require('./application'),
  require('./guarantee')
]

models.forEach(model => {
  model(db)
})

// Associations
let {User, Company, Region, Branch, Application, Guarantee} = db.models

User.belongsTo(Company, {as: 'company'})
User.belongsTo(Region, {as: 'region'})
User.belongsTo(Branch, {as: 'branch'})

Branch.belongsTo(Region, {as: 'region'})
Branch.belongsTo(Company, {as: 'company'})

Region.belongsTo(Company, {as: 'company'})

Application.belongsTo(User, {as: 'rep'})
Application.belongsTo(Guarantee, {as: 'app'})


// Export db
module.exports = db