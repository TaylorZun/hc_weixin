// var app = getApp();
// var util = require("../../utils/utils.js")
// var message = '';
// var text = '';
// var user = {};
// var length;
// var zx_info_id;
// var openid_talk;
// Page({
//   data: {
//     news: '',
//     scrollTop: 0,
//     message: '',
//     text: text,
//     centendata: '',
//     nickName: '',
//     avatarUrl: '',
//     news_input_val:'',
//     tabdata: ''
//   },
//   bindChange: function (e) {
//     message = e.detail.value
//   },
//   //事件处理函数
//   add: function (e) {
//     var that = this
//     var data = {
//       program_id: app.jtappid,
//       openid: app._openid,
//       zx_info_id: zx_info_id,
//       content: message,
//       openid_talk:openid_talk
//     }

    
    
//     // util.request('', 'post', data, '正在加载数据', function (res) {
//     //   if (res.data.state == 1) {
//     //     var a = true;
//     //     that.loaddata(a);
//     //     that.setData({
//     //       news_input_val:''
//     //     })
//     //     message = ''
//     //   } else {
//     //     wx.showToast({
//     //       title: '网络错误,请稍后',
//     //     })
//     //   }
//     // })
//   },
 
//   onLoad: function (options) {
//     openid_talk = options.openid_talk;
//     zx_info_id = options.zx_info_id;
//     console.log(openid_talk)
//     //调用应用实例的方法获取全局数据
//     this.setData({
//       zx_info_id: zx_info_id,
//       nickName: app.nickName,
//       avatarUrl: app.avatarUrl,
//     });
//     this.loaddata()
//   },
//   // 页面加载
//   loaddata: function (a) {
//     var that = this;
//     var is_img = true;
//     var data = {
//       program_id: app.jtappid,
//       openid: app._openid,
//       zx_info_id: zx_info_id,
//       openid_talk: openid_talk
//     }
  
//     // util.request('', 'post', data, '', function (res) {
//     //   if (res.data.k1) {
//     //     res.data.k1.time_agree = util.js_date_time(res.data.k1.time_agree)
//     //   }
//     //   for (var i = 0; i < res.data.k2.length; i++) {
//     //     res.data.k2[i].time = util.js_date_time(res.data.k2[i].time)
//     //     var n = res.data.k2[i].content.charAt(res.data.k2[i].content.length - 1);
//     //     switch (n) {
//     //       case 'g':
//     //         res.data.k2[i].is_img = is_img
//     //         break;
//     //       default:
//     //     }
//     //   }
//     //   that.setData({
//     //     tabdata: res.data.k1,
//     //     centendata: res.data.k2.reverse()
//     //   })
//     //   wx.setNavigationBarTitle({ title: that.data.tabdata.nickname });
//     //   if (a) {
//     //     setTimeout(function () {
//     //         that.bottom()
//     //     }, 500);
//     //   }
//     // })
//     setTimeout(function () {
//       if (that.data.centendata.length != length) {
//         length = that.data.centendata.length
//       }
//       that.loaddata()
//     }, 3000);
    
//   },
//   // 获取hei的id节点然后屏幕焦点调转到这个节点
//   bottom: function () {
//     var query = wx.createSelectorQuery()
//     query.select('#hei').boundingClientRect()
//     query.selectViewport().scrollOffset()
//     query.exec(function (res) {
//       wx.pageScrollTo({
//         scrollTop: res[0].bottom  // #the-id节点的下边界坐标
//       })
//       res[1].scrollTop // 显示区域的竖直滚动位置
//     })
//   },
//   // 选择图片并把图片保存  
//   upimg1: function () {
//     var that = this;
//     wx.chooseImage({
//       success: function (res) {
//         var data = {
//           program_id: app.jtappid,
//           openid: app._openid,
//           zx_info_id: zx_info_id,
//         }
//         var tempFilePaths = res.tempFilePaths
//         // wx.uploadFile({
//         //   //url: '', //提交信息至后台
//         //   filePath: tempFilePaths[0],
//         //   name: 'content', //文件对应的参数名字(key)
//         //   formData: data,  //其它的表单信息
//         //   success: function (res) {
//         //     var a = true;
//         //     that.loaddata(a);
//         //     message = ''
//         //   }
//         // })
//       }
//     })
//   }
// })

var app = getApp();

Page({
    data: {
        socket_open: false,//判断连接是否打开
        sendText: "",//发送的消息
        serverMsg: [],//接受的服务端的消息
        userInfo: { userId: 1, name: "呵呵",img:'头像'},//app.appData.userInfo,
        scrolltop: 999
    },
 
    /**输入内容 */
    sendTextBind: function(e) {
        this.setData({
            sendText: e.detail.value
        });
        console.log(this.data.sendText);
    },
    /**发送消息 */
    sendBtn: function(e) {
        console.log('发送消息事件！');
        var msgJson = {
            user: {
                id: this.data.userInfo.userId,//app.appData.userInfo.userId, //唯一ID区分身份
                name: this.data.userInfo.name, //显示用姓名
                img: this.data.userInfo.img, //显示用头像
            },
            msg: this.data.sendText,//发送的消息
            groupid:1
        }
        //发送消息
        this.send_socket_message(JSON.stringify(msgJson));
        this.setData({
            sendText: ""//发送消息后，清空文本框
        });
    },
    onLoad: function(options) {
        // app.login();
        // this.setData({
        //     userInfo: app.appData.userInfo
        // });
        //初始化
        this.wssInit();
    },
    wssInit() {
        var that = this;
        //建立连接
        wx.connectSocket({
            url: 'ws://127.0.0.1:8360/ws'//app.appData.socket
        })
        //监听WebSocket连接打开事件。
        wx.onSocketOpen(function(res) {
            console.log('WebSocket连接已打开！');
            that.setData({
                socket_open: true
            });
        });
        //监听WebSocket接受到服务器的消息事件。
        wx.onSocketMessage(function(res) {
            console.log('收到服务器内容：', res);
            var server_msg = JSON.parse(res.data);
            console.log(server_msg);
            if (server_msg != null) {
                var msgnew = [];
                for (var i = 0; i < server_msg.length; i++) {
                    msgnew.push(JSON.parse(server_msg[i].msg));
                }
                msgnew=that.data.serverMsg.concat(msgnew);
                that.setData({
                    serverMsg: msgnew,
                    scrolltop: msgnew.length * 100
                });
                console.log(that.data.serverMsg);
            }
        });
        //监听WebSocket错误。
        wx.onSocketError(function(res) {
            console.log('WebSocket连接打开失败，请检查！', res)
        });
 
    },
    send_socket_message: function(msg) {
        //socket_open，连接打开的回调后才会为true，然后才能发送消息
        if (this.data.socket_open) {
            wx.sendSocketMessage({
                data: msg
            })
        }
    }
})

