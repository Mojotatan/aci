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
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  let obj = {
    year: now.getFullYear(),
    month: months[now.getMonth()],
    date: now.getDate(),
    day: days[now.getDay()]
  }
  return `${obj.day}, ${obj.month} ${obj.date}, ${obj.year}`
}

export const reformatDate = date => {
  if (!date) return ''
  // expecting date in form of 'YYYY-MM-DD'
  else if (date.length !== 10) return date // prevent repeated reformattings
  let dateArr = date.split('-')
  return `${dateArr[1]}/${dateArr[2]}/${dateArr[0].slice(2)}` // returns 'MM/DD/YY'
}

export const deformatDate = date => {
  if (!date) return ''
  // expecting date in form of 'MM-DD-YY'
  let dateArr = date.split('-')
  return `20${dateArr[2]}-${dateArr[0]}-${dateArr[1]}` // returns 'YYYY-MM-DD
}

export const getPrettyNumber = (num, prefix) => {
  if (!num && num != 0) return num
  let str = String(num)
  let arr = str.split('.')
  arr[0] = arr[0].split('')
  arr[0] = arr[0].map((char, index) => {
    return (index !== arr[0].length - 1 && (arr[0].length - index) % 3 === 1) ? char + ',' : char
  }).join('')
  return (prefix) ? prefix + arr.join('.') : arr.join('.')
}

export const checkFor$ = num => {
  if (typeof num === 'string') {
    let str = num.split('')
    str = str.filter(char => {
      return char !== '$' && char !== ','
    }).join('')
    return Number(str)
  }
  else return num
}

export const sortBy = field => {
  return (a, b) => {
    // handle cases where a field is empty
    if (!match(field, a) && !match(field, b)) return a.id - b.id
    if (!match(field, b)) return -1
    if (!match(field, a)) return 1

    // sort based on field array
    if (handleCase(match(field, a)) > handleCase(match(field, b))) return 1
    if (handleCase(match(field, a)) < handleCase(match(field, b))) return -1

    // tiebreaker
    return a.id - b.id

    return 0
  }
}

const handleCase = variable => {
  return (typeof variable === 'string') ? variable.toLowerCase() : variable
}

export const match = (arr, obj) => {
  if (!obj) return ''
  else if (arr.length === 1) return obj[arr[0]]
  else return match(arr.slice(1), obj[arr[0]])
}

export const cleanHeader = key => {
  let clean = key
  clean = clean[0].toUpperCase() + clean.slice(1)
  if (clean.slice(-4) === 'Name' && clean.length > 4) clean = clean.slice(0, -4) + ' ' + clean.slice(-4)
  return clean
}


// Password must consist of at least 8 characters with at least 1 letter and 1 number

export const pwCheck = (pw) => {
  if (typeof pw !== 'string') return false 
  if (pw.length < 8) return false
  let checkChars = {letters: 0, numbers: 0}
  let notAllowed = ['@$\.,/']
  pw.split('').forEach(char => {
    if (notAllowed.includes(char)) return false
    else if (Number(char) || Number(char) === 0) checkChars.numbers++
    else checkChars.letters++
  })
  if (checkChars.letters > 0 && checkChars.numbers > 0) return true
  else return false
}


// export const detectRequired = reqs => {
//   // takes array of required properties

// }