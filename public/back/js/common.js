/**
 * Created by msi on 2017/10/29.
 */
//校验用户是否登录状态
if(location.href.indexOf("login.html")<0){
  $.ajax({
    type:"get",
    url:"/employee/checkRootLogin",
    success:function (data) {
        if(data.error===400){
          location.href ="login.html";
        }
    }
  })
}