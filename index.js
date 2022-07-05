import 'dotenv/config'
import linebot from 'linebot'
import getData from './getData.js'
import schedule from 'node-schedule'
import mode from './mode.js'
// 儲存最後一次資料用
import mongoose from 'mongoose'
import { usersPush, usersGet } from './controllers/users.js'


// dyno用
import express from 'express'
import wakeUpDyno from './wokeDyno.js' // my module!
import { stringify } from 'querystring'
import fs from 'fs'

mongoose.connect(process.env.DB_URL)

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

// 取得當日資料
let allList = ''
let table = ''
const getAllList = async function () {
  allList = await getData()
  // 建立簡化的陣列供對應地區在哪(哪天區域碼變了，重跑一次就好)
  table = allList.map(it => {
    const place = it.areasName
    const detail = it.areasInfo.map(i => i.area)
    return [place, detail]
  })
}
// 將陣列轉加工過的簡訊 (進來已經確定是有對應地區的)
const getMessage = arr => {
  // 可成功抓單日+顯
  const ar0 = Number(arr[0])
  const ar1 = Number(arr[1])
  const place = allList[ar0]
  const area = place.areasInfo[ar1]
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
  const box = {
    type: 'flex',
    altText: `${areaName}今日${largest >= 80 ? speak[0] : largest >= 60 ? speak[1] : largest === '50' ? speak[2] : largest >= 30 ? speak[3] : speak[4]}`,
    contents: {
      type: 'carousel',
      contents: [test]
    }
  }
  // 多物件會多一層[] 記得用[0]去掉
  return [box]
}



// 開始查找
bot.on('message', async (e) => {
  console.log('get message')
  try {
    // 先確認傳來訊息格式是否正確
    const text = e.message.text
   
    if (text.length < 5) {
      throw new Error('訊息長度錯誤')
    }
    // 傳的地區去table跟對應出陣列的idx
    const placeIdx = table.findIndex(it => it[0] === text.substr(0, 3))
    if (placeIdx < 0) {throw new Error('找不到該縣市(不可簡寫)');}
    const detailIdx = table[placeIdx][1].findIndex(it => it === text.substr(3))
    if (detailIdx < 0) throw new Error('找不到該區域')
    const arr = [placeIdx, detailIdx]
    let msg = getMessage(arr)
    e.reply(msg)
    // 回覆成功再加資料庫 
    await usersPush(e.source.userId, arr)
    console.log('回覆動作結束');
  } catch (err) {
    e.reply(err.toString())
    console.log(err);
  }
})

bot.listen('/', process.env.PORT || 3000, async () => {
  console.log('bot on')
  await getAllList()
  //半夜抓剛好有大清早的資料
  schedule.scheduleJob('48 23 * * *', getAllList)
  // dyno用
})

// 每日自動回覆最後2則訊息
// 志宇說是時區問題? 找到在heroku加env TZ=Asia/Taipei
schedule.scheduleJob('0 6 * * *', async () => {
  const userSetting = await usersGet()
  for (const user in userSetting) {
    let msg = []
    const places = userSetting[user].places
    for(const p in places){
      msg.push(JSON.parse(JSON.stringify(getMessage(places[p])[0])))
    }
    await bot.push(userSetting[user].id, msg)
  }
})

// 自動喚醒避免heroku睡眠，我才能半夜抓剛好整天的資料 (上網找的方法)
const app = express()

app.listen(4001, () => {
  wakeUpDyno('https://linebot--rain.herokuapp.com/') // will start once server starts
})