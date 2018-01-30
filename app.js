const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const testTransport = require('./server/api/auth.js').testTransport
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

    .use(express.static('public'))

    .set('view engine', 'html')
    .engine('html', nunjucks.render)
    // .set('views', path.resolve(__dirname, './public/views'))

    // Routes
    .use('/api', require('./server/api/api'))

    .get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, './public/index.html'))
    })
})
.catch(err => console.error(err))