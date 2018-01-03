const fs = require('fs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
var oauth2Client = require('../oauth')

// var google = require('googleapis');
// var OAuth2 = google.auth.OAuth2;
// var oauth2Client = new OAuth2(
//   '158897282442-6eenteahs6scsi3gddci010jojqpm0gj.apps.googleusercontent.com',
//   'FF5ZEo3JzYl5Jc-fp0LjYaeO',
//   'https://localhost:1337/auth'
// );
// var scopes = [
//   'https://mail.google.com/'
// ];
// var url = oauth2Client.generateAuthUrl({access_type: 'offline', scope: scopes})


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

// user: 'team@myadmincentral.com',
// pass: 'changeisgood3'

// console.log(google.options.auth.getToken())

let oauth = JSON.parse(fs.readFileSync('key.json')) || {}

const transporter = nodemailer.createTransport({
  // service: 'gmail.com',
  host: 'smtp.gmail.com',
  secure: true,
  auth: {
    // user: 'impactpreview@gmail.com',
    // pass: 'acitesting'
    
    type: 'OAuth2',
    user: 'impactpreview@gmail.com',
    // pass: 'acitesting',

    // clientId: '158897282442-6eenteahs6scsi3gddci010jojqpm0gj.apps.googleusercontent.com',
    // clientSecret: 'FF5ZEo3JzYl5Jc-fp0LjYaeO',
    // refreshToken: '1/VHtGTGCZp1i6phj3NlXi_i2yl89sJDpkQL68jxG8D1k',
    // accessToken: 'ya29.GlswBfd4mlRfEm8e7OnazSXFJAUM2aXtwS0AU8hKHdr12H8IytT98dxm2OqdttxE7WhQJzSL49AKjJCiCCU0On48TSQ_6XEyqPMjUm1VIZclhYZgH55SCvOzfQ-4',
    // expires: 1514411290272

    serviceClient: oauth.client_id,
    privateKey: oauth.private_key,
    accessToken: 'who cares',
    expires: 1484314697598
  },
//   tls: {
//     rejectUnauthorized: false
// }
})

module.exports = {isLoggedIn, isAdmin, whoAmI, mayI, transporter}