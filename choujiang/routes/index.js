var express = require('express');
var router = express.Router();
var http = require("../lib/restful.js");
var sign = require("../lib/sign.js");
var wx = require("../lib/wechat.js");
var dao = require("../lib/dao.js");
var moment = require("../lib/moment.min.js");


/* GET home page. */

/**
 * 重置时间
 */
//var time = new Date();
//time.getDate();


/**
 * 微信
 */
router.get('/wechat', function (req, res, next) {

    var code = req.query.code;
    console.log("code:" + code);
    var appid = "wxf63280efef262079";
    var appsecret = "e1d9918b180950662a4214ecd2eba86f";


    //获取用户授权
    //https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
    //通过code换取网页授权access_token 以及openid
    //https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
    http.httpget("api.weixin.qq.com", "/sns/oauth2/access_token?appid=" + appid + "&secret=" + appsecret + "&code=" + code + "&grant_type=authorization_code", null, function (result) {
        var temp = JSON.parse(result.toString());
        var access_token = temp.access_token;
        var openid = temp.openid;
        var headimgurl = temp.headimgurl;
        if(openid == undefined ){
            res.send("请使用手机微信登陆");
        }else{
            //拉取用户信息(需scope为 snsapi_userinfo)
            //https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
            http.httpget("api.weixin.qq.com", "/sns/userinfo?access_token=" + access_token + "&openid=" + openid + "&lang=zh_CN", null, function (userresult) {
                var usertemp = JSON.parse(userresult.toString());

                http.httpget("api.weixin.qq.com", "/cgi-bin/token?grant_type=client_credential&appid=" + appid + "&secret=" + appsecret, null, function (result) {
                    var temp = JSON.parse(result.toString());
                    var access_token = temp.access_token;
                    var expires_in = temp.expires_in;
                    //
                    //    //https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi
                    //
                    http.httpget("api.weixin.qq.com", "/cgi-bin/ticket/getticket?access_token=" + access_token + "&type=jsapi", null, function (ticket_result) {
                        var ticket_temp = JSON.parse(ticket_result.toString());
                        var ticket = ticket_temp.ticket;
                        console.log("ticket:" + ticket);
                        var urlForSign = req.url;
                        console.log("url1:" + urlForSign);
                        urlForSign = "http://haoming.5ftech.com" + urlForSign;
                        console.log("url2:" + urlForSign);
                        var ret = sign.sign(ticket, urlForSign);
                        console.log("ret:" + ret.signature);
                        res.render('index', {'ret': ret, 'usertemp': usertemp});
                    });
                });

            })
        }
    });
    //https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf63280efef262079&redirect_uri=http%3a%2f%2fhaoming.5ftech.com%2fwechat&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect
    //获取授权token,以及openid
    //https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET

});


/**
 *  新建用户信息
 *  定义抽奖规则
 */
