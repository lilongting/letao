/**
 * Created by msi on 2017/10/29.
 */
//校验用户是否登录状态
if (location.href.indexOf("login.html") < 0) {
  $.ajax({
    type: "get",
    url: "/employee/checkRootLogin",
    success: function (data) {
      if (data.error === 400) {
        location.href = "login.html";
      }
    }
  })
}
$(document).ajaxStart(function () {
  NProgress.start();
})
$(document).ajaxStart(function () {
  setTimeout(function () {
    NProgress.done();
  }, 500);
});
//点击分类管理，显示或隐藏二级分类
$('.child').prev().on("click", function () {
  $(this).next().slideToggle();
})
//点击icon_menu，显示或隐藏侧边栏
$(".icon_menu").on("click", function () {
  $(".lt_aside").toggleClass("now");
  $(".lt_main").toggleClass("now");
  $(".lt_header").toggleClass("now");
})
//退出功能
$(".icon_logout").on("click", function () {
  $("#logoutModal").modal("show");
})
$(".btn_logout").on("click", function () {
  $.ajax({
    type: "get",
    url: "/employee/employeeLogout",
    success: function (data) {
      if (data.success) {
        window.location.href = "login.html";
      }
    }
  })
})
