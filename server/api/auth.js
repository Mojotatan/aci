const fs = require('fs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const {User, Application} = require('../db').db.models

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

// const clearance = (token, level) => {
//   return jwt.verify(token, cert).level === level
// }

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tatan42@gmail.com',
    pass: 'Mojotattat42'
  }
})

module.exports = {isLoggedIn, isAdmin, whoAmI, mayI, transporter}