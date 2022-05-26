import b1 from './1.js'
import b2 from './2.js'
import b3 from './3.js'
import body from './basic_body.js'
// import fs from 'fs'

const arrbubble = [b1, b2, b3]
const list = function (arr) {
  const out = []
  for (const i in arr) {
    const sum = arr[i].summary
    out.push([change(sum.style, sum.result), arr[i].day])
  }
  const b = body
  for (const i in out) {
    if (i < 3) {
      b.body.contents[2].contents[2].contents[i * 2].contents[2].contents = out[i][0]
      b.body.contents[2].contents[2].contents[i * 2].contents[0].contents[1].text = out[i][1]
    }
  }

  return b
}
const change = function (style, result) {
  const out = []
  for (const i in style) {
    console.log(style[i])
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
const getB = function (arr) {
  const out = arrbubble[arr[0] - 1]
  out.contents[0].text = arr[1]
  return out
}

export default { list }
