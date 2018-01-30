const fs = require('fs')
const path = require('path')
const Op = require('sequelize').Op
const {User, Dealer, Region, Branch, Application, Guarantee} = require('../db').db.models
const jwt = require('jsonwebtoken')
const {isAdmin, mailTransporter} = require('./auth')
const bcrypt = require('bcrypt')

const cert = fs.readFileSync('.reamde')

module.exports = require('express').Router()

  .get('/reset', (req, res) => {
    let valid = jwt.verify(req.query.access_token, cert)
    console.log('valid?', valid)
    if (!valid) {
      console.error(err)
      res.send('Invalid token')
    } else {
      res.render('reset.html', {user: valid.user})
    }
  })

  .post('/forgot', (req, res) => {
    // expecting an email address in req.body
    User.findOne({
      where: {
        email: {
          [Op.eq]: req.body.email
        }
      }
    })
    .then(usr => {
      if (!usr) res.send({message: ['red', 'No such user email exists']})
      else {
        // jwt.sign
        let url = 'localhost:1337/api/login/reset?access_token=' + jwt.sign({user: usr.email}, cert, {expiresIn: '5m'})
        let contents = `<!DOCTYPE html><html><p>To reset the password for your account with MyAdminCentral, click <a href="${url}">${url}</a></p><p>If you did not trigger this password reset, ignore this email.</p></html>`
        // let contents = fs.createWriteStream('public/pwreset.html', 'utf8')
        //   .on
        let message = {
          from: 'team@myadmindev.xyz',
          // to: usr.email,
          to: 'tatan42@gmail.com',
          subject: 'Password Reset',
          // text: usr.email,
          html: new Buffer(contents)
        }
        mailTransporter.sendMail(message)
        .then(data => {
          res.send({message: ['green', `Message sent to ${usr.email}`]})
        })
        .catch(err => {
          res.send({message: ['red', 'Message failed to send']})
        })
      }
    })
    .catch(err => console.error(err))
  })

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