const getDataUri = (url, callback) => {
  let image = new Image()
  image.onload = function() {
      let canvas = document.createElement('canvas')
      canvas.width = this.naturalWidth
      canvas.height = this.naturalHeight

      canvas.getContext('2d').drawImage(this, 0, 0)

      callback(canvas.toDataURL('image/jpg'))
  }
  image.src = url
}

export const getPdf = val => {
  // go isn't invoked until logo images load in (see bottom)
  const go = () => {
    let doc = new PDFDocument({autoFirstPage: false})
    let stream = doc.pipe(blobStream())
    console.log(doc)

    const docWidth = 612
    const docHeight = 792
    const margin = 50
    const docInnerWidth = docWidth - (margin * 2)
    const halfCol = docInnerWidth / 2
    const quarterCol = docInnerWidth / 4
    
    doc.addPage({
      margin: margin
    })

    // header
    // console.log(aciLogo, impactLogo)
    doc.image(aciLogo, docWidth - margin - 120, margin, {width: 120})
    doc.image(impactLogo, margin, margin, {width: 120})
    doc.font('Helvetica').fontSize(8)
    doc.text('myadmincentral.com', {align: 'right'})

    doc.fillColor('#1066a3').font('Helvetica-Bold').fontSize(20)
    doc.text('Sales Quote', margin, 110)

    // by box
    doc.rect(357, 80, 205, 48).stroke('#ced0da')
    doc.fillColor('#000000').fontSize(10)
    doc.text('Requested by:', 367, 90)
    doc.text('Manager:', 367, 108)
    doc.font('Helvetica')
    // insert data

    // customer box
    doc.rect(margin, 133, docInnerWidth, 94).stroke('#ced0da')
    doc.moveTo(margin + 10, 193).lineTo(margin + docInnerWidth - 10, 191).stroke('#ced0da')
    doc.font('Helvetica-Bold')
    doc.text('Customer Name:', margin + 15, 145)
    doc.text('Customer Address:', margin + 179, 145)
    doc.text('Leasing Company:', margin + 358, 145)

    doc.text('Quote Type:', margin + 15, 205)
    doc.text('Lease Number:', margin + 179, 205)
    // vary for full/partial
    doc.rect(margin + 81, 205, 8, 8).fillAndStroke('#1066a3', '#1066a3').fillColor('#000000')
    doc.rect(margin + 122, 205, 8, 8).stroke('#ced0da')
    
    doc.font('Helvetica')
    doc.text('Full', margin + 94, 205)
    doc.text('Partial', margin + 135, 205)

    // insert data
    doc.text('Hey dawg, I heard you like customers', margin + 15, 159, {width: 154})



    // term box
    doc.rect(margin, 232, quarterCol, 411).stroke('#ced0da')
    doc.font('Helvetica-Bold')


    // #F1F4F8

    // gear box
    doc.rect(margin + quarterCol, 232, halfCol + quarterCol, 411).stroke('#ced0da')
    doc.font('Helvetica-Bold')
    doc.text('Gear:', margin + quarterCol + 15, 244)
    doc.text('Serial Number', margin + quarterCol + 142, 244)
    doc.text('Plan', margin + quarterCol + 248, 244)
    doc.text('Included in', margin + quarterCol + 301, 244)

    doc.rect(margin + quarterCol + 15, 258, halfCol + quarterCol - 30, 16).fillAndStroke('#f8f8f8', '#f8f8f8').fillColor('#000000')


    // invoice box
    doc.moveTo(margin + quarterCol, 438).lineTo(margin + docInnerWidth, 438).stroke('#ced0da')
    doc.font('Helvetica-Bold')

    // note box
    doc.rect(margin, 648, docInnerWidth, 94).stroke('#ced0da')
    doc.font('Helvetica-Bold')
    doc.text('Notes:', margin + 15, 660)
    // insert data

    doc.end()
    stream.on('finish', () => {
      let blob = stream.toBlob('application/pdf')
      let a = document.createElement('a')
      let url = URL.createObjectURL(blob)
      a.href = url
  
      a.download = 'TITLE'
      document.body.appendChild(a)
      a.click()
      setTimeout(() => {
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      }, 3000)
    })
  }
  // loading logos as data uris
  let aciLogo
  let impactLogo
  getDataUri('/assets/img/myadmin_logo.svg', dataUri => {
    aciLogo = dataUri
    getDataUri('/assets/img/impact_logo.svg', dataUri => {
      impactLogo = dataUri
      go()
    })
  })
}