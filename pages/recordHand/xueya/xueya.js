// pages/recordHand/xueya/xueya.js
var util = require('../../../utils/utils.js')
var api = require('../../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2018-10-18',
    time: '12:00',
    highpressure: 120,
    lowpressure: 80,
    toastHidden: true,
    modalHidden: true,
    notice_str: '',
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,
  },
 /**
   * 日期控件   
   * @param {*} e 
   */
  changeDateTime1(e) {
    this.setData({
      dateTime1: e.detail.value
    });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1,
      dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = util.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj1 = util.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({

      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime,

    });
  },

   /**
   * 血压增减
   */

   /**
    * 高压增减
    */
  addHypertention: function () {
    let highpressure = util.add(this.data.highpressure, 1)
    // console.log(sugardata)
    let that = this
    that.setData({
      highpressure: highpressure
    })
  },

  delHypertention: function () {
    let highpressure = util.decrease(this.data.highpressure, 1)
    let that = this
    that.setData({
      highpressure: highpressure
    })
  },

  /**
   * 低压增减
   */

  addHypotention: function () {
    let lowpressure = util.add(this.data.lowpressure, 1)
    // console.log(sugardata)
    let that = this
    that.setData({
      lowpressure: lowpressure
    })
  },

  delHypotention: function () {
    let lowpressure = util.decrease(this.data.lowpressure, 1)
    let that = this
    that.setData({
      lowpressure: lowpressure
    })
  },



  toastChange: function (e) {
    this.setData({
      toastHidden: true
    })
  },

  //弹出确认框
  modalTap: function (e) {
    this.setData({
      modalHidden: false
    })
  },

  confirm: function (e) {
    this.setData({
      modalHidden: true,
      toastHidden: false,
      notice_str: '提交成功'
    })
    wx.navigateTo({
      url: '../../success/success'
    })
  },

  cancel: function (e) {
    this.setData({
      modalHidden: true,
      toastHidden: false,
      notice_str: '取消成功'

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
   * 进行界面的提交
   */
  formSubmit: function (e) {
    let that = this
    console.log(e.detail.value)
    const celiangtime = e.detail.value.cltime
    let formData = e.detail.value
    wx.request({
      url: api.PressureRecord,
      data: formData,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
       // console.log(res.data)
        that.modalTap()
      }
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