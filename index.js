import 'dotenv/config'
import linebot from 'linebot'
import dat from './data.js'
import schedule from 'node-schedule'
import mode from './mode.js'
import mongoose from 'mongoose'
import { usersPush, usersGet } from './controllers/users.js'

import fs from 'fs'


// dyno用
import express from 'express'
import wakeUpDyno from './wokeDyno.js' // my module!
import { stringify } from 'querystring'

// import testallList from './areaList.js'

mongoose.connect(process.env.DB_URL)

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

// 取得當日資料
let allList = ''
const getAllList = async function () {
  allList = await dat.getData()
}
// 寄出加工過的簡訊
const getMessage = arr => {
  return new Promise((resolve, reject) => {
    // 可成功抓單日+顯
    const ar0 = Number(arr[0])
    const ar1 = Number(arr[1])
    const place = allList[ar0]
    if (!place) {
      reject(new Error('沒有該縣市'))
    }
    const area = place.areasInfo[ar1]
    if (!area) {
      reject(new Error('沒有該區域'))
    }
    const dayinfo = area.dayWeather
    // 已經足夠判斷是否地區正確有抓到
    const areaName = area.area
    const test = mode.list([place.areasName, areaName, dayinfo])
    const daydetail = area.dayWeather[1].summary.result
    let largest = 0
    const speak = ['下雨', '易下雨', '一半機率下雨', '不易下雨', '不下雨']
    for (const i in daydetail) {
      let chance = daydetail[i].value[1]
      if (largest < chance) {
        largest = chance
      }
    }
    const box = [{
      type: 'flex',
      altText: `${areaName}今日${largest >= 80 ? speak[0] : largest >= 60 ? speak[1] : largest === '50' ? speak[2] : largest >= 30 ? speak[3] : speak[4]}`,
      contents: {
        type: 'carousel',
        contents: [test]
      }
    }]
    resolve(box)
  })
}
// 輸入地區區碼
bot.on('message', async (e) => {
  console.log('get message')
  try {
    let arr = e.message.text.split(':')
    if (!arr || arr.length != 2 || isNaN(arr[0]) || isNaN(arr[1])) { throw new Error('not a number') }
    arr = arr.map(i => { return Number(i) })
    // 嘗試抓資料=>回覆
    let msg
    await getMessage(arr).then(res => { msg = res })
    if (!msg) { throw new Error('回覆前審核出錯') }
    e.reply(msg)
    // 回覆成功再加資料庫 
    await usersPush(e.source.userId, arr)
    console.log('回覆動作結束');
  } catch (err) {
    e.reply(stringify(err))
    console.log('以下bot.on錯誤', err)
  }
})

bot.listen('/', process.env.PORT || 3000, async () => {
  console.log('bot on')
  await getAllList()
  //半夜抓剛好有大清早的資料
  schedule.scheduleJob('48 23 * * *', getAllList)
  // schedule.scheduleJob('0 6 * * *', function () {
  //   bot.broadcast(getMessage(c1))
  // })
  // dyno用
  const app = express()
  app.use(express.json())
  app.listen(process.env.PORT || 4000, () => {
    wakeUpDyno('https://linebot--rain.herokuapp.com/') // will start once server starts
  })
})
// **************測試回覆
schedule.scheduleJob('0 7 * * *', async () => {
  const userSetting = await usersGet()
  for (const set in userSetting) {
    let ms
    await getMessage(set.places).then(res => { ms = res })
    await bot.push(set.id, ms)
  }
})
