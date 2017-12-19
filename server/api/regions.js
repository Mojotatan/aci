const Op = require('sequelize').Op
const {User, Region} = require('../db').db.models
const {isLoggedIn, isAdmin} = require('./auth')


module.exports = require('express').Router()

  .post('/', isLoggedIn, isAdmin, (req, res) => {
    return Region.findAll()
    .then(regions => {
      res.send(regions)
    })
  })

  .put('/', isLoggedIn, isAdmin, (req, res) => {
    return Region.update({
      name: req.body.region.name
    }, {
      where: {
        id: {
          [Op.eq]: req.body.region.id
        }
      }
    })
    .then(data => {
      res.send('success')
    })
  })

  .post('/new', isLoggedIn, isAdmin, (req, res) => {
    return Region.create({
      name: req.body.region.name
    }, {

    })
    .then(newRegion => {
      res.send(newRegion)
    })
  })