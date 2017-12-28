const Op = require('sequelize').Op
const {User, Buyout, Lease, Machine, Customer} = require('../db').db.models
const {isLoggedIn, whoAmI, isAdmin, mayI, transporter} = require('./auth')

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
      toBeSent.byos = byoData
      
      return Promise.all(byoData.map(byo => byo.rep.getBranch()))
    })
    .then(branchData => {
      toBeSent.branches = branchData

      return Promise.all(toBeSent.byos.map(byo => byo.rep.getDealer()))
    })
    .then(dealerData => {
      toBeSent.dealers = dealerData

      return Promise.all(toBeSent.byos.map(byo => {
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
    .then(leases => {
      toBeSent.leases = leases

      res.send(toBeSent)
    })
  })

  .put('/', isLoggedIn, (req, res) => {
    // mayI(req.body.token, req.body.byo.id)
    let me = whoAmI(req.body.token)
    let theByo
    let byo = (req.body.byo.id === 'new') ?
      Buyout.create({
        status: req.body.byo.status,
        date: req.body.byo.date,
        expiry: req.body.byo.expiry,
        quote: req.body.byo.quote,
        comments: req.body.byo.comments,
        repId: me.id
      })
      :
      Buyout.update({
        status: req.body.byo.status,
        expiry: req.body.byo.expiry,
        quote: req.body.byo.quote,
        comments: req.body.byo.comments,
      }, {
      where: {
        id: {
          [Op.eq]: req.body.byo.id
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
    Promise.all([byo, cus])
    .then((data) => {
      let byo = (Array.isArray(data[0])) ? data[0][1][0] : data[0]
      let cus = (Array.isArray(data[1])) ? data[1][1][0] : data[1]
      return byo.setCustomer(cus)
    })
    .then((data) => {
      theByo = data

      return Promise.all(req.body.byo.leases.map(lse => {
        return (lse.id === 'new') ?
          Lease.create({
            number: lse.number,
            company: lse.company,
            amount: lse.amount,
            buyoutId: theByo.id
          })
          :
          Lease.update({
            number: lse.number,
            company: lse.company,
            amount: lse.amount,
            buyoutId: theByo.id
          }, {
            where: {
              id: {
                [Op.eq]: lse.id
              }
            },
            returning: true
          })
      }))
    })
    .then(leases => {
      return Promise.all(leases.map((lse, index) => {
        return Promise.all(req.body.byo.leases[index].machines.map((mac, mIndex) => {
          return (mac.id === 'new') ?
            Machine.create({
              serial: mac.serial,
              make: mac.make,
              model: mac.model,
              location: mac.location,
              LeaseId: (Array.isArray(lse)) ? lse[1][0].id : lse.id
            })
            :
            Machine.update({
              serial: mac.serial,
              make: mac.make,
              model: mac.model,
              location: mac.location,
              LeaseId: (Array.isArray(lse)) ? lse[1][0].id : lse.id
            },{
              where: {
                id: {
                  [Op.eq]: mac.id
                }
              },
              returning: true
            })
        }))
      }))
    })
    .then(data => {
      res.send('success, reloading byos')
    })
  })


  .post('/pdf', isLoggedIn, (req, res) => {
    
  })

  .post('/email', isLoggedIn, isAdmin, (req, res) => {
    transporter.sendMail({
      from: 'impactpreview@gmail.com',
      to: 'tatan42@gmail.com', /* req.body.rep.email, */
      subject: '[myAdmin Central] One of your buyouts has changed',
      text: `Your buyout for ${req.body.customer.name} has changed. Please sign in to aci for more information.`
    })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.error(err)
      res.send('everything is burning')
    })
  })