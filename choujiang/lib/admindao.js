/**
 * Created by ming on 15/12/24.
 */
var mysql = require("mysql");
var CRUD = require("../lib/CRUD.js");
var async = require("async");
var dbconf = require("../lib/dbconf.js");

/**
 * 管理员登陆
 * @param adminName
 * @param adminPwd
 * @param callback
 */
exports.admin_login_Verify = function(adminName,adminPwd,callback){
    CRUD._select(dbconf.client,
        "select * from adminUser where admin_Name = ? and admin_password = ?",
        [adminName,adminPwd], function (result, err) {
            callback(result, err);
        });
};

/**
 * 查找全部用户信息
 */
exports.admin_select_all_usersinfo = function(callback){
    CRUD._select(dbconf.client,"select * from UsersInfos",null,function(err,result){
        callback(err,result);
    });
};

/**
 * 查找全部奖品
 * @param callback
 */
exports.admin_select_all_gifts = function(callback){
    CRUD._select(dbconf.client,"select * from gifts",null,function(err,result){
        callback(err,result);
    });
};

/**
 * 根据用户的openid获取用户信息
 * @param openid
 * @param callback
 */
exports.admin_select_userinfo = function(openid,callback){
    CRUD._select(dbconf.client,"select * from UsersInfos where UserInfo_openid = ?",openid,function(err,result){
        callback(err,result);
    });
};

