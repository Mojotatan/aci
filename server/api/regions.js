const Op = require('sequelize').Op
const {User, Region, Dealer} = require('../db').db.models
const {isLoggedIn, isAdmin} = require('./auth')


module.exports = require('express').Router()

  .post('/', isLoggedIn, isAdmin, (req, res) => {
    return Region.findAll({
      include: ['dealer']
    })
    .then(regions => {
      res.send(regions)
    })
    .catch(err => console.error(err))
  })

  .put('/', isLoggedIn, isAdmin, (req, res) => {
    let reg
    return Region.update({
      name: req.body.region.name
    }, {
      where: {
        id: {
          [Op.eq]: req.body.region.id
        }
      },
      returning: true
    })
    .then(theRegion => {
      reg = theRegion[1][0]
      return Dealer.findOne({
        where: {
          name: {
            [Op.eq]: req.body.region.dealerName
          }
        }
      })
    })
    .then(theDealer => {
      return reg.setDealer(theDealer)
    })
    .then(data => {
      res.send('success')
    })
    .catch(err => res.send({err}))
  })

  .post('/new', isLoggedIn, isAdmin, (req, res) => {
    Promise.all([
      Region.create({name: req.body.region.name}),
      Dealer.findOne({where: {name: {[Op.eq]: req.body.region.dealerName}}})
    ])
    .then(([newRegion, theDealer]) => {
      return newRegion.setDealer(theDealer)
    })
    .then(success => {
      res.send('success')
    })
    .catch(err => res.send({err}))
  })