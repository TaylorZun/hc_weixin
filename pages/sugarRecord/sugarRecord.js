Page({
  data: {
    src: './aa.jpg',
    array: ['空腹', '早餐后', '午餐前', '午餐后', '晚餐前', '晚餐后', '睡前', '凌晨'],
    objectArray: [
      {
        id: 0,
        name: '空腹'
      },
      {
        id: 1,
        name: '早餐后'
      },
      {
        id: 2,
        name: '午餐前'
      },
      {
        id: 3,
        name: '午餐后'
      },
      {
        id: 4,
        name: '晚餐前'
      },
      {
        id: 5,
        name: '晚餐后'
      },
      {
        id: 6,
        name: '睡前'
      },
      {
        id: 7,
        name: '凌晨'
      }
    ],
    index: 0,
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
    bindPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        index: e.detail.value
      })
    }
})