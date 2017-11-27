const Sequelize = require('sequelize')

module.exports = db => db.define('User', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  level: {
    type: Sequelize.ENUM('admin', 'regionManager', 'branchManager', 'rep'),
    defaultValue: 'rep'
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: Sequelize.STRING,
    validate: {
      len: [10, 10]
    }
  },
}, {
  getterMethods: {
    fullName() {
      return `${this.firstName} ${this.lastName}`
    }
  }
})