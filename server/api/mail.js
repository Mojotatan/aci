const path = require('path')
const {isLoggedIn, isAdmin, whoAmI, mailTransporter, mailFooter} = require('./auth')

module.exports = require('express').Router()
  .post('/appSubmit', isLoggedIn, (req, res) => {
    let message = {
      from: 'team@myadmindev.xyz',
      to: req.body.rep.email,
      bcc: ['team@myadmincentral.com'],
      subject: `Application Received for ${req.body.customer.name}`,
      // html: `<p>Hi ${req.body.rep.firstName},</p><p>We have received your application for ${req.body.customer.name}. We will email your approval/decision as soon as possible.</p><p>Should you have any questions please feel free to contact us at <a href="mailto:team@myadmincentral.com">team@myadmincentral.com</a>.</p><p>Thank you for the Application!</p><p>Sincerely,<br>Myadmincentral.com</p>`
      html: `<p>Dear ${req.body.rep.fullName},</p>
      <p>We have received your application for ${req.body.customer.name}. We will get back to you as soon as we have an answer.</p>
      <p>Thanks,<br>
      MyAdminCentral</p>
      ` + mailFooter,
      attachments: [{
        filename: 'myadmin_logo.png',
        path: path.resolve(__dirname, '../../public/assets/img/myadmin_logo.png'),
        cid: 'logo'
      }]
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

  .post('/byoSubmit', isLoggedIn, (req, res) => {
    let message = {
      from: 'team@myadmindev.xyz',
      to: req.body.rep.email,
      bcc: ['team@myadmincentral.com'],
      subject: `Buyout Request Received for ${req.body.customer.name}`,
      // html: `<p>Hi ${req.body.rep.firstName},</p><p>We have received your application for ${req.body.customer.name}. We will email your approval/decision as soon as possible.</p><p>Should you have any questions please feel free to contact us at <a href="mailto:team@myadmincentral.com">team@myadmincentral.com</a>.</p><p>Thank you for the Application!</p><p>Sincerely,<br>Myadmincentral.com</p>`
      html: `<p>Dear ${req.body.rep.fullName},</p>
      <p>We have received your buyout request for ${req.body.customer.name}. We send your quotes as soon as we can.</p>
      <p>Thanks,<br>
      MyAdminCentral</p>
      ` + mailFooter,
      attachments: [{
        filename: 'myadmin_logo.png',
        path: path.resolve(__dirname, '../../public/assets/img/myadmin_logo.png'),
        cid: 'logo'
      }]
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
    let me = whoAmI(req.body.token)
    let message = {
      from: 'team@myadmindev.xyz',
      to: req.body.to,
      cc: req.body.cc,
      bcc: ['team@myadmincentral.com'],
      subject: req.body.subject,
      // text: req.body.text,
      html: req.body.html.split('\n').join('<br>') + mailFooter,
      attachments: [{
        filename: 'myadmin_logo.png',
        path: path.resolve(__dirname, '../../public/assets/img/myadmin_logo.png'),
        cid: 'logo'
      }]
    }
    mailTransporter.sendMail(message)
    .then(data => {
      res.send({accepted: true})
    })
    .catch(err => {
      res.send({accepted: false})
    })
  })