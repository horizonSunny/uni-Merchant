function getDate(strDate) {
  var date = eval(
    'new Date(' +
      strDate
        .replace(/\d+(?=-[^-]+$)/, function(a) {
          return parseInt(a, 10) - 1
        })
        .match(/\d+/g) +
      ')'
  )
  return date
}
//时间戳转化为时间格式
var formatDate = function(date) {
  date = new Date(date)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  var d = date.getDate()
  var h = date.getHours()
  var m1 = date.getMinutes()
  var s = date.getSeconds()
  m = m < 10 ? '0' + m : m
  d = d < 10 ? '0' + d : d
  return y + '-' + m + '-' + d + ' ' + h + ':' + m1 + ':' + s
}
//时间格式转化为时间戳
function timeChangetype(stringTime) {
  var timestamp2 = Date.parse(new Date(stringTime))
  //      timestamp2 = timestamp2;
  return timestamp2
}
export { getDate, timeChangetype, formatDate }
