/**
 * Created by ming on 15/12/21.
 */
var express = require('express');
var router = express.Router();
var admindao = require("../lib/admindao");


/* GET users listing. */
router.get('/', function(req, res, next) {

    console.log("后台登陆页面");

    res.render('admin_login',{title:'后台首页'});
});




router.post('/dologin', function(req,res,next){

    console.log("登陆名:"+req.body.username);
    console.log("密码:"+req.body.password);

    var username = req.body.username;
    var password = req.body.password;

    admindao.admin_login_Verify(username,password,function(err,result){

      if(result != false){
          admindao.admin_select_all_usersinfo(function(err,result){
                    //res.send("跳到首页");
              res.render("index",{result:JSON.stringify(result)});
          })
      }else{
        res.render("admin_login",{error:'登陆名或密码错误!'});
      }
    })
});



module.exports = router;
