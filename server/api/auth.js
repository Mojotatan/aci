const fs = require('fs')
const jwt = require('jsonwebtoken')

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

const isAdmin = message => (req, res, next) => {
  let me = whoAmI(req.body.token)
  if (me.level !== 'admin') res.send(message)
  next()
}

// const clearance = (token, level) => {
//   return jwt.verify(token, cert).level === level
// }

module.exports = {isLoggedIn, isAdmin}