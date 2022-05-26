import 'dotenv/config'
import linebot from 'linebot'
// import dat from './data.js'
import dat from './test.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', (e) => {
  dat.getData(e)
})
bot.listen('/', process.env.PORT || 3000, () => {
  console.log('bot on')
})
