const api = module.exports = require('express').Router()

api
  .use('/apps', require('./apps'))

api.use((req, res) => res.status(404).end())