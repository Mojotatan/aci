const express = require('express')
const https = require('https')
const fs = require('fs')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const path = require('path')
const nunjucks = require('nunjucks')

const db = require('./server/db').db

let port = process.env.PORT || '1337'
const app = express()
db.sync()
.then(() => {
  const server = app.listen(port, () => {console.log(`Listening on port ${port}...`)})
  
  let env = nunjucks.configure('views', {noCache: true})

  app
    .use(morgan('tiny'))

    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))

    .use(helmet())

    .use(express.static('public'))

    .set('view engine', 'html')
    .engine('html', nunjucks.render)
    // .set('views', path.resolve(__dirname, './public/views'))

    // Routes
    .use('/api', require('./server/api/api'))

    .get('/pulse', (req, res) => {
      res.sendStatus(200)
    })

    .get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, './public/index.html'))
    })
})
.catch(err => console.error(err))