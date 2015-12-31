/**
 * Created by ming on 15/12/17.
 */

var schedule = require("node-schedule");
var dao = require("./dao.js");

//
//
//var UserInfo_appid = "123456789";
//var UserInfo_NickName = "浩明";
//var LotteryNumber = 2;
//var Lottery = "1111";
//var UserInfo_name = "明";
//var UserInfo_phone = "123456789";
//var UserInfo_address = "11111a";
//
//
//dao.CreateUserInfo(UserInfo_appid, UserInfo_NickName , LotteryNumber, Lottery, UserInfo_name, UserInfo_phone, UserInfo_address,function(result,err){
//
//        console.log(result);
//        console.log(err);
//});


//var Goods_Name = "手表";
//var Goods_Number = 10;
//
//dao.addGoods(Goods_Name,Goods_Number,function(result,err){
//
//        console.log(result);
//        console.log(err);
//
//});


//var Goods_Name = "admin";
//var Goods_Number = "admin";
//
//dao.adminlogin(Goods_Name,Goods_Number,function(err,result){
//    console.log(result);
//    console.log(err);
//});

//var num = "shouji";
//dao.updateUser_Lottery(num,function(err,result){
//    console.log(result);
//    console.log(err);
//});

//var openid = "oaQO0t1FK9juiFxbf0XHe7ltsh00";
//console.log("openid:"+openid);
//dao.selectuser(openid,function(err,result){
//    console.log("err:"+err);
//    console.log("result:"+result);
//});
//var LotteryNumber = 0;
//var User_share = "no";
//
//
//dao.reset_Users(LotteryNumber,User_share,function(err,result){
//        console.log(result);
//});
//

//计时器
//var rule = new schedule.RecurrenceRule();
//var times = [];
//var LotteryNumber = 0;
//var User_share = "no";
//
//for (var i = 1; i < 60; i++) {
//    times.push(i);
//}
//rule.second = times;
//var c = 0;
//var j = schedule.scheduleJob(rule, function () {
//    c++;
//    if (c == 86400){
//        console.log("执行重置");
//        dao.reset_Users(LotteryNumber,User_share,function(err,result){
//                if(err == null){
//                    console.log("重置成功!");
//                }else{
//                    console.log("重置失败!");
//                }
//        });
//        c = 0;
//    }else {
//        console.log(c);
//    }
//
//});

