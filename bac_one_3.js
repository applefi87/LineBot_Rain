export default {
  type: 'bubble',
  size: 'giga',
  body: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'box',
        layout: 'horizontal',
        contents: [
          {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: '台北市',
                size: 'lg',
                weight: 'bold'
              },
              {
                type: 'text',
                text: '內湖區',
                size: 'md'
              }
            ]
          },
          {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: '今天'
              },
              {
                type: 'text',
                text: '05/30'
              }
            ],
            paddingStart: '20px'
          }
        ]
      },
      {
        type: 'separator'
      },
      {
        type: 'box',
        layout: 'horizontal',
        contents: [
          {
            type: 'image',
            url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png'
          },
          {
            type: 'image',
            url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png'
          },
          {
            type: 'image',
            url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png'
          }
        ]
      },
      {
        type: 'separator'
      },
      {
        type: 'box',
        layout: 'horizontal',
        contents: [
          {
            type: 'box',
            layout: 'vertical',
            contents: [],
            height: '50px',
            width: '33.333%'
          },
          {
            type: 'box',
            layout: 'vertical',
            contents: [],
            height: '50px',
            width: '66.666%',
            backgroundColor: '#000000'
          }
        ]
      }
    ],
    spacing: 'sm',
    paddingAll: '8px'
  }
}
