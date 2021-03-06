// pages/success/success.js
const util = require('../../utils/utils')
const api = require('../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      id: parseInt(options.id)
    })

    this.getAnalysisresult()

  },
  getAnalysisresult: function(){
    let that = this
   util.request(api.getsugarResult, {id: that.data.id}).then(function(res) {
     console.log(res)
     if(res.errno === 0 ){
       that.setData({
         result: res.data
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

  continue: function() {
    wx.switchTab({
      url: '../datarecord/datarecord'
    })
  },

  back: function() {
    wx.switchTab({
      url: '../shouye/shouye'
    })
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