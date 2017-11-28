const api = module.exports = require('express').Router()

api
  .use('/app', require('./app'))
  .use('/user', require('./user'))
  .use('/company', require('./company'))

api.use((req, res) => res.status(404).end())