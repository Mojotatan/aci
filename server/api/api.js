const api = module.exports = require('express').Router()

api
  .use('/actions', require('./actions'))
  .use('/apps', require('./apps'))
  .use('/branches', require('./branches'))
  .use('/byos', require('./buyouts'))
  .use('/customers', require('./customers'))
  .use('/dealers', require('./dealers'))
  .use('/leases', require('./leases'))
  .use('/login', require('./login'))
  .use('/mail', require('./mail'))
  .use('/regions', require('./regions'))
  .use('/uploads', require('./uploads'))
  .use('/users', require('./users'))
  .use('/logs', require('./logs'))
  .use('/pdf', require('./pdf'))

api.use((req, res) => res.status(404).end())