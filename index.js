import 'dotenv/config'
import linebot from 'linebot'
import dat from './data.js'
import schedule from 'node-schedule'
import mode from './mode.js'

// dyno用
import express from 'express'
import wakeUpDyno from './wokeDyno.js' // my module!

// import testallList from './areaList.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})
const botBroadcast = function (place = 'here:', err) {
  bot.broadcast({
    type: 'text',
    text: place + err
  })
}

// 取得當日資料
let allList = ''
const getAllList = async function () {
  allList = await dat.getData(botBroadcast)
}
// 寄出加工過的簡訊
const getMessage = function (arr) {
  // 可成功抓單日+顯
  try {
    const place = allList[arr[0]]
    // fs.writeFileSync('test.json', JSON.stringify(place))
    const dayinfo = place.areasInfo[arr[1]].dayWeather
    const area = place.areasInfo[arr[1]].area
    const test = mode.list([place.areasName, area, dayinfo])

    const daydetail = place.areasInfo[arr[1]].dayWeather[0].summary.result
    const largest = 0
    const speak = ['下雨', '易下雨', '一半機率下雨', '不易下雨', '不下雨']
    // console.log(daydetail)
    // for (const i in daydetail) {
    //   if (daydetail[i].value[1] > largest) {
    //     daydetail[i].value[1] = largest
    //   }
    // }

    const box = [{
      type: 'flex',
      altText: `${area}今日${largest >= 80 ? speak[0] : largest >= 60 ? speak[1] : largest === '50' ? speak[2] : largest >= 30 ? speak[3] : speak[4]}`,
      contents: {
        type: 'carousel',
        contents: [test]
      }
    }]
    return box
  } catch (err) {
    console.log(err)
    return err
  }
}
// 輸入地區區碼
const c1 = [18, 11]
const c2 = [17, 5]
bot.on('message', (e) => {
  console.log('get message')
  if (e.message.text === '1') {
    e.reply(getMessage(c1))
    console.log('get 1')
  } else {
    e.reply(getMessage(c2))
    console.log('get 2')
  }
})

bot.listen('/', process.env.PORT || 3000, async () => {
  console.log('bot on new')
  await getAllList()
  bot.broadcast(getMessage(c1))
  schedule.scheduleJob('48 23 * * *', getAllList)
  schedule.scheduleJob('0 6 * * *', function () {
    bot.broadcast(getMessage(c1))
    bot.broadcast(getMessage(c2))
  })
  // dyno用
  express().listen(3001, () => {
    wakeUpDyno('https://linebot--rain.herokuapp.com/', botBroadcast) // will start once server starts
  })
})
