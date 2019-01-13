/*
 * @Description: 与后台连接的统一的API
 * @Author: pxf
 * @Date: 2018-12-01 16:28:17
 * @LastEditTime: 2019-01-13 22:34:15
 * @LastEditors: Please set LastEditors
 */

// const ApiRootUrl = 'http://localhost:8360/api/';
const ApiRootUrl = 'http://127.0.0.1:8360/api/';
//const ApiRootUrl = 'http://192.168.43.55:8360/api/'; //连接手机测试要用这个才能请求到数据


module.exports = {
    SugarRecord: ApiRootUrl + 'sugar/sugarhand' ,   //文件名+action名称  手动记录血糖
    SugarAsr: ApiRootUrl + 'asr/asrvoice', //语音记录血糖
    PressureRecord: ApiRootUrl + 'bloodpressure/pressurehand',  //血压记录
    DoctorList: ApiRootUrl + 'zixun/getdoctorlist',  //获取医生列表
    DoctorDetail: ApiRootUrl + 'zixun/getdoctordetail',  //获取医生详细信息
    MedicineShow: ApiRootUrl + 'medicine/getmedicine',  //获取用药记录展示在首页
    Message: ApiRootUrl + 'message/msghistory' , //历史消息
    getpressureResult: ApiRootUrl + 'bloodpressure/analyze',  //分析
    getsugarResult:ApiRootUrl + 'sugar/sugaranalyze',
    query: ApiRootUrl + 'zixun/query' , //搜索过滤功能
    sport: ApiRootUrl +'sport/getsport',  //运动数据
    sugar: ApiRootUrl + 'sugar/getsugar'  //血糖数据
}