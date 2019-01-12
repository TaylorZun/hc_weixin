// pages/recordVoice/xuetang/xuetang.js
//获取应用实例
const app = getApp()
const util = require('../../../utils/utils.js')
const api = require('../../../config/api.js')

const recorderManager = wx.getRecorderManager()
// recorderManager.onStart(() => {
//   console.log('record start')
// })
// recorderManager.onResume(() =>{
//   console.log('recorder resume')
// })
// recorderManager.onPause(() =>{
//   console.log('recorder paused')
// })
// recorderManager.onStop((res) => {
//   console.log('record stop')
//   const { tempFilePath } = res
// })
// recorderManager.onFrameRecorded((res) => {
//   const { frameBuffer } = res
//   console.log('framebuffer.byteLength', frameBuffer.byteLength)
// })



const innerAudioContext = wx.createInnerAudioContext()
var tempPath = "";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: '',   //语音识别结果
    recording: false   //是否正在录音
  },

  startRecord(e){
    this.setData({ recording: true })

    recorderManager.start({
      sampleRate: 16000, //采样率
      numberOfChannels: 1,//指定录音通道数
     // encodeBitRate: 96000 ,//编码码率
      format: 'mp3',
      frameSize: 50
    })
  },

  // stopRecord(e) {
  //   let that = this
  //   that.setData({ recording: false })
  //   recorderManager.stop()
  //   recorderManager.onStop((res) => {
  //     const { tempFilePath } = res
  //     wx.uploadFile({
  //       url: api.SugarAsr,
  //       filePath: tempFilePath,
  //       name: 'file',
  //       success(res){
  //         let data = typeof res.data === 'string'?JSON.parse(res.data):res.data
  //         if(data.ret == 0) {
  //           that.setData({
  //             result:data.data.data[0]
  //           })
  //         } else {
  //           that.setData({
  //             result: '我不知道你在说什么'
  //           })
  //         }
  //       },
  //       fail(err) {
  //         console.log(err)
  //       }
  //     })
  //   })

  // },

  stopRecord(e){
    let that = this
    that.setData({ recording: false })
    recorderManager.stop()
    wx.navigateTo({
      url: '../../voiceResult/voiceResult'
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