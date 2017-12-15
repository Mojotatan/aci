const fs = require('fs')
const path = require('path')
const Op = require('sequelize').Op
const {User, Dealer, Region, Branch, Application, Guarantee} = require('../db').db.models
const jwt = require('jsonwebtoken')
const {isAdmin} = require('./auth')
const bcrypt = require('bcrypt')

const cert = fs.readFileSync('.reamde')


module.exports = require('express').Router()
// todo: auth filter

  .post('*', (req, res) => {
    let account
    User.findOne({
      where: {
        email: {
          [Op.eq]: req.body.u
        }
      },
      include: ['dealer']
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
        dealer: account.dealer.id
      }, cert)
    })
    .then(token => {
      res.send({token, name: account.fullName})
    })
    .catch(err => console.error(err))
  })