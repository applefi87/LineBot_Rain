export default {
  type: 'bubble',
  size: 'micro',
  body: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: '台北市-內湖區',
        color: '#000000',
        size: 'lg',
        weight: 'bold'
      },
      {
        type: 'separator',
        margin: 'sm'
      },
      {
        type: 'text',
        text: '2022/10/05',
        wrap: true,
        color: '#000000',
        size: 'md',
        flex: 5,
        weight: 'bold',
        align: 'center'
      },
      {
        type: 'separator'
      },
      {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'box',
            layout: 'vertical',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: '上午、下午有雨',
                wrap: true,
                color: '#000000',
                size: 'md',
                flex: 5
              }, {
                type: 'text',
                text: '機率70%',
                wrap: true,
                color: '#8c8c8c',
                size: 'sm',
                flex: 5
              }
            ]
          },
          {
            type: 'separator',
            margin: 'sm'
          }, {
            type: 'box',
            layout: 'vertical',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: '晚上不下雨',
                wrap: true,
                color: '#000000',
                size: 'md',
                flex: 5
              }, {
                type: 'text',
                text: '下雨機率20%',
                wrap: true,
                color: '#8c8c8c',
                size: 'sm',
                flex: 5
              }
            ]
          }
        ]
      }
    ],
    spacing: 'lg',
    paddingAll: '13px'
  }
}
