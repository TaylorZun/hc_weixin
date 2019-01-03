const api = require('../../config/api.js')
const util = require('../../utils/utils.js')


Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputValue: '', //搜索关键字
    },
    /**
     * 搜索框文本内容显示
     * @param {bindinput是用来监听输入框的输入文字} event 
     */
    inputBind: function (event) {
        this.setData({
            inputValue: event.detail.value
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this
        wx.request({
            url: api.DoctorList,
            method: 'GET',
            header: {
                'content-type': 'application/json',
            },
            success: function (res) {
                // console.log(res)
                if (res.data.errno === 0) {
                    that.setData({
                        doctorList: res.data.data

                    })
                }

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
     * 点击搜索按钮执行
     * @param {*} event 
     */
    query: function (event) {
        let that = this
        wx.request({
            url: api.query,
            data: {
                inputValue: this.data.inputValue
            },
            method: 'GET',
            success: function(res) {
                console.log(res.data)
                that.setData({
                    doctorList: res.data.data
                })
            }

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