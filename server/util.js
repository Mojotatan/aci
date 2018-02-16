// get current date and return as 'YYYY-MM-DD'
const getDate = () => {
  let now = new Date()
  let obj = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate()
  }
  if (obj.month.toString().length === 1) obj.month = `0${obj.month}`
  if (obj.day.toString().length === 1) obj.day = `0${obj.day}`
  return `${obj.year}-${obj.month}-${obj.day}`
}

// take a date string and make sure it ends up as 'YYYY-MM-DD'
const forceDate = (dat) => {
  if (!dat) return (dat === '') ? null : dat // Handle blank date
  let arr = dat.split('-')
  if (arr.length === 1) arr = dat.split('/') // Checking for slashes
  if (arr[0].length === 4) { // Checking for YYYY
    if (arr[1].length === 1) arr[1] = '0' + arr[1] // Checking for missing 0 in front of month or day
    if (arr[2].length === 1) arr[2] = '0' + arr[2]
    return arr.join('-')
  } else if (dat.length <= 8) { // Assuming a string of ≤8 length is in the form of 'MM-DD-YY'
    if (arr[0].length === 1) arr[0] = '0' + arr[0] // Checking for missing 0 in front of month or day
    if (arr[1].length === 1) arr[1] = '0' + arr[1]
    return `20${arr[2]}-${arr[0]}-${arr[1]}`
  } else return dat
}

module.exports = {
  getDate,
  forceDate
}