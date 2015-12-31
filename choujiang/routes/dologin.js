var express = require('express');
var router = express.Router();
var dao = require('../lib/adminDao');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});



router.post('/dologin', function(req, res,next){
  console.log("登陆名:"+req.body.username);
  console.log("密码:"+req.body.password);


  //dao.admin_login_Verify(req.body.username,req.body.password,function(err,result){
  //  if(result != false){
  //
  //    dao.selectItem(function(err,result){
  //      ////console.log("找出数据");
  //      //res.send(result);
  //      req.session.username = req.body.username;
  //      res.render("dashboard",{title:"管理主页",result:JSON.stringify(result)});
  //    })
  //  }else{
  //    res.render("index");
  //  }
  //})
});

router.get('/logout',function(req,res,next){
  req.session.username = null;
  res.render('index', {err:false});
});




module.exports = router;


module.exports = router;
