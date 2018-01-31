const formidable = require('formidable')
const fs = require('fs')
const path = require('path')

const {isLoggedIn, isAdmin} = require('./auth')

module.exports = require('express').Router()

  .get('/pdf', (req, res) => {
    res.render('pdfUpload.html')
  })

  .post('/pdf', /*isLoggedIn, isAdmin,*/ (req, res) => {
    let form = new formidable.IncomingForm()
    form.uploadDir = path.resolve(__dirname, '../uploads/pdf/')
    form.parse(req, (err, fields, files) => {
      let oldPath = files.filetoupload.path
      console.log(oldPath)
      let newPath = path.resolve(__dirname, '../uploads/pdf/' + files.filetoupload.name)
      fs.rename(oldPath, newPath, err => {
        if (err) throw err
        res.send('file uploaded successfully')
      })
    })
  })

  .get('/pdf/:name', /*isLoggedIn, isAdmin,*/ (req, res) => {
    let filePath = path.resolve(__dirname, '../uploads/pdf/' + req.params.name)
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath)
    } else {
      res.send('no such file found')
    }
  })