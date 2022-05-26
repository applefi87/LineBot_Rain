import ar from './js.js'

const getData = function (e) {
  const o = ['', '']
  for (const i in ar) {
    if (i > 1) {
      o[i - 2] = ar[i].text === ar[i * 1 - 1].text ? 2 : 1
    }
  }
  // 怪怪的
  console.log(o)
  const a = o === ['2', '2'] ? '333' : o === ['2', '1'] ? '221' : o === ['1', '2'] ? '122' : o === ['1', '1'] ? '111' : 'err'
  console.log(a)
  return 1
}

export default { getData }
