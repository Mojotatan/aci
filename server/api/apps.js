const Op = require('sequelize').Op
const formidable = require('formidable')

const {User, Application, Customer, Lease, Machine, Action, Log} = require('../db').db.models
const {isLoggedIn, whoAmI, isAdmin} = require('./auth')

module.exports = require('express').Router()

  .post('/new', isLoggedIn, (req, res) => {
    let me = whoAmI(req.body.token)
    Application.create({
      repId: me.id
    })
    .then(newApp => {
      return Application.findById(newApp.id, {
        include: ['rep']
      })
    })
    .then(data => {
      res.status(201).send(data)
    })
    .catch(err => {
      console.error(err)
      res.status(500)
    })
  })

  // loading all apps a user has access to
  .post('/', isLoggedIn, (req, res) => {
    let me = whoAmI(req.body.token)
    // defining variables here for scope purposes
    let appsToReturn, leasesToReturn, actionsToReturn

    let usr
    if (me.level === 'Admin') {
      usr = User.findAll({
        attributes: ['id'],
      })
    } else if (me.level === 'Branch Manager') {
      usr = User.findAll({
        attributes: ['id'],
        where: {
          branchId: {
            [Op.eq]: me.branch
          }
        }
      })
    } else if (me.level === 'Region Manager') {
      usr = User.findAll({
        attributes: ['id'],
        where: {
          regionId: {
            [Op.eq]: me.region
          }
        }
      })
    } else if (me.level === 'Senior Manager') {
      usr = User.findAll({
        attributes: ['id'],
        where: {
          dealerId: {
            [Op.eq]: me.dealer
          }
        }
      })
    } else usr = []

    let userObj = {} // object not array for faster lookup
    let cascadeGet = usr => {
      if (!userObj[usr.id]) { // check if this user has been cascaded already
        userObj[usr.id] = true
        return usr.getUnderlings()
        .then(underlings => {
          return Promise.all(underlings.map(ling => cascadeGet(ling)))
        })
      }
    }
    
    User.findById(me.id)
    .then(newMe => {
      return Promise.all([usr, cascadeGet(newMe)])
    })
    .then(data => {
      let query = [
        ...data[0].map(elem => {return elem.id}),
        ...Object.keys(userObj).map(key => Number(key))
      ]
      return Application.findAll({
        where: {
          repId: {
            [Op.or]: query
          }
        },
        include: [
          {model: User, as: 'rep', include: ['branch', 'dealer', 'manager']},
          /*'guarantee',*/
          'customer'
        ],
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
          order: [['date', 'DESC'], ['updatedAt', 'DESC']]
        })
      }))
    })
    .then(appActions => {
      actionsToReturn = appActions
      return Promise.all(appsToReturn.map(app => {
        return Log.findAll({
          where: {
            appId: {
              [Op.eq]: app.id
            }
          },
          include: ['admin'],
          order: [['date', 'DESC']]
        })
      }))
    })
    .then(appLogs => {
      res.send({
        apps: appsToReturn,
        leases: leasesToReturn,
        actions: actionsToReturn,
        logs: appLogs
      })
    })
    .catch(err => {
      console.error(err)
      res.status(500)
    })
  })


  // experimental user control flow style -- each user would have an immediate manager field,
  // which would allow for cleaner code for getting associated apps, and make custom hierarchies
  // much easier to implement

  // .get('/cascade/:id', (req, res) => {
  //   let userObj = {} // object not array for faster lookup
  //   let cascadeGet = usr => {
  //     if (!userObj[usr.id]) { // check if this user has been cascaded already
  //       userObj[usr.id] = true
  //       return usr.getUnderlings()
  //       .then(underlings => {
  //         return Promise.all(underlings.map(ling => cascadeGet(ling)))
  //       })
  //     }
  //   }
  //   User.findById(Number(req.params.id))
  //   .then(usr => {
  //     return cascadeGet(usr)
  //   })
  //   .then(unders => {
  //     res.send(Object.keys(userObj).map(key => Number(key)))
  //   })
  //   .catch(err => console.error(err))
  // })


  .put('/delete', isLoggedIn, (req, res) => {
    Application.destroy({
      where: {
        id: {
          [Op.eq]: req.body.app
        }
      }
    })
    .then(() => {
      res.status(200).send('success')
    })
    .catch(err => {
      console.error(err)
      res.status(500)
    })
  })


  .put('/', isLoggedIn, (req, res) => {
    let me = whoAmI(req.body.token)
    let theApp // defining this for scope; need to return ID at the end
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
      theApp = (Array.isArray(data[0])) ? data[0][1][0] : data[0]
      let cus = data[1][0]
      if (!cus.name) return cus.destroy()
      else {
        return Promise.all([theApp.setCustomer(cus), Customer.update({
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
            appId: theApp.id,
            dealerId: me.dealer
          })
        } else {
          return Lease.update({
            number: lse.number,
            company: lse.company,
            quote: lse.quote,
            appId: theApp.id,
            dealerId: me.dealer
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
      res.send({appId: theApp.id})
    })
    .catch(err => {
      console.error(err)
      res.status(500).send({err})
    })
  })
