// pages/publishTiezi/publishTiezi.js
const api = require('../../config/api.js')
const util = require('../../utils/utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['其他', '高血糖类', '科学减脂类', '高血脂类', '高血压类'],
    index:1,
  },

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

  formSubmit: function (e) {
    let that = this
    console.log(e.detail.value)
    let title = e.detail.value.title
    let content = e.detail.value.content
    let detail = e.detail.value.detail
    if(title =="") {
      wx.showModal({
        title: '提示',
        content: '请输入帖子标题',
        showCancel:false
      })
      return
    }
    if(content =="") {
      wx.showModal({
        title: '提示',
        content: '请输入帖子简介',
        showCancel:false
      })
      return
    }
    if(detail =="") {
      wx.showModal({
        title: '提示',
        content: '请输入帖子内容',
        showCancel:false
      })
      return
    }
    let formData = e.detail.value
    wx.request({
      url: api.publishTiezi,
      data: formData,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
       // console.log(res.data)
        // that.modalTap()
      }
    })

    
    wx.navigateTo({
      url: '../publishSuccess/publishSuccess'
    })
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