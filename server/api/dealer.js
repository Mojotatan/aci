const Op = require('sequelize').Op
const {User, Dealer, Region, Branch, Application, Guarantee} = require('../db').db.models


module.exports = require('express').Router()
// todo: auth filter

  .get('/:id', (req, res) => {
    return Dealer.findOne({
      where: {
        id: {
          [Op.eq]: req.params.id}
      }
    })
    .then((data) => {
      res.send(data)
    })
  })

  // post company

  // put company ?