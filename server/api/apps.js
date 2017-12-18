const Op = require('sequelize').Op
const {User, Application, Customer} = require('../db').db.models
const {isLoggedIn, whoAmI, mayI} = require('./auth')

module.exports = require('express').Router()

  .post('/', isLoggedIn, (req, res) => {
    let me = whoAmI(req.body.token)
    return User.findOne({
      attributes: ['id', 'level', 'dealerId', 'regionId', 'branchId'],
      where: {
        id: {
          [Op.eq]: me.id}
      }
    })
    .then(data => {
      if (data.level === 'Branch Manager') {
        return User.findAll({
          attributes: ['id'],
          where: {
            branchId: {
              [Op.eq]: data.branchId
            }
          }
        })
      } else if (data.level === 'Region Manager') {
        return User.findAll({
          attributes: ['id'],
          where: {
            regionId: {
              [Op.eq]: data.regionId
            }
          }
        })
      } else if (data.level === 'Senior Manager') {
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
      return Application.findAll({
        where: {
          repId: {
            [Op.or]: query
          }
        },
        include: ['rep', /*'guarantee',*/ 'customer']
      })
    })
    .then((appData) => {
      res.send(appData)
    })
  })

  .put('/', isLoggedIn, (req, res) => {
    // mayI(req.body.token, req.body.app.id)
    let returning
    return Application.update({
      status: req.body.app.status,
      amount: req.body.app.amount,
      expiry: req.body.app.expiry,
      term: req.body.app.term,
      advancedPayments: req.body.app.advancedPayments,
      endOfTerm: req.body.app.endOfTerm,
      type: req.body.app.type,
      currentLeaseCompany: req.body.app.currentLeaseCompany,
      erp: req.body.app.erp,
      bank: JSON.stringify(req.body.app.bank),
      comments: req.body.app.comments,
    }, {
      where: {
        id: {
          [Op.eq]: req.body.app.id
        }
      },
      returning: true
    })
    .then(data => {
      // returning.app = data
      // return Customer.update({
      //   where: {
      //     id
      //   }
      // })

      // console.log(data)
      // res.send(data[1][0])

      res.send('success, reloading apps')
    })
  })
