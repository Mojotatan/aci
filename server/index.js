const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const db = require('./db')

let port = process.env.PORT || '3000'
const app = express()
db.sync()
.then(() => {
  const server = app.listen(port, () => {console.log('Listening on port 3000...')})
  
  app
    .use(morgan('tiny'))

    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))

    .use(express.static('public'))

    // Routes
    .use('/api', require('./api'))

    .get('*', (req, res) => {
      res.sendFile('/public/index.html')
    })
})
.catch(err => console.error(err))