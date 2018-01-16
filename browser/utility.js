export const getDate = () => {
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

export const getPrettyDate = () => {
  let now = new Date()
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  let obj = {
    year: now.getFullYear(),
    month: months[now.getMonth()],
    date: now.getDate(),
    day: days[now.getDay()]
  }
  return `${obj.day}, ${obj.month} ${obj.date}, ${obj.year}`
}

export const sortBy = field => {
  return (a, b) => {
    // handle cases where a field is empty
    if (!match(field, a) && !match(field, b)) return a.id - b.id
    if (!match(field, b)) return -1
    if (!match(field, a)) return 1

    // sort based on field array
    if (match(field, a) > match(field, b)) return 1
    if (match(field, a) < match(field, b)) return -1

    // tiebreaker
    return a.id - b.id

    return 0
  }
}

export const match = (arr, obj) => {
  if (!obj) return ''
  else if (arr.length === 1) return obj[arr[0]]
  else return match(arr.slice(1), obj[arr[0]])
}


// Password must consist of at least 8 characters with at least 1 letter and 1 number

// let pwCheck = (pw) => {
//   if (typeof pw !== 'string') return false 
//   if (length < 8) return false
//   let checkChars = {letters: 0, numbers: 0}
//   let notAllowed = ['@$\.,/']
//   pw.split('').forEach(char => {
//     if (notAllowed.includes(char)) return false
//     else if (Number(char)) checkChars.numbers++
//     else checkChars.letters++
//   })
//   if (checkChars.letters > 0 && checkChars.numbers > 0) return true
//   else return false
// }
