const api = module.exports = require('express').Router()

api
  .use('/apps', require('./apps'))
  .use('/byos', require('./byos'))
  .use('/dealers', require('./dealers'))
  .use('/branches', require('./branches'))
  .use('/regions', require('./regions'))
  .use('/login', require('./login'))

api.use((req, res) => res.status(404).end())