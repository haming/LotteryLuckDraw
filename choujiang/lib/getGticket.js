/**
 * Created by wufan on 15-12-6.
 */
//在其他模块 var getGticket=require('../lib/getGticket.js');
// 使用方法是：getGticket();
var http = require('../lib/restful');
var sign = require('../lib/sign.js');
var wechat = require('../lib/wechat.js');
//var getGtoken=require('../lib/getGtoken.js');
var ticket = {timestamp: undefined, value: undefined};
module.exports = function (gtoken, callback) {
    //var gtoken=getGtoken();
    var ticket_oldtime = ticket.timestamp;
    var ticket_oldvalue = ticket.value;
    console.log("ticket_oldtime:" + ticket_oldtime);
    console.log('ticket_oldvalue:' + ticket_oldvalue);

    //console.log(ticket.timestamp);
    if ((ticket_oldvalue != undefined) && ((ticket.timestamp - ticket_oldtime) <= 72000000)) {
        ticket.value = ticket_oldvalue;
        console.log("ticket between 2H:" + ticket.value);
        callback && callback(ticket);
    } else {
        console.log("gtoken in first ticket" + gtoken);
        http.httpget(wechat.host, wechat.ticketApi + gtoken + "&type=jsapi", null, function (result, status) {
            var temp = JSON.parse(result.toString());
            ticket.value = temp.ticket;
            ticket.timestamp = new Date().getTime();
            console.log("ticket first:" + ticket.value);
            callback && callback(ticket);
            console.log("ticket by req: timestamp:" + ticket.timestamp + 'value:' + ticket.value);
        });
    }
    //return ticket.value;
};
//sM4AOVdWfPE4DxkXGEs8VCC_0XvprYDsHi7h3ujHPH6cG42MhewVZcz8YleSDgnAE-HNSxfpeCAEUZFdwIatsg
//sM4AOVdWfPE4DxkXGEs8VCC_0XvprYDsHi7h3ujHPH6cG42MhewVZcz8YleSDgnAE-HNSxfpeCAEUZFdwIatsg
