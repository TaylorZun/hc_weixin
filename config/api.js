/*
 * @Description: 与后台连接的统一的API
 * @Author: pxf
 * @Date: 2018-12-01 16:28:17
 * @LastEditTime: 2018-12-18 17:50:40
 * @LastEditors: Please set LastEditors
 */

const ApiRootUrl = 'http://127.0.0.1:8360/api/';

module.exports = {
    SugarRecord: ApiRootUrl + 'sugar/sugarhand' ,   //文件名+action名称  手动记录血糖
    SugarAsr: ApiRootUrl + 'asr/asrvoice' //语音记录血糖
}