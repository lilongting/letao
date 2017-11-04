/**
 * Created by msi on 2017/11/4.
 */
$(function () {
  //渲染会员中心
  $.ajax({
    type: 'get',
    url: "/user/queryUserMessage",
    success: function (data) {
      tools.checkLogin(data);
      $(".userinfo").html(template("tpl", data));
    }
  });
  //退出
  $(".logout").on("click", function () {
    mui.confirm("您确定要退出么？", "提示", ["否", "是"], function (e) {
      console.log(e);
      if (e.index === 0) {
        mui.toast("已取消退出")
      }else {
        $.ajax({
          type:"get",
          url: "/user/logout",
          success:function (data) {
            if(data.success){
              location.href = "login.html";
            }
          }
        })
      }
    })
  })
})