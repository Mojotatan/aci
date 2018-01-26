const {isLoggedIn, isAdmin, mailTransporter} = require('./auth')

module.exports = require('express').Router()
  .post('/', isLoggedIn, isAdmin, (req, res) => {
    let message = {
      from: 'team@myadmindev.xyz',
      to: req.body.to,
      cc: req.body.cc,
      subject: req.body.subject,
      text: req.body.text,
      // html:
    }
    mailTransporter.sendMail(message)
    .then((data) => {
      res.send({accepted: true})
    })
    .catch(err => {
      res.send({accepted: false})
    })
  })