const Op = require('sequelize').Op
const {User, Company, Region, Branch, Application, Guarantee} = require('../db').db.models
const {isLoggedIn} = require('./auth')

module.exports = require('express').Router()

  .get('/', isLoggedIn, (req, res) => {
    return Application.findOne({
      where: {
        id: {
          [Op.eq]: req.params.id}
      }
    })
    .then((data) => {
      res.send(data)
    })
  })
