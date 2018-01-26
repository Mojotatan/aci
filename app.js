const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const testTransport = require('./server/api/auth.js').testTransport

// var google = require('googleapis');
// var OAuth2 = google.auth.OAuth2;
// var oauth2Client = new OAuth2(
//   '158897282442-6eenteahs6scsi3gddci010jojqpm0gj.apps.googleusercontent.com',
//   'FF5ZEo3JzYl5Jc-fp0LjYaeO',
//   'http://localhost:1337/oauth'
// );
// var scopes = [
//   'https://www.googleapis.com/auth/gmail.send'
// ];
// var url = oauth2Client.generateAuthUrl({access_type: 'offline', scope: scopes})
// --break--
// var oauth2Client = require('./server/oauth')
// var scopes = [
//   'https://www.googleapis.com/auth/gmail.send'
// ];
// var url = oauth2Client.generateAuthUrl({access_type: 'offline', scope: scopes})

const db = require('./server/db').db

let port = process.env.PORT || '1337'
const app = express()
db.sync()
.then(() => {
  const server = app.listen(port, () => {console.log(`Listening on port ${port}...`)})
  
  app
    .use(morgan('tiny'))

    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))

    .use(express.static('public'))

    // Routes
    .use('/api', require('./server/api/api'))

    // .get('/mail', (req, res) => {
    //   let message = {
    //     from: 'team@myadmindev.xyz',
    //     to: 'tatan42@gmail.com',
    //     subject: 'YOLO',
    //     text: 'Seriously tho if this worked, hype'
    //   }
    //   testTransport.sendMail(message)
    //   .then((data) => {
    //     console.log(data)
    //     res.send(data)
    //   })
    //   .catch(err => {
    //     console.error(err)
    //     res.send('error!')
    //   })
    // })

    // .get('/auth', (req, res) => {
    //   res.send(`<a href=${url}>CLICK ME</a>`)
    // })

    // .get('/oauth', (req, res) => {
    //   console.log('YES', req.query)
    //   oauth2Client.getToken(req.query.code, (err, tokens) => {
    //     console.log('client', oauth2Client)
    //   })
    //   res.redirect('/')
    // })

    .get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, './public/index.html'))
    })
})
.catch(err => console.error(err))