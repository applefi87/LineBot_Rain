import 'dotenv/config'
import linebot from 'linebot'
import data from './data.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', (e) => {
  console.log(1111)
  data.getData(e)
})
bot.listen('/', process.env.PORT || 3000, () => {
  console.log('bot on')
})
