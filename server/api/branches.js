const Op = require('sequelize').Op
const {User, Branch, Dealer, Region} = require('../db').db.models
const {isLoggedIn, isAdmin} = require('./auth')


module.exports = require('express').Router()

  .post('/', isLoggedIn, isAdmin, (req, res) => {
    return Branch.findAll({
      include: ['region', 'dealer'],
      order: [['createdAt', 'ASC']]
    })
    .then(branches => {
      res.send(branches)
    })
    .catch(err => {
      console.error(err)
      res.status(500)
    })
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
    .catch(err => {
      res.status(500).send({err})
    })
  })

  .put('/delete', isLoggedIn, isAdmin, (req, res) => {
    Branch.destroy({
      where: {
        id: {
          [Op.eq]: req.body.branch
        }
      }
    })
    .then(() => {
      res.send('success')
    })
    .catch(err => {
      console.error(err)
      res.status(500)
    })
  })

  .post('/new', isLoggedIn, isAdmin, (req, res) => {
    let theBranch, theDealer
    Promise.all([
      Branch.create({
        name: req.body.branch.name,
        phone: req.body.branch.phone,
        street: req.body.branch.street,
        city: req.body.branch.city,
        state: req.body.branch.state,
        zip: req.body.branch.zip
      }),
      Dealer.findOne({where: {name: {[Op.eq]: req.body.branch.dealerName}}})
    ])
    .then(([newBranch, dealer]) => {
      theBranch = newBranch
      theDealer = dealer
      return Region.findOne({where: {
        name: {[Op.eq]: req.body.branch.regionName},
        dealerId: {[Op.eq]: theDealer.id}
      }})
    })
    .then(theRegion => {
      return Promise.all([
        theBranch.setDealer(theDealer),
        theBranch.setRegion(theRegion)
      ])
    })
    .then(() => {
      res.send('success')
    })
    .catch(err => {
      res.send({err})
      res.status(500)
    })
  })