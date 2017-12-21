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

export const sortBy = field => {
  return (a, b) => {
    if (match(field, a) > match(field, b)) return 1
    if (match(field, a) < match(field, b)) return -1
    return 0
  }
}

export const match = (arr, obj) => {
  if (!obj) return ''
  else if (arr.length === 1) return obj[arr[0]]
  else return match(arr.slice(1), obj[arr[0]])
}
