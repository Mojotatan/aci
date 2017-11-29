const api = module.exports = require('express').Router()

api
  .use('/app', require('./app'))
  .use('/apps', require('./apps'))
  .use('/user', require('./user'))
  .use('/company', require('./company'))
  .use('/login', require('./login'))

api.use((req, res) => res.status(404).end())