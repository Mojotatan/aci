const Op = require('sequelize').Op
const {User, Lease} = require('../db').db.models
const {isLoggedIn, whoAmI} = require('./auth')


module.exports = require('express').Router()

  .post('/companies', isLoggedIn, (req, res) => {
    let me = whoAmI(req.body.token)
    return Lease.findAll({
      where: {
        dealerId: {
          [Op.eq]: me.dealer
        }
      }
    })
    .then(leases => {
      res.send(leases.map(lse => lse.company))
    })
    .catch(err => console.error(err))
  })