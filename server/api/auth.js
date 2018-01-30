const fs = require('fs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const cert = process.env.CERT || fs.readFileSync('.reamde')

const whoAmI = (token) => {
  return jwt.verify(token, cert, (err, decoded) => {
    return (err) ? false : decoded
  })
}

const isLoggedIn = (req, res, next) => {
  let me = whoAmI(req.body.token)
  if (!me) res.send('Please log in')
  next()
}

const isAdmin = (req, res, next) => {
  let me = whoAmI(req.body.token)
  if (me.level !== 'Admin') res.send('Admin access required')
  next()
}

const mailTransporter = nodemailer.createTransport({
  host: 'sub5.mail.dreamhost.com',
  auth: {user: 'team@myadmindev.xyz', pass: process.env.EMAIL_PW},
  port: 465,
  secure: true
})

module.exports = {isLoggedIn, isAdmin, whoAmI, mailTransporter}