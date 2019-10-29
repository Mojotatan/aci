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

    doc.font('Helvetica-Bold').text('Original term:', margin + 15, 244)
    doc.rect(margin + 15, 258, quarterCol - 30, 20).fillAndStroke('#f1f4f8', '#f1f4f8').fillColor('#000000')
    doc.font('Helvetica').text('insert', margin + 25, 263)

    doc.font('Helvetica-Bold').text('Remaining Unbilled Payments:', margin + 15, 290, {width: quarterCol - 30})
    doc.rect(margin + 15, 318, quarterCol - 30, 20).fillAndStroke('#f1f4f8', '#f1f4f8').fillColor('#000000')
    doc.font('Helvetica').text('insert', margin + 25, 323)

    doc.font('Helvetica-Bold').text('Payment Amount:', margin + 15, 350)
    doc.font('Helvetica').text('(pre-tax)', margin + 15, 364)
    doc.rect(margin + 15, 378, quarterCol - 30, 20).fillAndStroke('#f1f4f8', '#f1f4f8').fillColor('#000000')
    doc.text('insert', margin + 25, 383)

    doc.font('Helvetica-Bold').text('Quote Good Through:', margin + 15, 410)
    doc.rect(margin + 15, 424, quarterCol - 30, 20).fillAndStroke('#f1f4f8', '#f1f4f8').fillColor('#000000')
    doc.font('Helvetica').text('insert', margin + 25, 429)

    doc.font('Helvetica-Bold').text('Buyout to Keep:', margin + 15, 456)
    doc.rect(margin + 15, 470, quarterCol - 30, 20).fillAndStroke('#f1f4f8', '#f1f4f8').fillColor('#000000')
    doc.font('Helvetica').text('insert', margin + 25, 475)

    doc.font('Helvetica-Bold').text('Buyout to Return:', margin + 15, 502)
    doc.rect(margin + 15, 516, quarterCol - 30, 20).fillAndStroke('#f1f4f8', '#f1f4f8').fillColor('#000000')
    doc.font('Helvetica').text('insert', margin + 25, 521)

    doc.font('Helvetica-Bold').text('Upgrade to Keep:', margin + 15, 548)
    doc.rect(margin + 15, 562, quarterCol - 30, 20).fillAndStroke('#f1f4f8', '#f1f4f8').fillColor('#000000')
    doc.font('Helvetica').text('insert', margin + 25, 567)

    doc.font('Helvetica-Bold').text('Upgrade to Return:', margin + 15, 594)
    doc.rect(margin + 15, 608, quarterCol - 30, 20).fillAndStroke('#f1f4f8', '#f1f4f8').fillColor('#000000')
    doc.font('Helvetica').text('insert', margin + 25, 613)


    // gear box
    doc.rect(margin + quarterCol, 232, halfCol + quarterCol, 411).stroke('#ced0da')
    doc.font('Helvetica-Bold')
    doc.text('Gear:', margin + quarterCol + 15, 244)
    doc.text('Serial Number', margin + quarterCol + 142, 244)
    doc.text('Plan', margin + quarterCol + 248, 244)
    doc.text('Included in', margin + quarterCol + 301, 244)

    doc.rect(margin + quarterCol + 15, 258, halfCol + quarterCol - 30, 20).fillAndStroke('#f1f4f8', '#f1f4f8').fillColor('#000000')

    doc.rect(margin + quarterCol + 15, 298, halfCol + quarterCol - 30, 20).fillAndStroke('#f1f4f8', '#f1f4f8').fillColor('#000000')
    doc.rect(margin + quarterCol + 15, 338, halfCol + quarterCol - 30, 20).fillAndStroke('#f1f4f8', '#f1f4f8').fillColor('#000000')
    doc.rect(margin + quarterCol + 15, 378, halfCol + quarterCol - 30, 20).fillAndStroke('#f1f4f8', '#f1f4f8').fillColor('#000000')
    // doc.rect(margin + quarterCol + 15, 418, halfCol + quarterCol - 30, 20).fillAndStroke('#f1f4f8', '#f1f4f8').fillColor('#000000')


    // invoice box
    doc.moveTo(margin + quarterCol, 432).lineTo(margin + docInnerWidth, 432).stroke('#ced0da')
    doc.font('Helvetica-Bold')
    doc.text('Current Invoice Breakdown:', margin + quarterCol + 15, 444)
    doc.text('Upfront', margin + quarterCol + 15 + 242, 444)
    doc.text('Monthly', margin + quarterCol + 15 + 314, 444)

    doc.text('Payment', margin + quarterCol + 15 + 170, 460)
    doc.text('Tax', margin + quarterCol + 15 + 242, 460)
    doc.text('Tax', margin + quarterCol + 15 + 314, 460)

    doc.font('Helvetica')
    
    doc.rect(margin + quarterCol + 15, 474, halfCol + quarterCol - 30, 20).fillAndStroke('#f1f4f8', '#f1f4f8').fillColor('#000000')
    doc.text('Equipment Payment:', margin + quarterCol + 25, 479)

    doc.text('Service/MA Payment:', margin + quarterCol + 25, 499)

    doc.rect(margin + quarterCol + 15, 514, halfCol + quarterCol - 30, 20).fillAndStroke('#f1f4f8', '#f1f4f8').fillColor('#000000')
    doc.text('Fuel/Freight:', margin + quarterCol + 25, 519)

    doc.text('Late Charges:', margin + quarterCol + 25, 539)

    doc.rect(margin + quarterCol + 15, 554, halfCol + quarterCol - 30, 20).fillAndStroke('#f1f4f8', '#f1f4f8').fillColor('#000000')
    doc.text('Misc. Items (see Notes):', margin + quarterCol + 25, 559)

    doc.moveTo(margin + quarterCol + 15, 583).lineTo(margin + docInnerWidth - 15, 583).stroke('#000000')
    doc.text('(to9tal)', margin + quarterCol + 15 + 170, 594)

    doc.rect(docWidth - margin - 15 - 160, 613, 80, 20).fillAndStroke('#edf5fd', '#ced0da').fillColor('#000000')
    doc.moveTo(docWidth - margin - 15 - 80, 613).lineTo(docWidth - margin - 15, 613).lineTo(docWidth - margin - 15, 633).lineTo(docWidth - margin - 15 - 80, 633).stroke('#ced0da')
    doc.font('Helvetica-Bold').text('TOTAL:', docWidth - margin - 15 - 160 + 10, 618)
    doc.font('Helvetica').text('$423.54', docWidth - margin - 15 - 10 - doc.widthOfString('$423.54'), 618)


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