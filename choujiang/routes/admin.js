/**
 * Created by ming on 15/12/25.
 */
var express = require('express');
var router = express.Router();
var admindao = require('../lib/admindao');


/**
 * 取出所有奖品
 */
router.get('/addlottery', function (req, res) {
    console.log("添加奖品页面!");
    admindao.admin_select_all_gifts(function(err,result){
        res.render("addlottery",{result:JSON.stringify(result)});
    });
});


/**
 * 获取所有用户
 */
router.get('/admin_indexManager', function (req, res) {
    admindao.admin_select_all_usersinfo(function(err,result){
        //res.send("跳到首页");
        res.render("index",{result:JSON.stringify(result)});
        //res.render("/admin_indexManage",{result:JSON.stringify(result)});
    })
});

/**
 * 修改用户信息
 */
router.get('/usersInfo_up', function (req, res) {
    console.log("openid:"+req.query.openid);
    var openid = req.query.openid;

    admindao.admin_select_userinfo(openid,function(err,result){
        res.render("update_UserInfo",{result:result[0]});
    });
});
module.exports = router;

