const Op = require('sequelize').Op

const {Log} = require('../db').db.models
const {isLoggedIn, whoAmI, isAdmin} = require('./auth')

module.exports = require('express').Router()

  .post('/new', isLoggedIn, (req, res) => {
    let me = whoAmI(req.body.token)
    let now = new Date()
    Log.destroy({
      where: {
        date: {
          [Op.gt]: now
        }
      }
    })
    .then(success => {
      return Promise.all([
        Log.create({
          date: req.body.date,
          activity: req.body.activity,
          adminId: me.id,
          appId: req.body.app
        }),
        Log.create({
          date: req.body.expiry,
          activity: `Application <b>${req.body.action.appNumber}<b> to ${req.body.action.leasingCompany} expired`,
          adminId: me.id,
          appId: req.body.app
        })
      ])
    })
    .then(success => {
      res.send('fishion accomplished')
    })
    .catch(err => console.error(err))
  })