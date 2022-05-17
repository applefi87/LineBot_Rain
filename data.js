import axios from 'axios'
import cheerio from 'cheerio'
import template from './template.js'
// import fs from 'fs'

const getData = async function (e) {
  try {
    const { data } = await axios.get('https://wdaweb.github.io/')
    const $ = cheerio.load(data)
    const card = $('#general .col-md-3:first-child')
    const t = template
    t.hero.url = 'https://wdaweb.github.io/' + card.find('img').attr('src').slice(2)
    t.body.contents[0].text = card.find('.card-title a').text()
    t.body.contents[1].text = card.find('.card-description').text()

    const t2 = JSON.parse(JSON.stringify(t))
    t2.body.contents[0].text = 't2'
    e.reply(
      [{
        type: 'flex',
        altText: '共通課程',
        contents: {
          type: 'carousel',
          contents: [t, t, t, t, t, t, t, t, t, t, t, t]
        }
      }, {
        type: 'flex',
        altText: '共通課程',
        contents: {
          type: 'carousel',
          contents: [t2, t2, t2, t2, t2, t2, t2, t2, t2, t2, t2, t2]
        }
      }, {
        type: 'flex',
        altText: '共通課程',
        contents: {
          type: 'carousel',
          contents: [t, t, t, t, t, t, t, t, t, t, t, t]
        }
      }, {
        type: 'template',
        altText: 'this is a image carousel template',
        template: {
          type: 'image_carousel',
          columns: [
            {
              imageUrl: 'https://picsum.photos/100/100',
              title: 'title',
              text: 'test',
              action: {
                type: 'postback',
                label: 'Buy',
                data: 'action=buy&itemid=111'
              }
            },
            {
              imageUrl: 'https://picsum.photos/100/200',
              action: {
                type: 'message',
                label: 'Yes',
                text: 'yes'
              }
            },
            {
              imageUrl: 'https://picsum.photos/100/100',
              action: {
                type: 'uri',
                label: 'View detail',
                uri: 'http://example.com/page/222'
              }
            }
          ]
        }
      }, {
        type: 'text',
        text: '結尾'
      }]

    )
  } catch (err) {
    console.log(err)
  }
}

export default { getData }
