export function timeStamp(secondTime) {
  var time = parseInt(secondTime) + '秒'
  if (parseInt(secondTime) > 60) {
    var second = parseInt(secondTime) % 60
    var min = parseInt(secondTime / 60)
    time = min + '分' + second + '秒'

    if (min > 60) {
      min = parseInt(secondTime / 60) % 60
      var hour = parseInt(parseInt(secondTime / 60) / 60)
      time = hour + '小时' + min + '分' + second + '秒'

      if (hour > 24) {
        hour = parseInt(parseInt(secondTime / 60) / 60) % 24
        var day = parseInt(parseInt(parseInt(secondTime / 60) / 60) / 24)
        time = day + '天' + hour + '小时' + min + '分' + second + '秒'
      }
    }
  }

  return time
}

export function formatDate(now) {
  let date = new Date(now * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = date.getDate() + ' '
  let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return Y + M + D + h + ':' + m + ':' + s
}

export function cmdFilter(value) {
  if (value === 0) {
    return 'BUY'
  } else if (value === 1) {
    return 'Sell'
  }
}
export function sexFilter(value) {
  if (value === 0) {
    return '保密'
  } else if (value === 1) {
    return '男'
  } else if (value === 2) {
    return '女'
  }
}

export function currencys(x, c) {
  let num = parseFloat(x)
  if (isNaN(num)) {
    return '$0'
  }
  let isMoreThanZero = num < 0
  if (isMoreThanZero) {
    x *= -1
  }
  num = Math.round(x * 100) / 100
  let str = num.toString()
  let strIndex = str.indexOf('.')
  if (strIndex < 0) {
    strIndex = str.length
    str += '.'
  }
  while (str.length <= strIndex + 2) {
    str += '0'
  }
  if (c === undefined || c === '') {
    c = '$'
  }
  if (isMoreThanZero) {
    return '-' + c + str
  } else {
    return c + str
  }
}
export function percent(value, c) {
  let num = parseFloat(value)
  if (isNaN(num)) {
    return '$0'
  }
  let isMoreThanZero = num < 0
  if (isMoreThanZero) {
    value *= -1
  }
  num = Math.round(value * 100) 
  let str = num.toString()
  let strIndex = str.indexOf('.')
  if (strIndex < 0) {
    strIndex = str.length
    str += '.'
  }
  while (str.length <= strIndex + 2) {
    str += '0'
  }
  if (c === undefined || c === '') {
    c = '%'
  }
  if (isMoreThanZero) {
    return '-' + str + c
  } else {
    return str + c
  }
}
