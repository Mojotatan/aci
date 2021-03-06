const Op = require('sequelize').Op
const {User, Customer} = require('../db').db.models
const {isLoggedIn, whoAmI} = require('./auth')


module.exports = require('express').Router()

  .post('/', isLoggedIn, (req, res) => {
    let me = whoAmI(req.body.token)
    return Customer.findAll({
      where: {
        dealerId: {
          [Op.eq]: me.dealer
        }
      }
    })
    .then(customers => {
      res.send(customers)
    })
    .catch(err => console.error(err))
  })