// pages/recordMachine/xuetang/xuetang.js
const app = getApp()
const temp = []
const serviceId = "0000000"
const characteristicId = "0000000"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isbluetoothready: false,
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    searchingstatus: false,
    receivedata: '',
    onreceiving: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //蓝牙打开与关闭按钮
  switchBlueTooth: function () {
    let that = this

    that.setData({
      isbluetoothready: !that.data.isbluetoothready,
    })

    if (that.data.isbluetoothready) {
      //初始化蓝牙设备
      wx.openBluetoothAdapter({
        success: function (res) {
          console.log("初始化蓝牙适配器成功")
          //蓝牙适配器状态变化事件
          wx.onBluetoothAdapterStateChange(function (res) {
            console.log("蓝牙适配器状态变化", res)
            that.setData({
              isbluetoothready: res.available,
              searchingstatus: res.discovering
            })
          })
         // 该搜索回调事件可以得到搜索到的蓝牙设备
          wx.onBluetoothDeviceFound(function (devices) {
            console.log(devices)
            temp.push(devices)
            that.setData({
              devices: temp
            })
            console.log('发现新设备')
            console.log('设备id:' +  devices.deviceId)
            console.log('设备name:'  + devices.name)
          })
        },

        fail: function (res) {
          console.log("初始化失败")
          wx.showModal({
            title: '提示',
            content: '请检查手机蓝牙是否打开',
            success: function (res) {
              that.setData({
                isbluetoothready: false,
                searchingstatus: false
              })
            }
          })
        }
      })
    } else {
     let temp = []
      //先关闭设备连接
      wx.closeBLEConnection({
        deviceId: that.data.connectedDeviceId,
        complete: function (res) {
          console.log(res)
          that.setData({
            deviceconnected: false,
            connectedDeviceId: ""
          })
        }
      })
      wx.closeBluetoothAdapter({
        success: function (res) {
          console.log(res)
          that.setData({
            isbluetoothready: false,
            deviceconnected: false,
            devices: [],
            searchingstatus: false,
            receivedata: ''
          })
        },
        fail: function(res) {
          wx.showModal({
            title: '提示',
            content: '请检查手机蓝牙是否打开',
            success: function (res) {
              that.setData({
                isbluetoothready: false
              })
            }
          })
        }
      })
    }
  },

  //蓝牙搜索
  searchbluetooth: function () {
   let temp = []
    let that = this
    if(!that.data.searchingstatus) {
      let that = this
      wx.startBluetoothDevicesDiscovery({
        success: function (res) {
          console.log("开始搜索附近设备")
          console.log(res)
          that.setData({
            searchingstatus: !that.data.searchingstatus
          })
        }
      })
    } else {
      wx.stopBluetoothDevicesDiscovery({
        success: function (res) {
          console.log("停止蓝牙搜索")
          console.log(res)
        }
      })
    }
  },

  connectTo: function (e) {
    let that = this
    if(!that.data.deviceconnected) {
      wx.notifyBLECharacteristicValueChanged({
        state: false,   //停用notify功能
        deviceId: that.data.connectedDeviceId,
        serviceId: serviceId,
        characteristicId: characteristicId,
        success: function (res) {
          console.log("停用notify")
        }
      })
      wx.closeBLEConnection({
        deviceId: e.currentTarget.id,
        complete: function (res) {
          console.log("断开设备")
          console.log(res)
          that.setData({
            deviceconnected: false,
            connectedDeviceId: "",
            receivedata: ""
          })
        }
      })
    } else {
      wx.showLoading({
        title: '连接蓝牙设备中...',
      })
      wx.createdBLEConnection({
        deviceId: e.currentTarget.id,
        success: function (res) {
          wx.hideLoading()
          wx.showToast({
            title: '连接成功',
            icon: 'success',
            duration: 1000
          })
          console.log("设备连接成功")
          onmouseleave.log(res)
          that.setData({
            deviceconnected: true,
            connectedDeviceId: e.currentTarget. id
          })

          wx.notifyBLECharacteristicValueChanged({
            state: true,  //启用notify功能
            deviceId: that.data.connectedDeviceId,
            serviceId: serviceId,
            characteristicId: characteristicId,
            success: function(res) {
              console.log("启用notify")
            }
          })
        },
        fail: function (res) {
          wx.hideLoading()
          wx.showToast({
            title: '连接设备失败',
            icon: 'success',
            duration: 1000
          })
          console.log("连接设备失败")
          console.log(res)
          that.setData({
            connected: false
          })
        }
      })
      wx.stopBluetoothDevicesDiscovery({
        success: function (res) {
          console.log("停止蓝牙搜索")
          console.log(res)
        }
      })
    }
  },

  formSubmit: function (e) {
    console.log('form 发生submit事件，携带数据为：',e.detail.value.senddata)
    let senddata  = e.detail.value.senddata
    let that = this
    let buffer = new ArrayBuffer(senddata.length)
    let dataView = new DataView(buffer)
    for( let i = 0; i < senddata.length; i++) {
      dataView.setUint8(i, senddata.charAt(i).charCodeAt())
    }
    wx.writeBLECharacteristicValue({
      deviceId: that.data.connectedDeviceId,
      serviceId: serviceId,
      characteristicId: characteristicId,
      value: buffer,
      success: function (res) {
        console.log(res)
        console.log('writeBLECharacteristicValue success', res.errMsg)
      }
    })
  },

  formReset:function () {
    console.log("form发生reset事件")
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

function getNowFormatDate() {
  let date = new Date()
  const seperator1 = "-"
  const seperator2 = ":"
  let month = date.getMonth() + 1
  let strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = "0" + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate
  }
  let currentdate = date.getFullYear() + seperator1 +
   month + seperator1 + strDate + " " + date.getHours() +
    seperator2 + date.getMinutes() + seperator2 + date.getSeconds()
    return currentdate
}