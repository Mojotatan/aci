const fs = require('fs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const cert = process.env.CERT || fs.readFileSync('.devCert')

// takes a token string, validates it, and returns a token object
const whoAmI = (token) => {
  return jwt.verify(token, cert, (err, decoded) => {
    return (err) ? false : decoded
  })
}

// blocks requests that aren't from a logged in user
const isLoggedIn = (req, res, next) => {
  let me = whoAmI(req.body.token)
  if (!me) res.status(403).send('Please log in')
  else next()
}

// blocks requests that aren't from an admin user
const isAdmin = (req, res, next) => {
  let me = whoAmI(req.body.token)
  if (me.level !== 'Admin') res.status(403).send('Admin access required')
  else next()
}

// mail transport -- to send an email, call mailTransporter.sendMail(message)
const mailTransporter = nodemailer.createTransport({
  host: 'sub5.mail.dreamhost.com',
  auth: {user: 'team@myadmindev.xyz', pass: process.env.EMAIL_PW || fs.readFileSync('.devMail')},
  port: 465,
  secure: true
})

const mailFooter = `<br><br>
<img style="border-bottom:1px solid black;width: 235px;" src="cid:logo" /><br>
Admin Central, LLC<br>
Corporate Headquarters<br>
209 West Rollins, Suite 204<br>
Moberly, MO 65270<br>
Call us at (660) 263-1029<br>
Email us at <a href="mailto:team@myadmincentral.com">team@myadmincentral.com</a><br>
<a href="www.myadmincentral.com">www.myadmincentral.com</a>`

module.exports = {cert, isLoggedIn, isAdmin, whoAmI, mailTransporter, mailFooter}