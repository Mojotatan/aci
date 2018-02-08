const Op = require('sequelize').Op

const {Action} = require('../db').db.models
const {isLoggedIn, whoAmI, isAdmin} = require('./auth')

module.exports = require('express').Router()

  .put('/', isLoggedIn, isAdmin, (req, res) => {
    let me = whoAmI(req.body.token)
    let prom = (req.body.action.id === 'new') ?
      Action.create({
        activity: req.body.action.activity,
        leasingCompany: req.body.action.leasingCompany,
        appNumber: req.body.action.appNumber,
        date: req.body.action.date,
        status: req.body.action.status,
        notes: req.body.action.notes,
        appId: req.body.action.appId,
        adminId: me.id
      })
      :
      Action.update({
        activity: req.body.action.activity,
        leasingCompany: req.body.action.leasingCompany,
        appNumber: req.body.action.appNumber,
        date: req.body.action.date,
        status: req.body.action.status,
        notes: req.body.action.notes
      }, {
        where: {
          id: {
            [Op.eq]: req.body.action.id
          }
        }
      })
    prom.then(success => {
      res.send('fishion accomplished')
    })
    .catch(err => console.error(err))
  })