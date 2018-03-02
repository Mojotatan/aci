const {isLoggedIn, isAdmin, mailTransporter} = require('./auth')

module.exports = require('express').Router()
  .post('/appSubmit', isLoggedIn, (req, res) => {
    let message = {
      from: 'team@myadmindev.xyz',
      to: req.body.rep.email,
      // to: 'tatan42@gmail.com',
      subject: 'Application Received',
      html: `<p>Hi ${req.body.rep.firstName},</p><p>We have received your application for ${req.body.customer.name}. We will email your approval/decision as soon as possible.</p><p>Should you have any questions please feel free to contact us at <a href="mailto:team@myadmincentral.com">team@myadmincentral.com</a>.</p><p>Thank you for the Application!</p><p>Sincerely,<br>Myadmincentral.com</p>`
    }
    mailTransporter.sendMail(message)
    .then(data => {
      res.send({accepted: true})
    })
    .catch(err => {
      console.error(err)
      res.send({accepted: false})
    })
  })

  .post('/', isLoggedIn, isAdmin, (req, res) => {
    let message = {
      from: 'team@myadmindev.xyz',
      to: req.body.to,
      cc: req.body.cc,
      subject: req.body.subject,
      text: req.body.text,
      html: req.body.html
    }
    mailTransporter.sendMail(message)
    .then(data => {
      res.send({accepted: true})
    })
    .catch(err => {
      res.send({accepted: false})
    })
  })