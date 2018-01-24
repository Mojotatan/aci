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
        include: ['rep', /*'guarantee',*/ 'customer'],
        order: [['createdAt', 'ASC']]
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
          include: ['machines'],
          order: [['createdAt', 'ASC'], ['machines', 'createdAt', 'ASC']],
        })
      }))
    })
    .then(leases => {
      toBeSent.leases = leases

      res.send(toBeSent)
    })
    .catch(err => console.error(err))
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
        comments: req.body.byo.comments,
        repId: me.id
      })
      :
      Buyout.update({
        status: req.body.byo.status,
        expiry: req.body.byo.expiry,
        comments: req.body.byo.comments,
      }, {
      where: {
        id: {
          [Op.eq]: req.body.byo.id
        }
      },
      returning: true
      })
    let cus = Customer.findOrCreate({
      where: {
        // Not using [Op] syntax b/c it was trying to create data with object values
        repId: me.id,
        name: req.body.customer.name
      },
      defaults: {

      }
    })
    Promise.all([byo, cus])
    .then((data) => {
      let byo = (Array.isArray(data[0])) ? data[0][1][0] : data[0]
      let cus = data[1][0]
      if (!cus.name) return Promise.all([byo.setCustomer(null), cus.destroy()])
      else {
        return Promise.all([byo.setCustomer(cus), Customer.update({
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
              [Op.eq]: cus.id
            }
          }
        })])
      }
    })
    .then(data => {
      theByo = data[0]

      return Promise.all(req.body.byo.leases.map(lse => {
        if (lse.delete) {
          if (lse.id === 'new') return 0
          else {
            return Lease.destroy({
              where: {
                id: {
                  [Op.eq]: lse.id
                }
              }
            })
          }
        } else if (lse.id === 'new') {
          return Lease.create({
            number: lse.number,
            company: lse.company,
            amount: lse.amount,
            quote: lse.quote,
            buyoutId: theByo.id
          })
        } else {
          return Lease.update({
            number: lse.number,
            company: lse.company,
            amount: lse.amount,
            quote: lse.quote,
            buyoutId: theByo.id
          }, {
            where: {
              id: {
                [Op.eq]: lse.id
              }
            },
            returning: true
          })
        }
      }))
    })
    .then(leases => {
      return Promise.all(leases.map((lse, index) => {
        if (typeof lse === 'number') return []
        return Promise.all(req.body.byo.leases[index].machines.map((mac, mIndex) => {
          if (mac.delete) {
            if (mac.id === 'new') return 0
            else {
              return Machine.destroy({
                where: {
                  id: {
                    [Op.eq]: mac.id
                  }
                }
              })
            }
          } else {
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
          }
        }))
      }))
    })
    .then(data => {
      res.send('success, reloading byos')
    })
    // .catch(err => res.send({err}))
    .catch(err => console.error(err))
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