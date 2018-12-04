// pages/recordHand/xuetang/xuetang.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  /**
   * 日期控件
   * @param {*} e 
   */
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  /**
   * 多项选择控件
   * @param {*} e 
   */
    bindPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        index: e.detail.value
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})