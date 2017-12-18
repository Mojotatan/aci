const Op = require('sequelize').Op
const {User, Buyout, Lease, Machine} = require('../db').db.models
const {isLoggedIn, whoAmI} = require('./auth')

module.exports = require('express').Router()

  .post('/', isLoggedIn, (req, res) => {
    let me = whoAmI(req.body.token)
    let toBeSent = {}
    return User.findOne({
      attributes: ['id', 'level', 'dealerId', 'regionId', 'branchId'],
      where: {
        id: {
          [Op.eq]: me.id}
      }
    })
    .then(data => {
      if (data.level === 'branchManager') {
        return User.findAll({
          attributes: ['id'],
          where: {
            branchId: {
              [Op.eq]: data.branchId
            }
          }
        })
      } else if (data.level === 'regionManager') {
        return User.findAll({
          attributes: ['id'],
          where: {
            regionId: {
              [Op.eq]: data.regionId
            }
          }
        })
      } else if (data.level === 'boss') {
        return User.findAll({
          attributes: ['id'],
          where: {
            dealerId: {
              [Op.eq]: data.dealerId
            }
          }
        })
      } else return [{id: data.id}]
    })
    .then((data) => {
      let query = data.map(elem => {
        return elem.id
      })
      return Buyout.findAll({
        where: {
          repId: {
            [Op.or]: query
          }
        },
        include: ['rep', /*'guarantee',*/ 'customer']
      })
    })
    .then((byoData) => {
      toBeSent.buyouts = byoData

      return Promise.all(byoData.map(byo => {
        return Lease.findAll({
          where: {
            buyoutId: {
              [Op.eq]: byo.id
            }
          },
          include: ['machines']
        })
      }))
    })
    .then((leases) => {
      // leases.forEach((lease, index) => {
      //   toBeSent.buyouts[index].leases = lease
      // })
      toBeSent.leases = leases

      res.send(toBeSent)
    })
  })
