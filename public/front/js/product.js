/**
 * Created by msi on 2017/11/3.
 */
$(function () {
  mui(".mui-scroll-wrapper").scroll({
    indicators: false
  });
  var id = tools.getParam("productId");
  $.ajax({
    type: "get",
    url: "/product/queryProductDetail",
    data: {
      id: id
    },
    success: function (data) {
      console.log(data);
      var temp = data.size.split("-");
      var sizeArray = [];
      for (var i = temp[0]; i < temp[1]; i++) {
        sizeArray.push(i);
      }
      data.sizeArray = sizeArray;
      $(".mui-scroll").html(template("tpl", data));
      //初始化轮播图
      mui(".mui-slider").slider({
        interval: 5000
      });
      mui(".mui-numbox").numbox();
    }
  })

  //尺码选择
  $(".mui-scroll").on("click", ".size", function () {
    $(this).addClass("now").siblings().removeClass("now")
  });
  //添加购物车
  $(".btn_add_cart").on("click", function () {
    var size = $(".size.now").html();
    var num = $(".mui-numbox-input").val();
    if (!size) {
      mui.toast("请选择尺码");
      return;
    }
    $.ajax({
      type: "post",
      url: "/cart/addCart",
      data: {
        productId: id,
        num: num,
        size: size
      },
      success: function (data) {
        console.log(data);
        if (data.success) {
          mui.toast("已加入购物车")
        }
        if (data.error === 400) {
          location.href = "login.html?retUrl=" + location.href;
        }
      }
    })
  })
})