router.get('/checkUseropenid', function (req, res) {
    var openid = req.query.Openid;
    var nickname = req.query.NickName;
    var headimgurl = req.query.Headimgurl;
    var LotteryNumber;
    var Lottery = "";
    var UserInfo_name = "";
    var UserInfo_phone = "";
    var UserInfo_address = "";
    var User_share = "no";
    if (openid == undefined || openid == '' ) {
        res.send({msg: "0001"});
        res.end();
    } else {
        //可查找是否有该user_openid
        dao.selectuser(openid, function (err, result) {
            console.log("err:" + err);
            console.log("result:" + result);

            if (result == false) {
                console.log("没有找到用户");
                //添加用户openid
                LotteryNumber = 1;

                var time = moment().format('YYYY-MM-DD HH:mm:ss');
                var reset_time = moment().format('YYYY-MM-DD');
                console.log("--------time:"+time);
                dao.CreateUserInfo(openid, nickname, LotteryNumber, Lottery, UserInfo_name, UserInfo_phone, UserInfo_address,User_share,time,headimgurl, function (create_err, create_result) {
                    if (create_err == null) {
                        res.send("000");
                        res.end();
                    } else {
                        res.send("001");
                        res.end();
                    }
                });
            } else {
                console.log("找到用户");
                //查看用户是否已经得奖
                dao.selectUser_lottery(openid,function(lottery_err,lottery_result){
                    console.log("查看用户是否有奖品!");
                    console.log(lottery_result)

                    var lottery = lottery_result[0].Lottery;
                    console.log("取出礼物为:"+lottery);

                    //判断用户是否有礼物
                    if(lottery == "" || lottery == null){

                        //查找用户抽奖次数
                        dao.selectuser_Qualified(openid, function (lottery_Number_err, lottery_Number_result) {
                            //如果 lottery_Number_result = 2 就不能抽奖
                            console.log(lottery_Number_result[0].LotteryNumber);
                            console.log(lottery_Number_result[0].User_share);
                            //返回该用户的抽奖次数

                            var lottery_Number = lottery_Number_result[0].LotteryNumber;
                            var User_share = lottery_Number_result[0].User_share;

                            console.log("用户已抽奖次数为:"+lottery_Number);
                            console.log("分享状态:"+User_share);

                            //如果次数为0
                            if (lottery_Number == 0) {
                                console.log("用户抽奖次数为0");
                                LotteryNumber = 1;
                                dao.updateUser_LotteryNumber(LotteryNumber,openid, function (LotteryNumber_one_err, LotteryNumber_one_result) {
                                    console.log("lottery_Number == 1");
                                    if (LotteryNumber_one_err == null) {
                                        res.send("000");
                                        res.end();
                                    } else {
                                        res.send("001");
                                        res.end();
                                    }
                                });
                            } else if (lottery_Number == 1 && User_share == "yes") {
                                console.log("用户抽奖次数为1");
                                LotteryNumber = 2;
                                dao.updateUser_LotteryNumber(LotteryNumber,openid, function (LotteryNumber_two_err, LotteryNumber_two_result) {
                                    console.log("lottery_Number == 2");
                                    if (LotteryNumber_two_err == null) {
                                        res.send("000");
                                        res.end();
                                    } else {
                                        res.send("001");
                                        res.end();
                                    }
                                });
                            } else if(lottery_Number == 2){
                                console.log("用户抽奖次数为2,不能抽奖!");
                                res.send("007");
                                res.end();
                            } else if (lottery_Number == 1 && User_share == "no"){
                                console.log("用户抽奖次数为1,未分享!");
                                res.send("006");
                                res.end();
                            }
                        });
                    }else{
                        res.send("001");
                    }
                });
            }
        });
    }

});


/**
 * 把奖品存到用户的lottery
 */
router.get('/user_bingo',function(req,res){

    var lottery = req.query.user_liwu;
    var Openid = req.query.Openid;

    dao.updateUser_Lottery(lottery,Openid,function(err,result){
            if (err == null){
                console.log("添加成功");
            }else{
                console.log("添加失败");
            }
    });
});


/**
 * 把奖品从数据库取出,拿到页面
 */
router.get('/check_User_lottery',function(req,res){
    console.log("拿出用户获得的奖品:"+req.query.Openid);
    var openid = req.query.Openid;


    dao.selectUser_lottery(openid,function(err,result){

        if (result == false){
            res.send("no");
        }else{
            var user_lottery = result[0].Lottery;
            console.log("Lottery:"+user_lottery);
            if (user_lottery == "" || user_lottery == null){
                res.send("no");
            }else{
                res.send(result);
            }
        }
    });
});


/**
 *    用户填写奖品的发送信息
 */
router.get('/updateUser_Lottery_msg',function(req,res){
    //userName:UserName,userPhone:userPhone,userAddress:userAddress,Openid:openid
        var usersName = req.query.userName;
        var userPhone = req.query.userPhone;
        var userAddress = req.query.userAddress;
        var Openid = req.query.Openid;
    dao.updateUser_Lottery_msg(usersName,userPhone,userAddress,Openid,function(err,result){
        if(err == null){
            res.send("000");
        }else {
            res.send("001");
        }
    });
});


/**
 *  修改用户分享朋友圈状态
 */
router.get('/updateUser_state',function(req,res){

    var user_share_state = "yes";
    var openid = req.query.Openid;
    dao.updateUser_share_state(user_share_state,openid,function(err,result){
        if (err == null){
            res.send("000");
        }else {
            res.send("001");
        }
    });
});

/**
 * 检查用户的抽奖次数
 */
router.get("/check_user_lottery_Number",function(req,res){
    var openid = req.query.Openid;
    dao.selectuser_Qualified(openid,function(err,result){
        var lotteryNumber = result[0].LotteryNumber;

        if (lotteryNumber == 1){
            res.send("01");
        }else if(lotteryNumber == 2){
            res.send("02");
        }else{
            res.send("0001");
        }
    })

});

/**
 * 取出10个已获得奖品的用户
 */
router.get("/index_select_Users_top_ten",function(req,res){
    dao.selectUsers_all_top_ten(function(err,result){
        if(result == false){
            res.send("no");
        }else {

            //var results = JSON.stringify(result);
            res.send(result);
        }
    });
});






module.exports = router;


