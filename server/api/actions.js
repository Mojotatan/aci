const Op = require('sequelize').Op

const {Action} = require('../db').db.models
const {isLoggedIn, whoAmI, isAdmin} = require('./auth')

module.exports = require('express').Router()

  .put('/delete', isLoggedIn, isAdmin, (req, res) => {
    Action.destroy({
      where: {
        id: {
          [Op.eq]: req.body.action.id
        }
      }
    })
    .then(success => {
      res.send('booyica booyica 619')
    })
    .catch(err => console.error(err))
  })

  .put('/', isLoggedIn, isAdmin, (req, res) => {
    let me = whoAmI(req.body.token)
    let prom = (req.body.action.id === 'new') ?
      Action.create({
        leasingCompany: req.body.action.leasingCompany,
        appNumber: req.body.action.appNumber,
        date: req.body.action.date,
        status: req.body.action.status,
        legalName: req.body.action.legalName,
        expiry: req.body.action.expiry,
        notes: req.body.action.notes,
        sentToRep: req.body.action.sentToRep,
        appId: req.body.action.appId,
        buyoutId: req.body.action.buyoutId,
        adminId: me.id
      })
      :
      Action.update({
        leasingCompany: req.body.action.leasingCompany,
        appNumber: req.body.action.appNumber,
        date: req.body.action.date,
        status: req.body.action.status,
        legalName: req.body.action.legalName,
        expiry: req.body.action.expiry,
        notes: req.body.action.notes,
        sentToRep: req.body.action.sentToRep
      }, {
        where: {
          id: {
            [Op.eq]: req.body.action.id
          }
        },
        returning: true
      })
    prom.then(success => {
      let expiryReturn = (Array.isArray(success)) ? success[1][0].expiry : success.expiry
      res.send(expiryReturn)
    })
    .catch(err => console.error(err))
  })