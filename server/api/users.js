const path = require('path')
const Op = require('sequelize').Op
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Dealer, Region, Branch} = require('../db').db.models
const {cert, isLoggedIn, isAdmin, mailTransporter, mailFooter} = require('./auth')


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
    let email
    let prom = (req.body.user.id === 'new') ?
      User.create({
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        level: req.body.user.level,
        email: req.body.user.email,
        phone: req.body.user.phone,
        password: req.body.user.password || (Math.random() * 10000).toString(),
        dealerId: req.body.user.dealerId,
        regionId: req.body.user.regionId,
        branchId: req.body.user.branchId,
        // managerId: req.body.user.managerId || null
      }, {
        returning: true
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
          returning: true,
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
          returning: true,
          where: {
            id: {
              [Op.eq]: req.body.user.id
            }
          }
        })
    prom.then(data => {
      email = data[1][0].email
    //   return data[1][0].setManager(null)
    // })
    // .then(() => {
      res.send('success')
      if (req.body.user.id === 'new') {
        let url = 'http://myadmindev.xyz/api/login/reset?access_token=' + jwt.sign({user: data.email}, cert, {expiresIn: '24h'})
        let contents = `<p>A new account has been created for you at MyAdminCentral</p><p>To set the password on this account, click <a href="${url}">${url}</a></p><p>If this link does not work, please visit <a>MyAdminCentral</a> and click "I forgot my password".`
        let message = {
          from: 'team@myadmindev.xyz',
          to: data.email,
          // to: 'tatan42@gmail.com',
          subject: 'Account Created at MyAdminCentral',
          html: contents + mailFooter,
          attachments: [{
            filename: 'myadmin_logo.png',
            path: path.resolve(__dirname, '../../public/assets/img/myadmin_logo.png'),
            cid: 'logo'
          }]
        }
        return mailTransporter.sendMail(message)
      }
    })
    // .then(() => res.send('success'))
    .then(() => console.log('success'))
    .catch(err => {
      console.error('error:', err)
      res.send({err})
    })
  })
