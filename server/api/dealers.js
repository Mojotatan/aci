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