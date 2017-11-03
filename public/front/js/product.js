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
        interval:5000
      });
      mui(".mui-numbox").numbox();
    }
  })
})