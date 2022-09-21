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
            layout: 'horizontal',
            contents: [
              {
                type: 'text',
                text: '台北市',
                size: 'xxl',
                weight: 'bold'
              },
              {
                type: 'text',
                text: '內湖區',
                size: 'xl',
                weight: 'bold',
                gravity: 'bottom'
              }
            ]
          }
        ]
      },
      {
        type: 'separator',
        margin: 'none',
        color: '#000000'
      },
      {
        type: 'box',
        layout: 'horizontal',
        contents: [
          {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'box',
                layout: 'vertical',
                contents: [],
                height: '20%'
              },
              // 圖片區
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'text',
                        text: '上午',
                        size: 'xl',
                        weight: 'bold'
                      },
                    ],
                    height: '33.3%',
                    justifyContent: 'center',
                    borderWidth: '1px',
                    borderColor: '#aaaaaa'
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'text',
                        text: '下午',
                        size: 'xl',
                        weight: 'bold'
                      },
                    ],
                    height: '33.3%',
                    justifyContent: 'center',
                    borderWidth: '1px',
                    borderColor: '#aaaaaa'
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'text',
                        text: '晚上',
                        size: 'xl',
                        weight: 'bold'
                      },
                    ],
                    height: '33.3%',
                    justifyContent: 'center',
                    borderWidth: '1px',
                    borderColor: '#aaaaaa'
                  }
                ],
                paddingAll: 'none',
                margin: 'none',
                height: '80%'
              }
            ],
            width: '20%',
            height: '100%'
          },
          {
            type: 'separator',
            color: '#555555'
          },
          {
            type: 'box',
            layout: 'horizontal',
            contents: [
              // 221版本
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'text',
                        text: '今天',
                        weight: 'bold',
                        size: 'lg'
                      },
                      {
                        type: 'text',
                        text: '05/30'
                      }
                    ],
                    height: '20%',
                    alignItems: 'center'
                  },
                  {
                    type: 'separator',
                    color: '#555555'
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    // b
                    contents: [
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'text',
                            text: '不太下雨',
                            size: 'lg',
                            lineSpacing: '100px',
                            adjustMode: 'shrink-to-fit',
                            align: 'center'
                          }
                        ],
                        height: '33.333%',
                        borderColor: '#dddddd',
                        borderWidth: '1px',
                        justifyContent: 'center',
                        alignItems: 'center'
                      },
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'text',
                            text: '不太下雨',
                            size: 'xxl',
                            align: 'center',
                            wrap: true
                          }
                        ],
                        height: '66.666%',
                        borderWidth: '1px',
                        borderColor: '#dddddd',
                        justifyContent: 'center'
                      }
                    ],
                    paddingAll: 'none',
                    margin: 'none',
                    height: '80%'
                  },
                  {
                    type: 'separator',
                    color: '#555555'
                  }
                ]
              },
              {
                type: 'separator',
                color: '#555555'
              },
              // 112版本
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'text',
                        text: '明天',
                        weight: 'bold',
                        size: 'lg'
                      },
                      {
                        type: 'text',
                        text: '05/30'
                      }
                    ],
                    height: '20%',
                    alignItems: 'center'
                  },
                  {
                    type: 'separator',
                    color: '#555555'
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'text',
                            text: '不太下雨',
                            size: 'xxl',
                            align: 'center',
                            wrap: true
                          }
                        ],
                        height: '66.666%',
                        borderWidth: '1px',
                        borderColor: '#dddddd',
                        justifyContent: 'center'
                      },
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'text',
                            text: '不太下雨',
                            size: 'lg',
                            lineSpacing: '100px',
                            adjustMode: 'shrink-to-fit'
                          }
                        ],
                        height: '33.333%',
                        borderColor: '#dddddd',
                        borderWidth: '1px',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }
                    ],
                    paddingAll: 'none',
                    margin: 'none',
                    height: '80%'
                  }
                ],
                height: '100%'
              },
              {
                type: 'separator',
                color: '#555555'
              },
              // 333版本
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'text',
                        text: '後天',
                        weight: 'bold',
                        size: 'lg'
                      },
                      {
                        type: 'text',
                        text: '05/30'
                      }
                    ],
                    height: '20%',
                    alignItems: 'center'
                  },
                  {
                    type: 'separator',
                    color: '#555555'
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'text',
                            text: '不太下雨',
                            size: '35px',
                            align: 'center',
                            wrap: true
                          }
                        ],
                        height: '100%',
                        borderWidth: '1px',
                        borderColor: '#dddddd',
                        justifyContent: 'center'
                      }
                    ],
                    paddingAll: 'none',
                    margin: 'none',
                    height: '80%'
                  }
                ],
                height: '100%'
              }
            ],
            height: '100%'
          }
        ],
        height: '250px',
        borderWidth: '1px',
        borderColor: '#00000000'
      }
    ],
    spacing: 'sm',
    paddingAll: '13px'
  }
}
