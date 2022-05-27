import 'dotenv/config'
import linebot from 'linebot'
import dat from './data.js'
import schedule from 'node-schedule'
import fs from 'fs'
import mode from './mode.js'
import testallList from './areaList.js'

// import dat from './test.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', (e) => {

})

// 取得當日資料
let allList = ''
const getAllList = async function () {
  allList = await dat.getData()
  // fs.writeFileSync('getOrigin.json', JSON.stringify(o))
}
// 寄出加工過的簡訊
const pushMessage = function (c, t) {
  // 可成功抓單日+顯
  const place = allList[c].areasInfo[t].dayWeather
  const test = mode.list([testallList[c].areasName, testallList[c].areasInfo[t].area, place])
  const box = [{
    type: 'flex',
    altText: '今日下雨機率',
    contents: {
      type: 'carousel',
      contents: [test]
    }
  }]
  // fs.writeFileSync('box.json', JSON.stringify(box))
  bot.broadcast(box)
}
bot.listen('/', process.env.PORT || 3000, async () => {
  console.log('bot on')
  await getAllList()
  // 輸入地區區碼
  // const countryCode = 17
  // const townCode = 5
  const countryCode = 18
  const townCode = 11
  pushMessage(countryCode, townCode)
  schedule.scheduleJob('59 23 * * *', getAllList)
  schedule.scheduleJob('0 6 * * *', function () {
    pushMessage(countryCode, townCode)
  })
})
