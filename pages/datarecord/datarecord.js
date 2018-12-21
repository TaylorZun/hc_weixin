Page({
    data: {
      memberList: [{
          images: "/images/datarecordicon/xuetang.png",
          img_icon: "/images/datarecordicon/jiahao.png",
          cont: "血糖记录",
          hiddens: true,
          id: "0",
          invalidActivity: [{
              images: "/images/datarecordicon/shebei.png",
              content: "设备",
              url: "../recordMachine/xuetang/xuetang",
            },
            {
              images: "/images/datarecordicon/yuyinshuru.png",
              content: "语音",
              url: "../recordVoice/xuetang/xuetang",
            },
            {
              images: "/images/datarecordicon/shoudongshuru.png",
              content: "手动",
              url: "../recordHand/xuetang/xuetang",
            },
          ]
        },
        {
          images: "/images/datarecordicon/xueya.png",
          img_icon: "/images/datarecordicon/jiahao.png",
          cont: "血压记录",
          hiddens: true,
          id: "1",
          invalidActivity: [{
              images: "/images/datarecordicon/shebei.png",
              content: "设备",
              url: "../addFunction/addFunction",
            },
            {
              images: "/images/datarecordicon/yuyinshuru.png",
              content: "语音",
              url: "../addFunction/addFunction",
            },
            {
              images: "/images/datarecordicon/shoudongshuru.png",
              content: "手动",
              url: "../recordHand/xueya/xueya",
            },
          ]
        },
        {
          images: "/images/datarecordicon/shengaotizhong.png",
          img_icon: "/images/datarecordicon/jiahao.png",
          cont: "身高体重",
          hiddens: true,
          id: "2",
          invalidActivity: [{
              images: "/images/datarecordicon/shebei.png",
              content: "设备",
              url: "../addFunction/addFunction",
            },
            {
              images: "/images/datarecordicon/yuyinshuru.png",
              content: "语音",
              url: "../addFunction/addFunction",
            },
            {
              images: "/images/datarecordicon/shoudongshuru.png",
              content: "手动",
              url: "../addFunction/addFunction",
            },
          ]
        },
        {
          images: "/images/datarecordicon/yongyaojilu.png",
          img_icon: "/images/datarecordicon/jiahao.png",
          cont: "用药记录",
          hiddens: true,
          id: "3",
          invalidActivity: [{
              images: "/images/datarecordicon/shebei.png",
              content: "设备",
            },
            {
              images: "/images/datarecordicon/yuyinshuru.png",
              content: "语音",
            },
            {
              images: "/images/datarecordicon/shoudongshuru.png",
              content: "手动",
            },
          ]
        },
        {
          images: "/images/datarecordicon/shangchuan.png",
          img_icon: "/images/datarecordicon/jiahao.png",
          cont: "体检报告上传",
          hiddens: true,
          id: "4",
          invalidActivity: [{
              images: "/images/datarecordicon/shebei.png",
              content: "拍照",
            },
            {
              images: "/images/datarecordicon/yuyinshuru.png",
              content: "本地图片",
            },
            {
              images: "/images/datarecordicon/shoudongshuru.png",
              content: "手动",
            },
          ]
        },
  
      ]
    },
  
    isOpen: function (e) {
      var that = this;
      var idx = e.currentTarget.dataset.index;
      //console.log(idx)
      var memberList = that.data.memberList;
      //console.log(memberList)
      var hiddenss = memberList[idx].hiddens;
      //console.log(hiddenss)
      if (hiddenss == true) {
        that.setData({
          ['memberList[' + idx + '].hiddens']: !hiddenss, //展开的时候操作
          ['memberList[' + idx + '].img_icon']: "/images/datarecordicon/chahao.png",
        })
      } else {
        that.setData({
          ['memberList[' + idx + '].hiddens']: !hiddenss, //隐藏的时候的操作
          ['memberList[' + idx + '].img_icon']: "/images/datarecordicon/jiahao.png"
        })
      }
      // console.log(memberList)
      // for (let i = 0; i < memberList.length; i++) {
      //   if (idx == i) {
      //     memberList[i].hidden = !memberList[i].hidden;
      //   } else {
      //     memberList[i].hidden = true;
      //   }
      // }
      // this.setData({memberList:memberList});
      // return true;
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