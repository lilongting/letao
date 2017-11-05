/**
 * Created by msi on 2017/11/5.
 */
$(function () {
  //验证码功能
  $(".btn_getcode").on("click", function () {
    var $this = $(this);
    //点击按钮修改值 正在发送 并禁用按钮
    //判断是否有disabled
    if ($this.hasClass("disabled")) {
      return false;
    }
    $this.addClass("disabled").html("正在发送中...");
    $.ajax({
      type: "get",
      url: "/user/vCode",
      success: function (data) {
        console.log(data);
        console.log(data.vCode);
        var temp = 60;
        var timer = setInterval(function () {
          temp--;
          $this.html(temp + "秒后再次发送");
          if (temp <= 0) {
            $this.html("再次发送").removeClass("disabled")
            clearInterval(timer);
          }
        }, 1000);
      }
    });
  })
  //注册
  $(".btn_register").on("click", function () {
    var username = $("[name='username']").val();
    var password = $("[name='password']").val();
    var repassword = $("[name='repassword']").val();
    var mobile = $("[name='mobile']").val();
    var vCode = $("[name='vCode']").val();
    //校验表单
    if (!username) {
      mui.toast("请输入用户名");
      return false;
    }
    if (!password) {
      mui.toast("请输入密码");
      return false;
    }
    if (!repassword) {
      mui.toast("请输入确认密码");
      return false;
    }
    if (password != repassword) {
      mui.toast("两次密码不一致，请重新输入");
      return false;
    }
    if (!vCode) {
      mui.toast("请输入验证码");
      return false;
    }
    if (!/^\d{6}$/.test(vCode)) {
      mui.toast("请输入有效验证码");
      return false;
    }
    if (!mobile) {
      mui.toast("请输入手机号码");
      return false;
    }
    if (!/^1[34568]\d{9}$/.test(mobile)) {
      mui.toast("请输入有效的手机号码");
      return false;
    }
    $.ajax({
      type: "post",
      url: "/user/register",
      data: {
        username: username,
        password: password,
        mobile: mobile,
        vCode: vCode
      },
      success: function (data) {
        console.log(data);
        if (data.success) {
          mui.toast("注册成功，即将跳转到登录页面");
          setTimeout(function () {
            location.href = "login.html";
          }, 1000);
        }else {
          mui.toast(data.message);
        }
      }
    })
  })
})