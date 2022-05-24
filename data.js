
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
    // 多縣市
    const hugeList = []
    for (let i = 1; i <= 85; i += 20) {
      let place = ''
      for (let n = i; n < 20 + i; n += 4) {
        if (n <= 85) {
          const two = n > 9 ? n : 0 + n.toString()
          place += `F-D0047-0${two},`
        }
      }
      place = place.slice(0, place.length - 1)
      // 輸出錯誤*******************************************************************************************************
      const link = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=${key}&locationId=${place}&elementName=WeatherDescription`
      const { data } = await axios.get(link)
      hugeList.push(data)
    }
    // 抓取縣市名
    // const bigArea = data.records.locations[0].locationsName
    // 將鄉鎮資料取陣列
    // fs.writeFileSync('hugeList.json', JSON.stringify(hugeList))
    // 下方area引用功能
    //  funmction:將時間擷取優化
    const listArrange = function (arr) {
      const out = arr.map(t => {
        const time = t.startTime
        const valueOrigin = t.elementValue[0].value.replace(/降雨機率\s-*/, '').replace(/溫度攝氏/, '').replace(/度/, '').replace(/%/, '')
        let value = valueOrigin.split('。')
        value = value.filter(n => { return n !== '' })
        return { time, value }
      })
      return out
    }
    //  funmction:拆分成天的資料
    const weatherToDay = function (arr) {
      const dayWeather = [{ day: '', summary: [], detail: [] }, { day: '', summary: [], detail: [] }, { day: '', summary: [], detail: [] }, { day: '', summary: [], detail: [] }]
      for (const t in arr) {
        for (const d in dayWeather) {
          if (dayWeather[d].day !== '') {
            if (dayWeather[d].day === arr[t].time.slice(0, 10)) {
              dayWeather[d].detail.push({ time: arr[t].time.slice(11, 13), value: arr[t].value })
              break
            }
          } else {
            dayWeather[d].day = arr[t].time.slice(0, 10)
            dayWeather[d].detail.push({ time: arr[t].time.slice(11, 13), value: arr[t].value })
            break
          }
        }
      }
      for (const d in dayWeather) {
        dayWeather[d].summary = summaryText(dayWeather[d].detail)
      }
      return dayWeather
    }
    // function 將當每日資料整理成結論
    const summaryText = function (arr) {
      // 整理成凌晨 上午 下午 晚上 的口語預報
      // ***************************目前只挑第二天***************
      const result = []
      for (const t in arr) {
        if (t % 2 === 0) {
          result.push({ time: arr[t].time, value: [arr[t].value[0] + '|' + arr[t * 1 + 1].value[0], arr[t].value[1]] })
        }
      }
      // 依照降雨機率分類
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
        if (t !== '00') {
          if (result[i].value[1] >= 70) {
            resultChance[0].push({ time: text, value: result[i].value })
          } else if (result[i].value[1] >= 40) {
            resultChance[1].push({ time: text, value: result[i].value })
          }
        }
      }
      // 人性化回報
      // 陣列內最大~最小值
      const maxToMin = function (arr) {
        let max = ''
        let min = ''
        for (const i in arr) {
          if (max < arr[i].value[1] | max === '') {
            max = arr[i].value[1]
          }
          if (min > arr[i].value[1] | min === '') {
            min = arr[i].value[1]
          }
        }
        return [min, max]
      }
      // 高降雨機率
      const reply = [{ text: '', chance: '' }, { text: '', chance: '' }]
      switch (resultChance[0].length) {
        case 3: {
          const chanceHigh = maxToMin(resultChance[0])
          reply[0].text = '全日有雨'
          reply[0].chance = chanceHigh[0] === chanceHigh[1] ? `機率${chanceHigh[0]}%` : `機率${chanceHigh[0]}~${chanceHigh[1]}%`
          break
        }
        case 2: {
          reply[0].text = `${resultChance[0][0].time}、${resultChance[0][1].time}有雨`
          reply[0].chance = resultChance[0][0].value[1] === resultChance[0][1].value[1] ? `機率${resultChance[0][0].value[1]}%` : `機率${resultChance[0][0].value[1]}、${resultChance[0][1].value[1]}%`
          break
        }
        case 1: {
          reply[0].text = `${resultChance[0][0].time}有雨`
          reply[0].chance = `機率${resultChance[0][0].value[1]}%`
          break
        }
      }
      // 可能降雨
      switch (resultChance[1].length) {
        case 3: {
          const chanceHigh = maxToMin(resultChance[1])
          reply[1].text = '全日可能下雨'
          reply[1].chance = chanceHigh[0] === chanceHigh[1] ? `機率${chanceHigh[0]}%` : `機率${chanceHigh[0]}~${chanceHigh[1]}%`
          break
        }
        case 2: {
          reply[1].text = `${resultChance[1][0].time}、${resultChance[1][1].time}可能下雨`
          reply[1].chance =  resultChance[1][0].value[1] === resultChance[1][1].value[1] ? `機率${resultChance[1][0].value[1]}%` : `機率${resultChance[1][0].value[1]}、${resultChance[1][1].value[1]}%`
          break
        }
        case 1: {
          reply[1].text = `${resultChance[1][0].time}可能下雨`
          reply[1].chance = `機率${resultChance[1][0].value[1]}%`
          break
        }
      }
      return reply
    }

    // ---抓取各縣市
    const areaList = []
    for (const m in hugeList) {
      const areasOrigin = hugeList[m].records.locations
      for (const t in areasOrigin) {
        const areasName = areasOrigin[t].locationsName
        const areasInfo = areasOrigin[t].location.map(ar => {
          // 只取出關鍵的鄉鎮名
          const area = ar.locationName
          // 取出時間天氣表(唯一有效資料)
          const timeWeathersOrigin = ar.weatherElement[0].time
          // 上方2function
          const timeWeathers = listArrange(timeWeathersOrigin)
          const dayWeather = weatherToDay(timeWeathers)
          return { area, dayWeather }
        })
        areaList.push({ areasName, areasInfo })
      }
    }
    fs.writeFileSync('areaList.json', JSON.stringify(areaList))

    // 改村改第二個



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
