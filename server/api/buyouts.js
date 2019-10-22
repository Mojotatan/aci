const Op = require('sequelize').Op
const {User, Buyout, Lease, Machine, Customer, Action, Log, Upload} = require('../db').db.models
const {isLoggedIn, whoAmI, isAdmin, transporter} = require('./auth')

module.exports = require('express').Router()

  .post('/new', isLoggedIn, (req, res) => {
    let me = whoAmI(req.body.token)
    Buyout.create({
      comments: 'If you need release information, please indicate in the comment section.',
      repId: me.id
    })
    .then(newByo => {
      return Buyout.findById(newByo.id, {
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

  // loading all byos a user has access to
  .post('/', isLoggedIn, (req, res) => {
    let me = whoAmI(req.body.token)
    let toBeSent = {}  // defining an object to store variables for scope purposes

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
            [Op.eq]: me.branchId
          }
        }
      })
    } else if (me.level === 'Region Manager') {
      usr = User.findAll({
        attributes: ['id'],
        where: {
          regionId: {
            [Op.eq]: me.regionId
          }
        }
      })
    } else if (me.level === 'Senior Manager') {
      usr = User.findAll({
        attributes: ['id'],
        where: {
          dealerId: {
            [Op.eq]: me.dealerId
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
      return Buyout.findAll({
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
    .then(byoData => {
      toBeSent.byos = byoData
      // filter out draft buyouts for admins unless they are the creator
      if (me.level === 'Admin') {
        toBeSent.byos = byoData.filter(byo => {
          return byo.status !== 'Draft' || byo.repId === me.id
        })
      }
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

      return Promise.all(toBeSent.byos.map(byo => {
        return Action.findAll({
          where: {
            buyoutId: {
              [Op.eq]: byo.id
            }
          },
          include: ['admin'],
          order: [['date', 'DESC'], ['updatedAt', 'DESC']]
        })
      }))
    })
    .then(byoActions => {
      toBeSent.actions = byoActions

      return Promise.all(toBeSent.byos.map(byo => {
        return Log.findAll({
          where: {
            buyoutId: {
              [Op.eq]: byo.id
            }
          },
          include: ['admin'],
          order: [['date', 'DESC'], ['createdAt', 'DESC']]
        })
      }))
    })
    .then(byoLogs => {
      toBeSent.logs = byoLogs

      return Promise.all(toBeSent.byos.map(byo => {
        return Upload.findAll({
          where: {
            buyoutId: {
              [Op.eq]: byo.id
            }
          }
        })
      }))
    })
    .then(pdfs => {
      toBeSent.pdfs = pdfs

      res.send(toBeSent)
    })
    .catch(err => {
      console.error(err)
      res.status(500)
    })
  })


  .put('/delete', isLoggedIn, (req, res) => {
    Buyout.destroy({
      where: {
        id: {
          [Op.eq]: req.body.byo
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
    let theByo
    let byo = (req.body.byo.id === 'new') ?
      Buyout.create({
        status: req.body.byo.status,
        date: req.body.byo.date,
        expiry: req.body.byo.expiry,
        comments: req.body.byo.comments,
        pdfs: req.body.byo.pdfs,
        pdfNotes: req.body.byo.pdfNotes,
        // calcs: JSON.stringify(req.body.byo.calcs),
        repId: me.id,
        appId: req.body.byo.appId
      })
      :
      Buyout.update({
        status: req.body.byo.status,
        date: req.body.byo.date,
        expiry: req.body.byo.expiry,
        comments: req.body.byo.comments,
        pdfs: req.body.byo.pdfs,
        pdfNotes: req.body.byo.pdfNotes,
        // calcs: JSON.stringify(req.body.byo.calcs),
        // appId: req.body.appId
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
        dealerId: me.dealer,
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
            quote: lse.quote,
            workbook: JSON.stringify({percentage: '25', taxRate: '9'}),
            buyoutId: theByo.id,
            dealerId: me.dealer
          })
        } else {
          return Lease.update({
            number: lse.number,
            company: lse.company,
            quote: lse.quote,
            workbook: JSON.stringify(lse.workbook),
            buyoutId: theByo.id,
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
      res.send({byoId: theByo.id})
    })
    .catch(err => {
      console.error(err)
      res.status(500).send({err})
    })
  })
