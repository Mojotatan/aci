const Op = require('sequelize').Op
const formidable = require('formidable')

const {User, Application, Customer, Lease, Machine, Action} = require('../db').db.models
const {isLoggedIn, whoAmI, isAdmin, transporter} = require('./auth')

module.exports = require('express').Router()

  // loading all apps a user has access to
  .post('/', isLoggedIn, (req, res) => {
    let me = whoAmI(req.body.token)
    // defining variables here for scope purposes
    let appsToReturn, branchesToReturn, dealersToReturn, leasesToReturn
    return User.findOne({
      attributes: ['id', 'level', 'dealerId', 'regionId', 'branchId'],
      where: {
        id: {
          [Op.eq]: me.id
        }
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
        include: ['rep', /*'guarantee',*/ 'customer'],
        order: [['createdAt', 'ASC']]
      })
    })
    .then(appData => {
      appsToReturn = appData
      // filter out draft apps for admins unless they are the creator
      if (me.level === 'Admin') {
        appsToReturn = appData.filter(app => {
          return app.status !== 'Draft' || app.repId === me.id
        })
      }
      return Promise.all(appsToReturn.map(app => app.rep.getBranch()))
    })
    .then(branchData => {
      branchesToReturn = branchData
      return Promise.all(appsToReturn.map(app => app.rep.getDealer()))
    })
    .then(dealerData => {
      dealersToReturn = dealerData
      return Promise.all(appsToReturn.map(app => {
        return Lease.findAll({
          where: {
            appId: {
              [Op.eq]: app.id
            }
          },
          include: ['machines'],
          order: [['createdAt', 'ASC'], ['machines', 'createdAt', 'ASC']],
        })
      }))
    })
    .then(leaseData => {
      leasesToReturn = leaseData
      return Promise.all(appsToReturn.map(app => {
        return Action.findAll({
          where: {
            appId: {
              [Op.eq]: app.id
            }
          },
          include: ['admin'],
          order: [['createdAt', 'DESC']]
        })
      }))
    })
    .then(appActions => {
      res.send({
        apps: appsToReturn,
        branches: branchesToReturn,
        dealers: dealersToReturn,
        leases: leasesToReturn,
        actions: appActions
      })
    })
    .catch(err => console.error(err))
  })


  // experimental user control flow style -- each user would have an immediate manager field,
  // which would allow for cleaner code for getting associated apps, and make custom hierarchies
  // much easier to implement

  .get('/cascade/:id', (req, res) => {
    let userArr = []
    let cascadeGet = usr => {
      return usr.getUnderlings()
      .then(underlings => {
        userArr = [...userArr, ...underlings.map(ling => ling.id)]
        return Promise.all(underlings.map(ling => cascadeGet(ling)))
      })
    }
    User.findById(Number(req.params.id))
    .then(usr => {
      userArr.push(usr.id)
      return cascadeGet(usr)
    })
    .then(unders => {
      res.send(userArr)
    })
    .catch(err => console.error(err))
  })

  .put('/delete', isLoggedIn, (req, res) => {
    Application.destroy({
      where: {
        id: {
          [Op.eq]: req.body.app
        }
      }
    })
    .then(() => {
      res.send('success')
    })
    .catch(err => console.error(err))
  })


  .put('/', isLoggedIn, (req, res) => {
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
        existingType: req.body.app.existingType,
        existingCustomer: req.body.app.existingCustomer,
        leaseCompany: req.body.app.leaseCompany,
        leaseNumber: req.body.app.leaseNumber,
        funding: req.body.app.funding,
        repRate: req.body.app.repRate,
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
        existingType: req.body.app.existingType,
        existingCustomer: req.body.app.existingCustomer,
        leaseCompany: req.body.app.leaseCompany,
        leaseNumber: req.body.app.leaseNumber,
        funding: req.body.app.funding,
        repRate: req.body.app.repRate,
        comments: req.body.app.comments,
      }, {
      where: {
        id: {
          [Op.eq]: req.body.app.id
        }
      },
      returning: true
      })
    let cus = Customer.findOrCreate({
      where: {
        // Not using [Op] syntax b/c it was trying to create data with object values
        dealerId: me.dealer,
        name: req.body.customer.name
      },
      defaults: {

      }
    })
    Promise.all([app, cus])
    .then((data) => {
      let app = (Array.isArray(data[0])) ? data[0][1][0] : data[0]
      let cus = data[1][0]
      if (!cus.name) return cus.destroy()
      else {
        return Promise.all([app.setCustomer(cus), Customer.update({
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
      theApp = data[0]

      return Promise.all(req.body.app.leases.map(lse => {
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
            quote: lse.quote,
            appId: theApp.id
          })
        } else {
          return Lease.update({
            number: lse.number,
            company: lse.company,
            quote: lse.quote,
            appId: theApp.id
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
        return Promise.all(req.body.app.leases[index].machines.map((mac, mIndex) => {
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
              action: mac.action,
              LeaseId: (Array.isArray(lse)) ? lse[1][0].id : lse.id
            })
            :
            Machine.update({
              serial: mac.serial,
              make: mac.make,
              model: mac.model,
              location: mac.location,
              action: mac.action,
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
      res.send('success, reloading apps')
    })
    .catch(err => {
      console.error(err)
      res.send({err})
    })
  })
