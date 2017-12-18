const api = module.exports = require('express').Router()

api
  .use('/app', require('./app'))
  .use('/apps', require('./apps'))
  .use('/byos', require('./byos'))
  .use('/user', require('./user'))
  .use('/dealer', require('./dealer'))
  .use('/login', require('./login'))

api.use((req, res) => res.status(404).end())