const Op = require('sequelize').Op
const bcrypt = require('bcrypt')
const {User, Dealer, Region, Branch} = require('../db').db.models
const {isLoggedIn, isAdmin} = require('./auth')


module.exports = require('express').Router()

  .post('/', isLoggedIn, isAdmin, (req, res) => {
    return User.findAll({
      include: ['dealer', 'manager']
    })
    .then(users => {
      res.send(users)
    })
    .catch(err => console.error(err))
  })

  .put('/', isLoggedIn, isAdmin, (req, res) => {
    let prom = (req.body.user.id === 'new') ?
      User.create({
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        level: req.body.user.level,
        email: req.body.user.email,
        phone: req.body.user.phone,
        password: req.body.user.password,
        dealerId: req.body.user.dealerId,
        regionId: req.body.user.regionId,
        branchId: req.body.user.branchId,
        managerId: req.body.user.managerId || null
      }, {
  
      })
      :
      (req.body.user.password) ?
        User.update({
          firstName: req.body.user.firstName,
          lastName: req.body.user.lastName,
          level: req.body.user.level,
          active: req.body.user.active,
          email: req.body.user.email,
          phone: req.body.user.phone,
          pwHash: bcrypt.hashSync(req.body.user.password, 10),
          dealerId: req.body.user.dealerId,
          regionId: req.body.user.regionId,
          branchId: req.body.user.branchId,
          managerId: req.body.user.managerId
        }, {
          where: {
            id: {
              [Op.eq]: req.body.user.id
            }
          }
        })
        :
        User.update({
          firstName: req.body.user.firstName,
          lastName: req.body.user.lastName,
          level: req.body.user.level,
          active: req.body.user.active,
          email: req.body.user.email,
          phone: req.body.user.phone,
          dealerId: req.body.user.dealerId,
          regionId: req.body.user.regionId,
          branchId: req.body.user.branchId,
          managerId: req.body.user.managerId
        }, {
          where: {
            id: {
              [Op.eq]: req.body.user.id
            }
          }
        })
    prom.then(data => {
      res.send('success')
    })
    .catch(err => res.send({err}))
  })
