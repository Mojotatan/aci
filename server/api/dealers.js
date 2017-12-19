const Op = require('sequelize').Op
const {User, Dealer} = require('../db').db.models
const {isLoggedIn, isAdmin} = require('./auth')


module.exports = require('express').Router()

  .post('/', isLoggedIn, isAdmin, (req, res) => {
    return Dealer.findAll()
    .then(dealers => {
      res.send(dealers)
    })
  })

  .put('/', isLoggedIn, isAdmin, (req, res) => {
    return Dealer.update({
      name: req.body.dealer.name,
      phone: req.body.dealer.phone,
      street: req.body.dealer.street,
      city: req.body.dealer.city,
      state: req.body.dealer.state,
      zip: req.body.dealer.zip
    }, {
      where: {
        id: {
          [Op.eq]: req.body.dealer.id
        }
      }
    })
    .then(data => {
      res.send('success')
    })
  })

  .post('/new', isLoggedIn, isAdmin, (req, res) => {
    return Dealer.create({
      name: req.body.dealer.name,
      phone: req.body.dealer.phone,
      street: req.body.dealer.street,
      city: req.body.dealer.city,
      state: req.body.dealer.state,
      zip: req.body.dealer.zip
    }, {

    })
    .then(newDealer => {
      res.send(newDealer)
    })
  })