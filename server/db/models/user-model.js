const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = db => db.define('User', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  level: {
    type: Sequelize.ENUM('Admin', 'Senior Manager', 'Region Manager', 'Branch Manager', 'Sales Manager', 'Sales Rep'),
    defaultValue: 'Sales Rep'
  },
  active: {
    type: Sequelize.ENUM('Active', 'Inactive'),
    defaultValue: 'Active'
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
    // emails are forced to be case insensitive
    get() {
      let email = this.getDataValue('email')
      // without ternary this was causing errors on password resets for some reason
      return (email) ? email.toLowerCase() : email
    },
    set(val) {
      return this.setDataValue('email', val.toLowerCase())
    }
  },
  phone: {
    type: Sequelize.STRING,
  },
  pwHash: {
    type: Sequelize.STRING
  },
  password: Sequelize.VIRTUAL
}, {
  getterMethods: {
    fullName() {
      return `${this.firstName} ${this.lastName}`
    }
  },
  hooks: {
    beforeCreate: hashIt,
    beforeUpdate: hashIt
  }
})

function hashIt(user) {
  if (!user.password) return Promise.resolve(user)
  return new Promise((resolve, reject) => {
    bcrypt.hash(user.get('password'), 10, (err, hash) => {
      if (err) return reject(err)
      user.set('pwHash', hash)
      resolve(user)
    })
  })
}