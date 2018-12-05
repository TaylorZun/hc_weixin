
var api = require('../config/api.js')

function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

// 封装微信的request
function request(url, data = {}, method = "GET") {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: url,
            data:data,
            method: method,
            header: {
                'content-Type': 'application/json',
                'X-HC-Token': wx.getStorageSync('token')
            },
            success: function (res) {
                console.log("success");
                if(res.statusCode == 200) {
                    if(res.data.errno == 401) {
                        //应该先登录才可以操作
                        let code = null;
                        return login().then((res) => {
                            code = res.code
                            return getUserInfo()
                        }).then((userInfo) => {
                            //登录远程服务器
                            request(api.AuthLoginByWeixin, { code: code, userInfo: userInfo }, 'POST').then(res => {
                                if (res.errno === 0) {
                                    //存储用户信息
                                    wx.setStorageSync('userInfo', res.data.userInfo)
                                    wx.setStorageSync('token', res.data.token)

                                    resolve(res)
                                } else {
                                    reject(res)
                                }
                            }).catch((err) => {
                                reject(err)
                        })
                        }).catch((err) => {
                            reject(err)
                        })
                    } else {
                        resolve(res.data)
                    }
                } else {
                    reject(res.errMsg)
                }
            },
            fail: function (err) {
                reject(err)
                console.log("failed")
            }
        })
    })
}

//检查微信会话是否过期
function checkSession() {
    return new Promise(function (resolve, reject) {
        wx.checkSession({
            success: function () {
                resolve(true)
            },
            fail: function () {
                reject(false)
            }
        })
    })
}

//调用微信登录
function login() {
    return new Promise(function (resolve, reject) {
        wx.login({
            success: function(res) {
                if(res.code) {
                //登录远程服务器
                console.log(res)
                resolve(res)
            } else {
                reject(res)
            }
        },
        fail:function (err) {
            reject(err);
        }
        });
    })
}

function getUserInfo() {
    return new Promise(function (resolve, reject) {
        wx.getUserInfo({
            withCredentials: true,
            success: function (res) {
                console.log(res)
                resolve(res)
            },
            fail: function (err) {
                reject(err)
            }
        })
    })
}

function redirect(url) {
    //判断页面是否需要登录
    if(false) {
        wx.redirectTo({
            url: '/pages/auth/login/login'
        })
        return false;
    } else {
        wx.redirectTo({
            url: url
        })
    }
}

function showErrorToast(msg) {
    wx.showToast({
        title: msg,
        image: '/images/icon_error.png'
    })
}



function withData(param){
    return param < 10 ? '0' + param : '' + param;
   }
   function getLoopArray(start,end){
    var start = start || 0;
    var end = end || 1;
    var array = [];
    for (var i = start; i <= end; i++) {
    array.push(withData(i));
    }
    return array;
   }
   function getMonthDay(year,month){
    var flag = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0), array = null;
    
    switch (month) {
    case '01':
    case '03':
    case '05':
    case '07':
    case '08':
    case '10':
    case '12':
     array = getLoopArray(1, 31)
     break;
    case '04':
    case '06':
    case '09':
    case '11':
     array = getLoopArray(1, 30)
     break;
    case '02':
     array = flag ? getLoopArray(1, 29) : getLoopArray(1, 28)
     break;
    default:
     array = '月份格式不正确，请重新输入！'
    }
    return array;
   }
   function getNewDateArry(){
    // 当前时间的处理
    var newDate = new Date();
    var year = withData(newDate.getFullYear()),
     mont = withData(newDate.getMonth() + 1),
     date = withData(newDate.getDate()),
     hour = withData(newDate.getHours()),
     minu = withData(newDate.getMinutes()),
     seco = withData(newDate.getSeconds());
    
    return [year, mont, date, hour, minu, seco];
   }
   function dateTimePicker(startYear,endYear,date) {
    // 返回默认显示的数组和联动数组的声明
    var dateTime = [], dateTimeArray = [[],[],[],[],[],[]];
    var start = startYear || 1978;
    var end = endYear || 2100;
    // 默认开始显示数据
    var defaultDate = date ? [...date.split(' ')[0].split('-'), ...date.split(' ')[1].split(':')] : getNewDateArry();
    // 处理联动列表数据
    /*年月日 时分秒*/
    dateTimeArray[0] = getLoopArray(start,end);
    dateTimeArray[1] = getLoopArray(1, 12);
    dateTimeArray[2] = getMonthDay(defaultDate[0], defaultDate[1]);
    dateTimeArray[3] = getLoopArray(0, 23);
    dateTimeArray[4] = getLoopArray(0, 59);
    dateTimeArray[5] = getLoopArray(0, 59);
    
    dateTimeArray.forEach((current,index) => {
    dateTime.push(current.indexOf(defaultDate[index]));
    });
    
    return {
    dateTimeArray: dateTimeArray,
    dateTime: dateTime
    }
   }
  
module.exports = {
    formatTime,
    request,
    redirect,
    showErrorToast,
    checkSession,
    login,
    getUserInfo,
    dateTimePicker,
    getMonthDay,
}