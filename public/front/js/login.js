/**
 * Created by msi on 2017/11/4.
 */
$(function () {
  $(".btn_login").on("click", function () {
    var username = $("[name='username']").val();
    var password = $("[name='password']").val();
    //校验
    if (!username) {
      mui.toast("请输入用户名");
      return false;
    }
    if (!password) {
      mui.toast("请输入密码");
      return false;
    }
    $.ajax({
      type: "post",
      url: "/user/login",
      data: {
        username: username,
        password: password
      },
      success: function (data) {
        console.log(data);
        if (data.success) {
          //回调地址？ 如果search 有retUrl,就回调， 没有就跳转个人中心
          var search = location.search;
          if (search.indexOf("retUrl") > -1) {
            search = search.replace("?retUrl=","");
            location.href = search;
          }else {
            location.href = "user.html";
          }
        }
        if (data.error === 403) {
          mui.toast(data.message);
        }
      }
    })
  })
})