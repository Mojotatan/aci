const fs = require('fs')
const path = require('path')
const Op = require('sequelize').Op
const {User, Company, Region, Branch, Application, Guarantee} = require('../db').db.models
const jwt = require('jsonwebtoken')
const {isAdmin} = require('./auth')

const cert = fs.readFileSync('.reamde')


module.exports = require('express').Router()
// todo: auth filter

  .post('*', (req, res) => {
    return User.findOne({
      where: {
        id: {
          [Op.eq]: req.body.id
        }
      },
      include: ['company']
    })
    .then((data) => {
      console.log(data.company)
      return jwt.sign({
        id: 7,
        name: data.fullName,
        level: 'rep',
        company: 'impact'
      }, cert)
    })
    .then((data) => {
      res.send(data)
    })
  })