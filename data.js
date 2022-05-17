import axios from 'axios'
import cheerio from 'cheerio'
import template from './template.js'
import fs from 'fs'

const getData = async function (e) {
  try {
    const { data } = await axios.get('https://wdaweb.github.io/')
    const $ = cheerio.load(data)
    const card = $('#general .col-md-3:first-child')
    const t = template
    t.hero.url = 'https://wdaweb.github.io/' + card.find('img').attr('src').slice(2)
    t.body.contents[0].text = card.find('.card-title a').text()
    t.body.contents[1].text = card.find('.card-description').text()
    console.log(t)
    fs.writeFileSync('bug.json', JSON.stringify({
      type: 'flex',
      altText: '共通課程',
      contents: {
        type: 'carousel',
        contents: t
      }
    }, null, 2))
    e.reply(
      [
        {
          type: 'flex',
          altText: '共通課程',
          contents: {
            type: 'carousel',
            contents: [t]
          }
        }
      ],
      [
        {
          type: 'text',
          text: '1'
        }
      ]
    )
  } catch (err) {
    console.log(err)
  }
}

export default { getData }
