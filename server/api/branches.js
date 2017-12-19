const Op = require('sequelize').Op
const {User, Branch} = require('../db').db.models
const {isLoggedIn, isAdmin} = require('./auth')


module.exports = require('express').Router()

  .post('/', isLoggedIn, isAdmin, (req, res) => {
    return Branch.findAll()
    .then(branches => {
      res.send(branches)
    })
  })

  .put('/', isLoggedIn, isAdmin, (req, res) => {
    return Branch.update({
      name: req.body.branch.name,
      phone: req.body.branch.phone,
      street: req.body.branch.street,
      city: req.body.branch.city,
      state: req.body.branch.state,
      zip: req.body.branch.zip
    }, {
      where: {
        id: {
          [Op.eq]: req.body.branch.id
        }
      }
    })
    .then(data => {
      res.send('success')
    })
  })

  .post('/new', isLoggedIn, isAdmin, (req, res) => {
    return Branch.create({
      name: req.body.branch.name,
      phone: req.body.branch.phone,
      street: req.body.branch.street,
      city: req.body.branch.city,
      state: req.body.branch.state,
      zip: req.body.branch.zip
    }, {

    })
    .then(newBranch => {
      res.send(newBranch)
    })
  })