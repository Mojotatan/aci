const Op = require('sequelize').Op
const {User, Company, Region, Branch, Application, Guarantee} = require('../db').db.models


module.exports = require('express').Router()
// todo: auth filter

  .get('/:id', (req, res) => {
    return User.findOne({})
    .then((data) => {
      res.send(data)
    })
  })