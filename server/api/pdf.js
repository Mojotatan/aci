const PDF = require('pdfkit')
const blobStream = require('blob-stream')
const Op = require('sequelize').Op
// const {} = require('../db').db.models
const {isLoggedIn, isAdmin} = require('./auth')

module.exports = require('express').Router()

  .post('/', isLoggedIn, isAdmin, (req, res) => {
    res.type('application/pdf')
    let doc = new PDF({autoFirstPage: false})
    doc.pipe(res)
    doc.addPage({
      margin: 15
    })
    doc.text('ahoy there')
    doc.end()
    // stream.on('finish', () => {
    //   let blob = stream.toBlob('application/pdf')
    //   res.send(blob)
    //   let a = document.createElement('a')
    //   let url = URL.createObjectURL(blob)
    //   a.href = url

    //   a.download = 'TITLE'
    //   document.body.appendChild(a)
    //   a.click()
    //   setTimeout(() => {
    //       document.body.removeChild(a)
    //       window.URL.revokeObjectURL(url)
    //   }, 3000)
    // })
  })

  // .get('/', (req, res) => {
  //   res.type('application/pdf')
  //   let doc = new PDF({autoFirstPage: false})
  //   doc.pipe(res)
  //   doc.addPage({
  //     margin: 15
  //   })
  //   doc.text('ahoy there')
  //   doc.end()
  // })