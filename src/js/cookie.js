export function getCookie (name) {
  var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2])
  } else {
    return null
  }
}

export function setCookie (name, value, time) {
  var d = new Date()
  d.setTime(time * 1000)
  var expires = 'expires=' + d.toGMTString()
  document.cookie = name + '=' + escape(value) + '; ' + expires
}
