const api = module.exports = require('express').Router()

api
  .use('/apps', require('./apps'))
  .use('/byos', require('./buyouts'))
  .use('/dealers', require('./dealers'))
  .use('/branches', require('./branches'))
  .use('/regions', require('./regions'))
  .use('/customers', require('./customers'))
  .use('/login', require('./login'))
  .use('/users', require('./users'))

api.use((req, res) => res.status(404).end())