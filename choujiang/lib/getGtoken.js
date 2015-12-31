/**
 * Created by wufan on 15/12/3.
 */
//引用：var getGtoken=require('../lib/getGtoken.js');
//使用：getGtoken();
var http = require('../lib/restful');
var sign = require('../lib/sign.js');
var wechat = require('../lib/wechat.js');
var gtoken = {timestamp: undefined, value: undefined};
//var gtoken={timestamp:new Date().getTime(),value:''};


module.exports = function (callback) {

    var gtoken_oldtime = gtoken.timestamp;
    var gtoken_oldvalue = gtoken.value;
    //console.log("time:"+gtoken_oldtime);
    //console.log("token:"+gtoken_oldvalue);
    //gtoken.timestamp=new Date().getTime();
    //console.log(gtoken.timestamp);
    if ((gtoken_oldvalue != undefined) && ((gtoken.timestamp - gtoken_oldtime) <= 7200000)) {
        gtoken.value = gtoken_oldvalue;
        //console.log("gtoken between 2H:" + gtoken.value);
        callback && callback(gtoken);
    } else {
        http.httpget(wechat.host, wechat.gtokenApi, null, function (result, status) {
            var temp_token = JSON.parse(result.toString());
            gtoken.value = temp_token.access_token;
            gtoken.timestamp = new Date().getTime();
            //console.log("检测token 1 终于成功了"+gtoken.value);
            callback && callback(gtoken);
            //console.log("gtoken by req: timestamp:" +gtoken.timestamp+ 'value:'+gtoken.value);
        });
    }
    //console.log("检测token 0"+gtoken.value);
    //callback&&callback(gtoken);
    //return gtoken.value;
};
