const Op = require('sequelize').Op
const {User, Customer} = require('../db').db.models
const {isLoggedIn, whoAmI} = require('./auth')


module.exports = require('express').Router()

  .post('/', isLoggedIn, (req, res) => {
    let me = whoAmI(req.body.token)
    return Customer.findAll({
      where: {
        repId: {
          [Op.eq]: me.id
        }
      }
    })
    .then(customers => {
      res.send(customers)
    })
  })

  // .put('/', isLoggedIn, (req, res) => {
  //   return Customer.update({
  //     name: req.body.customer.name,
  //     phone: req.body.customer.phone,
  //     email: req.body.customer.email,
  //     street: req.body.customer.street,
  //     city: req.body.customer.city,
  //     state: req.body.customer.state,
  //     zip: req.body.customer.zip,
  //     taxID: req.body.customer.taxID
  //   }, {
  //     where: {
  //       id: {
  //         [Op.eq]: req.body.customer.id
  //       }
  //     }
  //   })
  //   .then(data => {
  //     res.send('success')
  //   })
  // })

  // .post('/new', isLoggedIn, (req, res) => {
  //   return Customer.create({
  //     name: req.body.customer.name,
  //     phone: req.body.customer.phone,
  //     email: req.body.customer.email,
  //     street: req.body.customer.street,
  //     city: req.body.customer.city,
  //     state: req.body.customer.state,
  //     zip: req.body.customer.zip,
  //     taxID: req.body.customer.taxID,
  //   }, {

  //   })
  //   .then(newCustomer => {
  //     res.send(newCustomer)
  //   })
  // })