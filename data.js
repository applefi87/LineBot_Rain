import axios from 'axios'
// import cheerio from 'cheerio'
// import template from './template.js'
import 'dotenv/config'
import fs from 'fs'
const key = process.env.WEATHER_KEY

const getData = async function (e) {
  try {
    // 用密鑰取出天氣預報綜合描述(涵蓋大多資料，用"。"分隔 )
    // F-D0047-093 是可挑選鄉鎮2天資料+縣市名(最多五個)
    // 代處理多縣市
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
        const valueOrigin = t.elementValue[0].value
        const value = valueOrigin.split('。')
        return { time, value }
      })
      return { area, timeWeathers }
    })
    fs.writeFileSync('test.json', JSON.stringify({ bigArea, areas }))
    // const $ = cheerio.load(data)
    // const card = $('#general .col-md-3:first-child')
    // const t = template
    // t.hero.url = 'https://wdaweb.github.io/' + card.find('img').attr('src').slice(2)
    // t.body.contents[0].text = card.find('.card-title a').text()
    // t.body.contents[1].text = card.find('.card-description').text()

    // const t2 = JSON.parse(JSON.stringify(t))
    // t2.body.contents[0].text = 't2'
    // e.reply(
    //   [{
    //     type: 'flex',
    //     altText: '共通課程',
    //     contents: {
    //       type: 'carousel',
    //       contents: [t, t, t, t, t, t, t, t, t, t, t, t]
    //     }
    //   }]
    // )
  } catch (err) {
    console.log(err)
  }
}

export default { getData }
