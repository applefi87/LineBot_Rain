import b1 from './1.js'
import b2 from './2.js'
import b3 from './3.js'
import body from './basic_body.js'
// import fs from 'fs'

const arrbubble = [b1, b2, b3]
const list = function (arr) {
  const result = arr[2]
  const out = []
  for (const i in result) {
    const sum = result[i].summary
    out.push([change(sum.style, sum.result), result[i].day])
  }
  const b = body
  for (const i in out) {
    if (i < 3) {
      const item = b.body.contents[2].contents[2].contents[i * 2].contents
      // 縣市 
      b.body.contents[0].contents[0].contents[0].text = arr[0]
      // 鄉鎮區
      b.body.contents[0].contents[0].contents[1].text = arr[1]
      item[2].contents = out[i][0]
      const t = out[i][1].slice(5).replace('-', '/')
      item[0].contents[1].text = t
    }
  }

  return b
}
const change = function (style, result) {
  const out = []
  for (const i in style) {
    if (style[i] === '1') {
      out.push(getB([1, result[i * 1 + 1].text]))
    } else if (style[i] === '2' && i === '1') {
      out.push(getB([2, result[2].text]))
    } else if (style[i] === '3' && i === '1') {
      out.push(getB([3, result[2].text]))
    }
  }
  return out
}
const getB = function (result) {
  const out = arrbubble[result[0] - 1]
  out.contents[0].text = result[1]
  return out
}

export default { list }
