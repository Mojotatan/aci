const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const Op = require('sequelize').Op
const {Buyout} = require('../db').db.models
const {isLoggedIn, isAdmin, whoAmI} = require('./auth')

module.exports = require('express').Router()

  // for debugging
  // .get('/new', (req, res) => {
  //   res.render('pdfUpload.html')
  // })


  // not using middleware because access token had to be on url and not req.body

  .post('/pdf/:id', /*isLoggedIn, isAdmin,*/ (req, res) => {
    let me = whoAmI(req.query.access_token)
    if (!me) res.send('Please log in')
    if (me.level !== 'Admin') res.send('Admin access required')

    let form = new formidable.IncomingForm()
    form.uploadDir = path.resolve(__dirname, '../uploads/pdf/')
    form.parse(req, (err, fields, files) => {
      let oldPath = files.file.path
      let newPath = path.resolve(__dirname, '../uploads/pdf/' + files.file.name)
      fs.rename(oldPath, newPath, err => {
        if (err) res.send({color: 'red', message: 'Something went wrong with the upload'})
        else {
          let fileName = newPath.split('/').pop() // sanitizes malicious file.name, hopefully
          Buyout.findById(Number(req.params.id))
          .then(byo => {
            // if (byo.pdf !== fileName) { // delete previous pdf
            //   fs.unlink(path.resolve(__dirname, '../uploads/pdf/' + byo.pdf), (err) => {if (err) console.error(err)})
            // }
            return Buyout.update({
              pdfs: [...byo.pdfs, fileName]
            }, {
              where: {
                id: {
                  [Op.eq]: Number(req.params.id)
                }
              },
              returning: true
            })
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

  // .post('')

  .get('/pdf/:name', /*isLoggedIn, isAdmin,*/ (req, res) => {
    let me = whoAmI(req.query.access_token)
    if (!me) res.send('Please log in')
    if (me.level !== 'Admin') res.send('Admin access required')

    let filePath = path.resolve(__dirname, '../uploads/pdf/' + req.params.name)
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath)
    } else {
      res.send('no such file found')
    }
  })