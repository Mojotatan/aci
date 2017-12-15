const Op = require('sequelize').Op
const {User, Dealer, Region, Branch, Application, Guarantee, Customer} = require('../db').db.models


module.exports = require('express').Router()
// todo: auth filter

  .get('/:id', (req, res) => {
    return Application.findOne({
      where: {
        id: {
          [Op.eq]: req.params.id}
      }
    })
    .then((data) => {
      res.send(data)
    })
  })

  // post application

  // put application => two routes:
  //    one handles rep updates, so only some fields can be changed (can just take the req.body and only use req.body.customer, etc.)
  //    other one handles raven team updates, so every field can be changed


  // .post('/:id', (req, res) => {
  //   return Application.create(req.body) // needs to be sanitized obviously
  //   .then((data) => {
  //     res.send('success')
  //   })
  // })

  // .put('/:id', (req, res) => {
  //   return Application.update({
  //     //data
  //   }, {
  //     where: {
  //       id: {
  //         [Op.eq]: req.params.id
  //       }
  //     }
  //   })
  // })