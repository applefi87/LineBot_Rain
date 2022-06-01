import b1 from './1.js'
import b2 from './2.js'
import b3 from './3.js'
import body from './basic_body.js'

const arrbubble = [b1, b2, b3]
const list = function (arr) {
  try {
    const result = arr[2]
    const out = []
    for (const i in result) {
      const sum = result[i].summary
      const ch = change(sum.style, sum.result, i)
      out.push([ch, result[i].day])
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
  } catch (e) {
    console.log(e)
  }
}
// 將每日的資料過程幾格(交給下方配json)
const change = function (style, result, n) {
  const out = []
  for (const i in style) {
    if (style[i] === '1') {
      const x = JSON.parse(JSON.stringify(getB([1, result[i * 1 + 1].text])))
      out.push(x)
    } else if (style[i] === '2' && i === '1') {
      const y = JSON.parse(JSON.stringify(getB([2, result[2].text])))
      out.push(y)
    } else if (style[i] === '3' && i === '1') {
      const z = JSON.parse(JSON.stringify(getB([3, result[2].text])))
      out.push(z)
    }
  }
  return out
}
// 將資料加進對應的bubble並回傳
const getB = function (inarr) {
  const out = arrbubble[inarr[0] - 1]
  out.contents[0].text = inarr[1]
  return out
}

export default { list }
