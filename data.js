
import axios from 'axios'
// import { time } from 'console'
// import cheerio from 'cheerio'
// import template from './template.js'
import 'dotenv/config'
import fs from 'fs'
import t from './test_template.js'

const key = process.env.WEATHER_KEY
const getData = async function (e) {
  try {
    // 用密鑰取出天氣預報綜合描述(涵蓋大多資料，用"。"分隔 )
    // F-D0047-093 是可挑選鄉鎮2天資料+縣市名(最多五個)
    // 待處理多縣市
    const { data } = await axios.get(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=${key}&locationId=F-D0047-001&elementName=WeatherDescription`)
    // 抓取縣市名
    const bigArea = data.records.locations[0].locationsName
    // 將鄉鎮資料取陣列
    const areasOrigin = data.records.locations[0].location
    const areas = areasOrigin.map(ar => {
      // 只取出關鍵的鄉鎮名、
      const area = ar.locationName
      const timeWeathersOrigin = ar.weatherElement[0].time
      //  將時間再擷取
      const timeWeathers = timeWeathersOrigin.map(t => {
        const time = t.startTime
        const valueOrigin = t.elementValue[0].value.replace(/降雨機率\s-*/, '').replace(/溫度攝氏/, '').replace(/度/, '').replace(/%/, '')
        let value = valueOrigin.split('。')
        value = value.filter(n => { return n !== '' })
        return { time, value }
      })
      // 拆分成天的資料
      const dayWeather = [{ day: '', detail: [] }, { day: '', detail: [] }, { day: '', detail: [] }, { day: '', detail: [] }]
      for (const t in timeWeathers) {
        for (const d in dayWeather) {
          if (dayWeather[d].day !== '') {
            if (dayWeather[d].day === timeWeathers[t].time.slice(0, 10)) {
              dayWeather[d].detail.push({ time: timeWeathers[t].time.slice(11, 13), value: timeWeathers[t].value })
              break
            }
          } else {
            dayWeather[d].day = timeWeathers[t].time.slice(0, 10)
            dayWeather[d].detail.push({ time: timeWeathers[t].time.slice(11, 13), value: timeWeathers[t].value })
            break
          }
        }
      }
      return { area, dayWeather }
    })
    // 試著整理成凌晨 上午 下午 晚上 的口語預報
    const dayrain = areas[0].dayWeather[2].detail
    const result = []
    for (const t in dayrain) {
      if (t % 2 === 0) {
        console.log(1)
        result.push({ time: dayrain[t].time, value: [dayrain[t].value[0] + '|' + dayrain[t * 1 + 1].value[0], dayrain[t].value[1]] })
      }
    }
    // 依照降雨機率分類好
    const resultChance = [[], [], []]
    for (const i in result) {
      const t = result[i].time
      let text = ''
      if (t === '00') {
        text = '凌晨'
      } else if (t === '06') {
        text = '上午'
      } else if (t === '12') {
        text = '下午'
      } else if (t === '18') {
        text = '晚上'
      }
      if (i > 0) {
        if (result[i].value[1] >= 70) {
          resultChance[0].push({ time: text, value: result[i].value })
        } else if (result[i].value[1] >= 40) {
          resultChance[1].push({ time: text, value: result[i].value })
        }
      }
    }
    // 人性化回報
    for (const i in resultChance) {

    }

    // fs.writeFileSync('test.json', JSON.stringify({ bigArea, areas }))
    fs.writeFileSync('test.json', JSON.stringify(resultChance))

    // const $ = cheerio.load(data)
    // const card = $('#general .col-md-3:first-child')
    // const t = template
    // t.hero.url = 'https://wdaweb.github.io/' + card.find('img').attr('src').slice(2)
    // t.body.contents[0].text = card.find('.card-title a').text()
    // t.body.contents[1].text = card.find('.card-description').text()

    // const t2 = JSON.parse(JSON.stringify(t))
    // t2.body.contents[0].text = 't2'
    e.reply(
      [{
        type: 'flex',
        altText: '共通課程',
        contents: {
          type: 'carousel',
          contents: [t, t, t, t]
        }
      }]
    )
  } catch (err) {
    console.log(err)
  }
}

export default { getData }
