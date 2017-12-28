const Op = require('sequelize').Op
const {User, Branch, Dealer, Region} = require('../db').db.models
const {isLoggedIn, isAdmin} = require('./auth')


module.exports = require('express').Router()

  .post('/', isLoggedIn, isAdmin, (req, res) => {
    return Branch.findAll({
      include: ['region', 'dealer']
    })
    .then(branches => {
      res.send(branches)
    })
    .catch(err => console.error(err))
  })

  .put('/', isLoggedIn, isAdmin, (req, res) => {
    let bran, deal
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
      },
      returning: true
    })
    .then(theBranch => {
      bran = theBranch[1][0]
      return Dealer.findOne({
        where: {
          name: {
            [Op.eq]: req.body.branch.dealerName
          }
        }
      })
    })
    .then(theDeal => {
      deal = theDeal
      return Region.findOne({
        where: {
          name: {
            [Op.eq]: req.body.branch.regionName
          },
          dealerId: {
            [Op.eq]: deal.id
          }
        }
      })
    })
    .then(reg => {
      return Promise.all([
        bran.setRegion(reg),
        bran.setDealer(deal)
      ])
    })
    .then(data => {
      res.send('success')
    })
    .catch(err => res.send({err}))
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
    .catch(err => res.send({err}))
  })