/**
 * Created by msi on 2017/11/2.
 */
$(function () {
  mui(".mui-scroll-wrapper").scroll({
    indicators: false
  });

  var data = {
    proName: "",
    brandId: "",
    price: "",
    num: "",
    page: 1,
    pageSize: 10
  }

  function render(data) {
    $.ajax({
      type: "get",
      url: "/product/queryProduct",
      data: data,
      success: function (data) {
        // console.log(data);
        setTimeout(function () {
          $(".lt_product").html(template("tpl", data));
        }, 1000);
      }
    });
  }

  var key = tools.getParam("key");
  $(".search_text").val(key);
  data.proName = key;
  render(data);

  //搜索按钮事件
  $(".search_btn").on("click", function () {
    //把所有的a的now样式清掉，同时，把两个排序也清掉
    $(".lt_sort a").removeClass("now");
    $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
    data.price = "";
    data.num = "";
    //获取用户输入内容
    var key = $(".search_text").val().trim();
    if (key === "") {
      mui.toast("请输入您要搜索的内容");
    }
    $(".lt_product").html('<div class="loading"></div>');
    data.proName = key;
    render(data);
  });

  //排序功能
  $(".lt_sort>a[data-type]").on("click", function () {
    //如果a标签有类now，就切换span的箭头,如果没有，需要添加now并且清除其他now 同时更换span箭头
    var $this = $(this);
    var $span = $(this).find("span");
    if ($this.hasClass("now")) {
      $span.toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    } else {
      $this.addClass("now").siblings().removeClass("now");
      $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
    }
    //判断排序方式
    var type = $this.data("type");
    var value = $span.hasClass("fa-angle-down") ? 2 : 1;
    //设置num或者price ，在这之前需要保证之前的清空
    data[type] = value;
    render(data);
  })
})