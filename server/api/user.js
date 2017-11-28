const Op = require('sequelize').Op
const {User, Company, Region, Branch, Application, Guarantee} = require('../db').db.models


module.exports = require('express').Router()
// todo: auth filter
  // .get('/', (req, res) => {
  //   Application.findAll()
  //   .then((data) => {
  //     res.send(data)
  //   })
  // })

  .get('/apps/:id', (req, res) => {
    return User.findOne({
      attributes: ['level', 'companyId', 'regionId', 'branchId'],
      where: {
        id: {
          [Op.eq]: req.params.id}
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
      } else if (data.level === 'admin') {
        return User.findAll({
          attributes: ['id'],
          where: {
            companyId: {
              [Op.eq]: data.companyId
            }
          }
        })
      } else return [{id: req.params.id}]
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
        }
      })
    })
    .then((data) => {
      res.send(data)
    })
  })

  // put user

  // post user

  // delete = set user to inactive