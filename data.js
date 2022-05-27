
import axios from 'axios'
import 'dotenv/config'

const key = process.env.WEATHER_KEY
const getData = async function (e) {
  try {
    const areaList = []
    // 用密鑰取出天氣預報綜合描述(涵蓋大多資料，用"。"分隔 )
    // F-D0047-093 是可挑選鄉鎮2天資料+縣市名(最多五個)
    // 多縣市
    const getOrigin = async function () {
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
        const link = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=${key}&locationId=${place}&elementName=WeatherDescription`
        const { data } = await axios.get(link)
        hugeList.push(data)
      }
      return hugeList
    }
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
      const dayWeather = [{ day: '', summary: [], detail: [] }, { day: '', summary: [], detail: [] }, { day: '', summary: [], detail: [] }]
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
      const result = []
      for (const t in arr) {
        if (t % 2 === 0) {
          result.push({ time: arr[t].time, value: [arr[t].value[0] + '|' + arr[t * 1 + 1].value[0], arr[t].value[1]] })
        }
      }
      // 依照降雨機率分類
      const speak = ['下雨', '易下雨', '一半機率下雨', '不易下雨', '不下雨']
      const resultChance = [[], [], [], []]
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
        if (result[i].value[1] >= 80) {
          resultChance[i] = { time: text, value: result[i].value, text: speak[0] }
        } else if (result[i].value[1] >= 60) {
          resultChance[i] = { time: text, value: result[i].value, text: speak[1] }
        } else if (result[i].value[1] === 50) {
          resultChance[i] = { time: text, value: result[i].value, text: speak[2] }
        } else if (result[i].value[1] >= 30) {
          resultChance[i] = { time: text, value: result[i].value, text: speak[3] }
        } else if (result[i].value[1] >= 0) {
          resultChance[i] = { time: text, value: result[i].value, text: speak[4] }
        }
      }
      // fs.writeFileSync('resultChance.json', JSON.stringify(resultChance))
      // 以下只是想到的一個算法 配合如何產出line三種尺寸的資料
      const change = function (ar) {
        let o = ''
        for (const i in ar) {
          if (i > 1) {
            o += ar[i].text === ar[i * 1 - 1].text ? 2 : 1
          }
        }
        // 怪怪的
        return o === '22' ? '333' : o === '21' ? '221' : o === '12' ? '122' : o === '11' ? '111' : 'err'
      }
      return { result: resultChance, style: change(resultChance) }
    }
    // ----------抓取各縣市--------
    const i = await getOrigin()
    console.log('exportEveryDayList')
    // fs.writeFileSync('getOrigin.json', JSON.stringify(i))
    for (const m in i) {
      const areasOrigin = i[m].records.locations
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
    return areaList
  } catch (err) {
    console.log(err)
  }
}
export default { getData }
