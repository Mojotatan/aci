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

export const getUglyDate = () => {
  let now = new Date()
  let obj = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate()
  }
  if (obj.month.toString().length === 1) obj.month = `0${obj.month}`
  if (obj.day.toString().length === 1) obj.day = `0${obj.day}`
  return `${obj.month}-${obj.day}-${obj.year}`
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

export const sortBy = (field, reverse) => {
  let reverseConstant = reverse ? -1 : 1
  return (a, b) => {
    // handle cases where a field is empty
    if (!match(field, a) && !match(field, b)) return (a.id - b.id) * reverseConstant
    if (!match(field, b)) return -1 * reverseConstant
    if (!match(field, a)) return 1 * reverseConstant

    // sort based on field array
    if (handleCase(match(field, a)) > handleCase(match(field, b))) return 1 * reverseConstant
    if (handleCase(match(field, a)) < handleCase(match(field, b))) return -1 * reverseConstant

    // tiebreaker
    return (a.id - b.id) * reverseConstant
  }
}
// sortBy but for Users so we can sort inactive users to bottom
export const sortByUsers = (field, reverse) => {
  let reverseConstant = reverse ? -1 : 1
  return (a, b) => {
    // inactive users
    if (field[0] !== 'active') {
      if (match(['active'], a) === 'Inactive' && match(['active'], b) === 'Inactive') return (a.id - b.id)
      if (match(['active'], b) === 'Inactive') return -1
      if (match(['active'], a) === 'Inactive') return 1
    }
    
    // handle cases where a field is empty
    if (!match(field, a) && !match(field, b)) return (a.id - b.id) * reverseConstant
    if (!match(field, b)) return -1 * reverseConstant
    if (!match(field, a)) return 1 * reverseConstant

    // sort based on field array
    if (handleCase(match(field, a)) > handleCase(match(field, b))) return 1 * reverseConstant
    if (handleCase(match(field, a)) < handleCase(match(field, b))) return -1 * reverseConstant

    // tiebreaker
    return (a.id - b.id) * reverseConstant
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

// check if two one-dimensional arrays are equal
export const areArraysEqual = (a, b) => {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}

export const cleanHeader = key => {
  let clean = key
  clean = clean.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
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


// Functions for Buyout Calculations
export const sum = (...targs) => {
  let val = 0
  targs.forEach(n => val += checkFor$(n) || 0)
  return monify(val)
}

export const product = (...targs) => {
  let val = 0
  targs.forEach((n, index) => {
    if (index === 0) val = checkFor$(n) || 0
    else val *= checkFor$(n) || 0
  })
  return String(val)
}

export const round = n => {
  return monify(Math.round(checkFor$(n) * 100) / 100)
}

export const monify = (n, fallback) => {
  if (!n && fallback) return fallback
  let str = String(n)
  let arr = str.split('.')
  arr[0] = arr[0].split('')
  arr[0] = arr[0].map((char, index) => {
    return (index !== arr[0].length - 1 && (arr[0].length - index) % 3 === 1) ? char + ',' : char
  }).join('')
  if (arr.length === 1) arr.push('00')
  else if (arr[1].length === 1) arr[1] += '0'
  else if (arr[1].length === 0) arr[1] = '00'
  return arr.join('.')
}

// more powerful version of checkFor$
export const isThisEquivalentToANumber = str => {
  if (typeof str !== 'string') return false
  let digitValues = {
    0: true, 1: true, 2: true, 3: true, 4: true,
    5: true, 6: true, 7: true, 8: true, 9: true
  }
  let digits = str.split('').filter(char => {
    return digitValues[char]
  })
  return (digits.length > 0) ? true : false
}