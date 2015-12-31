/**
 * Created by root on 15-3-11.
 */
var mysql = require("mysql");
var CRUD = require("../lib/CRUD.js");
var async = require("async");
var dbconf = require("../lib/dbconf.js");

//    CRUD._insert(dbconf.client, "insert into groups set id=?,name=?,location=?,size=?", ['4', 'GroupD','D','40']);
//CRUD._update(dbconf.client, "update User set Name='22' where ID=1");
//    CRUD._delete(dbconf.client, "delete from groups where id=4");


/**
 * 在adminUser表创建用户信息
 */
exports.CreateUserInfo = function (UserInfo_appid, UserInfo_NickName, LotteryNumber, Lottery, UserInfo_name, UserInfo_phone, UserInfo_address,User_share,time,headimgurl, callback) {
    CRUD._insert(dbconf.client,
        "insert into UsersInfos set UserInfo_openid = ?, UserInfo_NickName = ? , LotteryNumber = ? , Lottery = ? , UserInfo_name = ?,UserInfo_phone = ?,UserInfo_address = ?,User_share = ?, time = ? , headimgurl = ?",
        [UserInfo_appid, UserInfo_NickName, LotteryNumber, Lottery, UserInfo_name, UserInfo_phone, UserInfo_address,User_share,time,headimgurl], function (result, err) {
            callback(result, err);
        });
};

/**
 * 查找是否有相同的openid
 */
exports.selectuser = function(user_openid,callback){
    CRUD._select(dbconf.client,"select * from UsersInfos where UserInfo_openid = ?",[user_openid],function(err,result){
        callback(err,result);
    });
};

/**
 * 用户中奖添加
 */
exports.updateUser_Lottery = function(lottery,openid,callback){
    CRUD._update(dbconf.client,"update UsersInfos set Lottery = ? where UserInfo_openid = ?",[lottery,openid],function(err,result){
        callback(err,result);
    });
};

/**
 * 用户抽到奖品填写信息
 */
exports.updateUser_Lottery_msg = function(UserInfo_name,UserInfo_phone,UserInfo_address,openid,callback){
    CRUD._update(dbconf.client,"update UsersInfos set  UserInfo_name = ?,UserInfo_phone = ?,UserInfo_address = ? where UserInfo_openid = ?",[UserInfo_name,UserInfo_phone,UserInfo_address,openid],function(err,result){
        callback(err,result);
    });
};

/**
 * 查看用户是否已经得奖
 * 如果已经得奖,则输出奖品名称
 */
exports.selectUser_lottery = function(openid,callback){
    CRUD._select(dbconf.client,"select * from UsersInfos where UserInfo_openid = ? ",[openid],function(err,result){
        callback(err,result);
    });
};

/**
 * 查找用户抽奖次数
 */
exports.selectuser_Qualified = function(user_openid,callback){
    CRUD._select(dbconf.client,"select * from UsersInfos where UserInfo_openid = ?",[user_openid],function(err,result){
        callback(err,result);
    });
};

/**
 * 修改用户抽奖次数
 */
exports.updateUser_LotteryNumber = function(LotteryNumber,openid,callback){
    CRUD._update(dbconf.client,"update UsersInfos set LotteryNumber = ? where UserInfo_openid = ?",[LotteryNumber,openid],function(err,result){
        callback(err,result);
    });
};


/**
 * 修改用户的朋友圈状态
 */
exports.updateUser_share_state = function(User_share,openid,callback){
    CRUD._update(dbconf.client,"update UsersInfos set User_share = ? where UserInfo_openid = ?",[User_share,openid],function(err,result){
            callback(err,result);
    });
};



//后台--------------------------------------
/**
 *  后台登陆管理
 */
exports.adminlogin = function (userName, userpwd, callback) {
    CRUD._select(dbconf.client, "select * from adminUser where admin_name = ? and admin_pwd = ?", [userName, userpwd], function (err, result) {
        callback(err, result);
    });
};

/**
 *  添加物品
 */
exports.addGoods = function(Goods_Name,Goods_Number,callback){
    CRUD._insert(dbconf.client,"insert into gifts set gift_name=?,gift_Number=?",[Goods_Name,Goods_Number],function(err,result){
        callback(err,result);
    });
};

/**
 * 重置未中奖
 */
exports.updateUser_LotteryNumber_set0 = function(num,callback){
    CRUD._insert(dbconf.client,"update UsersInfos set LotteryNumber = ?",[num],function(err,result){
        callback(err,result);
    });
};


/**
 *  取出10个已获得奖品的用户
 */
exports.selectUsers_all_top_ten = function(callback){
    CRUD._select(dbconf.client,"select * from UsersInfos where Lottery !='' limit 10",null,function(err,result){
        callback(err,result);
    });
};


/**
 *  重置未中奖的用户
 */
exports.reset_Users = function(LotteryNumber,User_share,callback){
    CRUD._update(dbconf.client,"update UsersInfos set LotteryNumber = ?,User_share = ? where Lottery ='' ",[LotteryNumber,User_share],function(err,result){
        callback(err,result);
    });
};
