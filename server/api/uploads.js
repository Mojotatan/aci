const formidable = require('formidable')
const fs = require('fs')
const rimraf = require('rimraf')
const path = require('path')
const Op = require('sequelize').Op
const {Buyout, Upload} = require('../db').db.models
const {isLoggedIn, isAdmin, whoAmI} = require('./auth')

module.exports = require('express').Router()

  // for debugging
  // .get('/new', (req, res) => {
  //   res.render('pdfUpload.html')
  // })


  // not using middleware because access token had to be on url and not req.body

  .post('/buyout/:id', /*isLoggedIn, isAdmin,*/ (req, res) => {
    let me = whoAmI(req.query.access_token)
    if (!me) res.send('Please log in')
    if (me.level !== 'Admin') res.send('Admin access required')
    if (me && me.level === 'Admin') {

      Upload.create({buyoutId: Number(req.params.id)}, {returning: true})
      .then(newUpload => {
        fs.mkdirSync(path.resolve(__dirname, `../uploads/${newUpload.id}`))
        let form = new formidable.IncomingForm()
        form.uploadDir = path.resolve(__dirname, `../uploads/${newUpload.id}`)
        form.parse(req, (err, fields, files) => {
          let oldPath = files.file.path
          // console.log('fields', fields)
          // console.log('files', files)
          let newPath = path.resolve(__dirname, `../uploads/${newUpload.id}/${files.file.name}`)
          fs.rename(oldPath, newPath, err => {
            if (err) res.send({color: 'red', message: 'Something went wrong with the upload'})
            else {
              let fileName = newPath.split('/').pop()
              Upload.update({
                name: fileName,
                notes: fields.note
              }, {
                where: {
                  id: {
                    [Op.eq]: newUpload.id
                  }
                },
                returning: true
              })
              .then(data => {
                res.send({color: 'green', message: 'File uploaded successfully'})
              })
              .catch(err => {
                console.error(err)
                res.send({color: 'red', message: 'Something went wrong with the database'})
              })
            }
          })
        })
      })
      .catch(err => {
        console.error(err)
        res.send({color: 'red', message: 'Something went wrong with the database'})
      })
    }
  })

  .get('/:id/:name', /*isLoggedIn, isAdmin,*/ (req, res) => {
    let me = whoAmI(req.query.access_token)
    if (!me) res.send('Please log in')
    if (me.level !== 'Admin') res.send('Admin access required')
    if (me && me.level === 'Admin') {

      let filePath = path.resolve(__dirname, `../uploads/${req.params.id}/${req.params.name}`)
      if (fs.existsSync(filePath)) {
        res.sendFile(filePath)
      } else {
        res.send('No such file found')
      }
    }
  })

  .delete('/:id', /*isLoggedIn, isAdmin,*/ (req, res) => {
    let me = whoAmI(req.query.access_token)
    if (!me) res.send('Please log in')
    if (me.level !== 'Admin') res.send('Admin access required')
    if (me && me.level === 'Admin') {

      Upload.destroy({
        where: {
          id: {
            [Op.eq]: Number(req.params.id)
          }
        }
      })
      .then(success => {
        let filePath = path.resolve(__dirname, `../uploads/${req.params.id}`)
        rimraf(filePath, err => {
          if (err) res.send(err)
          else res.send('success')
        })
      })
      .catch(err => {
        console.error(err)
        res.send(err)
      })
    }
  })
  // if (byo.pdf !== fileName) { // delete previous pdf
  //   fs.unlink(path.resolve(__dirname, '../uploads/pdf/' + byo.pdf), (err) => {if (err) console.error(err)})
  // }
