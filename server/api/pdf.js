const fs = require('fs')
const rimraf = require('rimraf')
const path = require('path')
const Op = require('sequelize').Op
const {Upload, Action} = require('../db').db.models
const {isLoggedIn, isAdmin} = require('./auth')

module.exports = require('express').Router()

  .post('/new', isLoggedIn, isAdmin, (req, res) => {
    Upload.create({buyoutId: req.body.buyout}, {returning: true})
    .then(newUpload => {
      fs.mkdirSync(path.resolve(__dirname, `../uploads/${newUpload.id}`))
      
    })
    .catch(err => {
      console.error(err)
      res.status(500)
    })
  })