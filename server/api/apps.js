const Op = require('sequelize').Op
const {User, Company, Region, Branch, Application, Guarantee} = require('../db').db.models
const {isLoggedIn, whoAmI} = require('./auth')

module.exports = require('express').Router()

  .post('/', isLoggedIn, (req, res) => {
    let me = whoAmI(req.body.token)
    return User.findOne({
      attributes: ['id', 'level', 'companyId', 'regionId', 'branchId'],
      where: {
        id: {
          [Op.eq]: me.id}
      }
    })
    .then(data => {
      if (data.level === 'branchManager') {
        return User.findAll({
          attributes: ['id'],
          where: {
            branchId: {
              [Op.eq]: data.branchId
            }
          }
        })
      } else if (data.level === 'regionManager') {
        return User.findAll({
          attributes: ['id'],
          where: {
            regionId: {
              [Op.eq]: data.regionId
            }
          }
        })
      } else if (data.level === 'boss') {
        return User.findAll({
          attributes: ['id'],
          where: {
            companyId: {
              [Op.eq]: data.companyId
            }
          }
        })
      } else return [{id: data.id}]
    })
    .then((data) => {
      let query = data.map(elem => {
        return elem.id
      })
      return Application.findAll({
        where: {
          repId: {
            [Op.or]: query
          }
        },
        include: ['rep']
      })
    })
    .then((data) => {
      res.send(data)
    })
  })
