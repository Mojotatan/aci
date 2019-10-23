export const getPdf = val => {
  let doc = new PDFDocument({autoFirstPage: false})
  let stream = doc.pipe(blobStream())
  doc.addPage({
    margin: 15
  })
  doc.text('ahoy there')
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