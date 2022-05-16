import axios from 'axios'
import cheerio from 'cheerio'

const getData = async function (e) {
  try {
    console.log('11')
    const { data } = await axios.get('https://wdaweb.github.io/')
    const $ = cheerio.load(data)
    console.log($('#general .col-md-3:first-child .card-description').text)
    e.reply([
      {
        type: 'text',
        text: 'Hello, user'
      },
      {
        type: 'text',
        text: 'May I help you?'
      }
    ]
    )
  } catch (err) {
    console.log(err)
  }
}

export default getData
