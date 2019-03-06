// pages/recordMachine/sport/sport.js
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

    wx.openBluetoothAdapter({
      success: (res) => {
        //监听扫描到新设备的事件
        wx.onBluetoothDeviceFound((res) => {
          res.devices.forEach(device => {
            console.log('device found', device)
          })
        })
        wx.startBluetoothDeviceDiscovery({
          allowDuplicatesKey: false
        })
      },
      fail: (res) => {
        if(res.errCode !== 10001) return
        wx.onBluetoothAdapterStateChange(function(res) {
          if( !res.available) return
          //开始搜寻附近的蓝牙外围设备
          wx.startBluetoothDeviceDiscovery({
            allowDuplicatesKey: false
          })
        })
      }
    })

    wx.createBLEConnection ({
      deviceId,  //从上面找到的某台设备
      success: () => {
        //连接成功，进入下一步
        this.getBLEDeviceServices(deviceId)
      }
    })

    //若不需要连接更多设备，应立即停止扫描
    wx.stopBluetoothDevicesDiscovery()


    //查看设备提供哪些服务
    wx.getBLEDeviceServices({
      deviceId,
      success:(res) => {
        for (let i = 0; i< res.services.length; i++) {
          if(res.services[i].isPrimary) {
            //这里选择一个主服务进行通信，按照具体场景来
            return
          }
        }
      }
    })

    //读写指定服务有哪些特征值
    wx.getBLEDeviceCharacteristics({
      deviceId,
      serviceId,
      success : (res) => {
        for(let i=0; i<res.characteristics.length; i++) {
          let item = res.characteristics[i]
          if(item.properties.write) {
            //向蓝牙设备发送一个0*00的16进制数据
            //应该根据具体设备协议发送数据
            let buffer = new ArrayBuffer(1)
            let dataView = new DataView(buffer)
            dataView.setUint8(0,0)
            wx.writeBLECharacteristicValue({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
              value:buffer,
            })
          }

          if(item.properties.read) {
            wx.readBLECharacteristicValue({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
            })
          }
        }
      }
    })

    //操作之前先监听，保证第一时间获取数据
    wx.onBLECharacteristicValueChange((characteristic) => {
      //断开连接 以及关闭蓝牙适配器
      wx.closeBLEConnection({ deviceId})
      wx.closeBluetoothAdapter()
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

  }
})