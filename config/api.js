/*
 * @Description: 与后台连接的统一的API
 * @Author: pxf
 * @Date: 2018-12-01 16:28:17
 * @LastEditTime: 2018-12-24 10:47:20
 * @LastEditors: Please set LastEditors
 */

// const ApiRootUrl = 'http://localhost:8360/api/';
const ApiRootUrl = 'http://127.0.0.1:8360/api/';
//const ApiRootUrl = 'http://192.168.43.55:8360/api/'; //连接手机测试要用这个才能请求到数据


module.exports = {
    SugarRecord: ApiRootUrl + 'sugar/sugarhand' ,   //文件名+action名称  手动记录血糖
    SugarAsr: ApiRootUrl + 'asr/asrvoice', //语音记录血糖
    PressureRecord: ApiRootUrl + 'bloodpressure/pressurehand',
    DoctorList: ApiRootUrl + 'zixun/getdoctorlist'
}