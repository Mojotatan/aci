const api = module.exports = require('express').Router()

api
  .use('/apps', require('./apps'))
  .use('/byos', require('./buyouts'))
  .use('/dealers', require('./dealers'))
  .use('/branches', require('./branches'))
  .use('/regions', require('./regions'))
  .use('/customers', require('./customers'))
  .use('/actions', require('./actions'))
  .use('/login', require('./login'))
  .use('/users', require('./users'))
  .use('/mail', require('./mail'))
  .use('/uploads', require('./uploads'))

api.use((req, res) => res.status(404).end())