const fs = require('fs')
const path = require('path')
const Op = require('sequelize').Op
const {User, Dealer, Region, Branch, Application, Guarantee} = require('../db').db.models
const jwt = require('jsonwebtoken')
const {isAdmin} = require('./auth')
const bcrypt = require('bcrypt')

const cert = fs.readFileSync('.reamde')


module.exports = require('express').Router()

  .post('*', (req, res) => {
    let account
    User.findOne({
      where: {
        email: {
          [Op.eq]: req.body.u
        }
      },
      include: ['dealer', 'region', 'branch']
    })
    .then(data => {
      if (!data) res.send('Incorrect username')
      else if (!data.active) res.send('That user is not active')
      account = data
      return bcrypt.compare(req.body.pw, account.pwHash)
    })
    .then(match => {
      if (!match) res.send('Incorrect username or password')
      return jwt.sign({
        id: account.id,
        level: account.level,
        branch: (account.branch) ? account.branch.id : null,
        region: (account.region) ? account.region.id : null,
        dealer: (account.dealer) ? account.dealer.id : null
      }, cert)
    })
    .then(token => {
      res.send({
        token,
        user: {
          fullName: account.fullName,
          level: account.level,
          email: account.email,
          phone: account.phone,
          branch: (account.branch) ? account.branch.name : null,
          region: (account.region) ? account.region.name : null,
          dealer: (account.dealer) ? account.dealer.name : null
        }
      })
    })
    .catch(err => console.error(err))
  })