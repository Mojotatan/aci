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
    type: Sequelize.ENUM('admin', 'boss', 'regionManager', 'branchManager', 'rep'),
    defaultValue: 'rep'
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    }
  },
  phone: {
    type: Sequelize.STRING,
    validate: {
      len: [10, 10]
    }
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