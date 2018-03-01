// Define db
const Sequelize = require('sequelize')
let dbUrl = process.env.DATABASE_URL || 'postgres://localhost:5432/aci'
// change dbUrl in production

let db = new Sequelize(dbUrl, {logging: false})

// Import tables
const models = [
  require('./models/user-model'),
  require('./models/dealer-model'),
  require('./models/region-model'),
  require('./models/branch-model'),
  require('./models/application-model'),
  require('./models/action-model'),
  require('./models/log-model'),
  require('./models/guarantee-model'), // phase 2
  require('./models/customer-model'),
  require('./models/buyout-model'),
  require('./models/lease-model'),
  require('./models/machine-model')
]

models.forEach(model => {
  model(db)
})

// Associations
let {User, Dealer, Region, Branch, Application, Action, Log, Guarantee, Customer, Buyout, Lease, Machine} = db.models

  User.belongsTo(Dealer, {as: 'dealer'})
  User.belongsTo(Region, {as: 'region'})
  User.belongsTo(Branch, {as: 'branch'})

  User.hasMany(User, {as: 'underlings', foreignKey: 'managerId'})
  User.belongsTo(User, {as: 'manager'})

  Branch.belongsTo(Region, {as: 'region'})
  Branch.belongsTo(Dealer, {as: 'dealer'})

  Region.belongsTo(Dealer, {as: 'dealer'})

  Application.belongsTo(User, {as: 'rep'})
  Application.belongsTo(Guarantee, {as: 'guarantee'}) // phase 2
  Application.belongsTo(Customer, {as: 'customer'})

  Customer.belongsTo(Dealer, {as: 'dealer'})

  Action.belongsTo(Application, {as: 'app'})
  Action.belongsTo(User, {as: 'admin'})
  // Application.belongsTo(Action, {as: 'active'})

  Log.belongsTo(Application, {as: 'app'})
  Log.belongsTo(User, {as: 'admin'})

  Buyout.belongsTo(User, {as: 'rep'})
  Buyout.belongsTo(Guarantee, {as: 'guarantee'}) // phase 2
  Buyout.belongsTo(Customer, {as: 'customer'})
  Buyout.belongsTo(Application, {as: 'app'}) // for 'quote needed' checkbox

  // Buyout.hasMany(Lease, {as: 'leases'})
  Lease.belongsTo(Buyout, {as: 'buyout'})
  Lease.belongsTo(Application, {as: 'app'})
  Lease.belongsTo(Dealer, {as: 'dealer'}) // for lease company autofill
  
  Lease.hasMany(Machine, {as: 'machines'})
  // Machine.belongsTo(Lease, {as: 'lease'})



// Export db
module.exports = {db}