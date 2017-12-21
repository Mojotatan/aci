const Op = require('sequelize').Op
const {User, Application, Customer} = require('../db').db.models
const {isLoggedIn, whoAmI, mayI} = require('./auth')

module.exports = require('express').Router()

  .post('/', isLoggedIn, (req, res) => {
    let me = whoAmI(req.body.token)
    let appsToReturn, branchesToReturn
    return User.findOne({
      attributes: ['id', 'level', 'dealerId', 'regionId', 'branchId'],
      where: {
        id: {
          [Op.eq]: me.id}
      }
    })
    .then(data => {
      if (data.level === 'Admin') {
        return User.findAll({
          attributes: ['id'],
        })
      } else if (data.level === 'Branch Manager') {
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
    .then(appData => {
      appsToReturn = appData
      return Promise.all(appsToReturn.map(app => app.rep.getBranch()))
    })
    .then(branchData => {
      branchesToReturn = branchData
      return Promise.all(appsToReturn.map(app => app.rep.getDealer()))
    })
    .then(appDealers => {
      res.send({
        apps: appsToReturn,
        branches: branchesToReturn,
        dealers: appDealers
      })
    })
    // .then(appData => {
    //   appsToReturn = appData
    //   return Promise.all(appData.map(app => app.rep.getBranch()))
    // .then(branchData => {
    //   branchesToReturn = branchData
    //   return Promise.all(appsToReturn.map(app => app.rep.getDealer()))
    // })
    // .then(appDealers => {
    //   res.send({
    //     apps: appsToReturn,
    //     branches: branchesToReturn,
    //     dealers: appDealers
    //   })
    // })
  })

  .put('/', isLoggedIn, (req, res) => {
    // mayI(req.body.token, req.body.app.id)
    let me = whoAmI(req.body.token)
    let app = (req.body.app.id === 'new') ?
      Application.create({
        status: req.body.app.status,
        date: req.body.app.date,
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
        repId: me.id
      })
      :
      Application.update({
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
    let cus = (req.body.customer.id === 'new') ?
      Customer.create({
        name: req.body.customer.name,
        phone: req.body.customer.phone,
        email: req.body.customer.email,
        street: req.body.customer.street,
        city: req.body.customer.city,
        state: req.body.customer.state,
        zip: req.body.customer.zip,
        taxID: req.body.customer.taxID,
        repId: me.id
      })
      :
      Customer.update({
        name: req.body.customer.name,
        phone: req.body.customer.phone,
        email: req.body.customer.email,
        street: req.body.customer.street,
        city: req.body.customer.city,
        state: req.body.customer.state,
        zip: req.body.customer.zip,
        taxID: req.body.customer.taxID
      }, {
        where: {
          id: {
            [Op.eq]: req.body.customer.id
          }
        },
        returning: true
      })
    Promise.all([app, cus])
    .then((data) => {
      let app = (Array.isArray(data[0])) ? data[0][1][0] : data[0]
      let cus = (Array.isArray(data[1])) ? data[1][1][0] : data[1]
      return app.setCustomer(cus)
    })
    .then((data) => {

      res.send('success, reloading apps')
    })
  })
