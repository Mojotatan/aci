// Define db
const Sequelize = require('sequelize')
let dbUrl = process.env.DATABASE_URL || 'postgres://localhost:5432/aci'
// production
// dbUrl = 'postgres://impact_myadmin:BlueMountain21@localhost:5432/aci'




let db = new Sequelize(dbUrl, {logging: false})

// Import tables
const models = [
  require('./user-model'),
  require('./dealer-model'),
  require('./region-model'),
  require('./branch-model'),
  require('./application-model'),
  require('./action-model'),
  require('./log-model'),
  require('./guarantee-model'), // phase 2
  require('./customer-model'),
  require('./buyout-model'),
  require('./lease-model'),
  require('./machine-model')
]

models.forEach(model => {
  model(db)
})

// Associations
let {User, Dealer, Region, Branch, Application, Action, Log, Guarantee, Customer, Buyout, Lease, Machine} = db.models

  User.belongsTo(Dealer, {as: 'dealer'})
  User.belongsTo(Region, {as: 'region'})
  User.belongsTo(Branch, {as: 'branch'})

  User.hasMany(User, {as: 'underlings'})
  // User.belongsTo(User, {as: 'manager'})

  Branch.belongsTo(Region, {as: 'region'})
  Branch.belongsTo(Dealer, {as: 'dealer'})

  Region.belongsTo(Dealer, {as: 'dealer'})

  Application.belongsTo(User, {as: 'rep'})
  Application.belongsTo(Guarantee, {as: 'guarantee'}) // phase 2
  Application.belongsTo(Customer, {as: 'customer'})

  Customer.belongsTo(Dealer, {as: 'dealer'})

  Action.belongsTo(Application, {as: 'app'})
  Action.belongsTo(User, {as: 'admin'})

  Log.belongsTo(Application, {as: 'app'})
  Log.belongsTo(User, {as: 'admin'})

  Buyout.belongsTo(User, {as: 'rep'})
  Buyout.belongsTo(Guarantee, {as: 'guarantee'}) // phase 2
  Buyout.belongsTo(Customer, {as: 'customer'})
  Buyout.belongsTo(Application, {as: 'app'}) // for 'quote needed' checkbox

  // Buyout.hasMany(Lease, {as: 'leases'})
  Lease.belongsTo(Buyout, {as: 'buyout'})
  Lease.belongsTo(Application, {as: 'app'})
  
  Lease.hasMany(Machine, {as: 'machines'})
  // Machine.belongsTo(Lease, {as: 'lease'})



// Export db
module.exports = {db}