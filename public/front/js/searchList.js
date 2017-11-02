/**
 * Created by msi on 2017/11/2.
 */
$(function () {
  mui(".mui-scroll-wrapper").scroll({
    indicators: false
  });
  var currentPage = 1;
  var pageSize = 10;
  var key = tools.getParam("key");
  // console.log(key);
  $(".search_text").val(key);
  $.ajax({
    type: "get",
    url: "/product/queryProduct",
    data: {
      page: currentPage,
      pageSize: pageSize,
      proName: key
    },
    success: function (data) {
      console.log(data);
      setTimeout(function () {
        $(".lt_product").html(template("tpl", data));
      }, 1000);
    }
  });

  //搜索按钮事件
  $(".search_btn").on("click", function () {
    var key = $(".search_text").val().trim();
    if (key === "") {
      mui.toast("请输入您要搜索的内容");
    }
    $(".lt_product").html('<div class="loading"></div>');
    $.ajax({
      type: "get",
      url: "/product/queryProduct",
      data: {
        page: currentPage,
        pageSize: pageSize,
        proName: key
      },
      success: function (data) {
        console.log(data);
        setTimeout(function () {
          $(".lt_product").html(template("tpl", data));
        }, 1000);
      }
    });
  })
})