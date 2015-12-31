/**
 * Created by wufan on 15/12/3.
 */
//引用：var wechat=require('../lib/wechat.js');
//使用：wechat.host;wechat.gtokenApi等;
var wf = {
    appid: "wxf63280efef262079",
    secret: "e1d9918b180950662a4214ecd2eba86f"
};

module.exports = {
    host: "api.weixin.qq.com",
    oauth2Api: "/sns/oauth2/access_token?appid=" + wf.appid + "&secret=" + wf.secret,
    gtokenApi: "/cgi-bin/token?grant_type=client_credential&appid=" + wf.appid + "&secret=" + wf.secret,
    ticketApi: "/cgi-bin/ticket/getticket?access_token=",
    userinfoApi: "/sns/userinfo?access_token="
};
