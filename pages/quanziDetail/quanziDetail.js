// pages/quanziDetail/quanziDetail.js
const util = require('../../utils/utils.js')
const api = require('../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    toastHidden: true,
    modalHidden: true,
    notice_str: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //页面初始化，options为页面跳转带来的参数
    console.log(options)
    var that = this
    that.setData({
      quanziId: parseInt(options.id)
    })
    this.getquanzidetail()
  },

  getquanzidetail: function () {
    let that = this
    util.request(api.quanziDetail, {
      quanziId: that.data.quanziId
    }).then(function (res) {
      console.log(res)
      if (res.errno === 0) {
        that.setData({
          info: res.data
        })
      }
    })
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

  },

  
})