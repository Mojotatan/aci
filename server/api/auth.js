const fs = require('fs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const cert = fs.readFileSync('.reamde')

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

// unfinished
const mayI = (token, appId) => {
  let me = whoAmI(token)
  if (me.level === 'Admin') return true

}

const mailTransporter = nodemailer.createTransport({
  host: 'sub5.mail.dreamhost.com',
  auth: {user: 'team@myadmindev.xyz', pass: 'Goldfish^2018'},
  port: 465,
  secure: true
})

module.exports = {isLoggedIn, isAdmin, whoAmI, mayI, mailTransporter}