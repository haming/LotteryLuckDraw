/**
 * Created by ming on 15/12/22.
 */



$(document).ready(function () {
  var openid = {Openid:Openid};

  $('.share').click(function () {
    //alert("注意!是在右上角分享朋友圈喔!");
    $('#nolottery_one').css("display","block");
  });

  $('#xiaoyao').click(function () {
    //alert("在右上角分享朋友圈,一齐分享你的喜乐吧!");
    $('#Mylottery').css("display","block");
  });

  $('#share2').click(function () {
    //alert("在右上角分享朋友圈,一齐分享你的喜乐吧!");
    $('#nolottery_two').css("display","block");
  });

  wx.ready(function () {
    wx.onMenuShareTimeline({
      title: '美悟空——精彩人生 '+ nickname +' 为她代言', // 分享标题
      link: 'http://haoming.5ftech.com', // 分享链接
      imgUrl: 'http://haoming.5ftech.com/images/Hug.png', // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
        $.get("/updateUser_state",openid,function(msg){
          if(msg == "000"){
            alert("分享成功!");
          }else {
            alert("取消分享!");
          }
        });
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        alert("取消分享就不能再抽奖咯!");
      }
    });
    wx.onMenuShareAppMessage({
      title: '美悟空——精彩人生'+ nickname +'为她代言', // 分享标题
      desc: '这是一个关于美的故事', // 分享描述
      link: 'http://haoming.5ftech.com', // 分享链接
      imgUrl: 'http://haoming.5ftech.com/images/Hug.png', // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        // 用户确认分享后执行的回调函数
        $.get("/updateUser_state",openid,function(msg){
          if(msg == "000"){
            alert("感谢分享");
          }else {
            alert("取消分享!");
          }
        });
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        alert("取消分享");
      }
    });
  });
});



