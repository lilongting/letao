/**
 * Created by msi on 2017/11/1.
 */
// 开启滚动 左右滚动 是数组
var sc = mui(".mui-scroll-wrapper").scroll({
  deceleration: 0.0005,
  indicators: false
})
//渲染一级分类
$.ajax({
  type: "get",
  url: "/category/queryTopCategory",
  success: function (data) {
    // console.log(data);
    var html = template("tpl-left", data);
    $(".lt_category_l ul").html(html);

    renderSecond(data.rows[0].id)
  }
});
//二级分类
function renderSecond(id) {
  $.ajax({
    type: "get",
    url: "/category/querySecondCategory",
    data: {
      id: id
    },
    success: function (data) {
      console.log(data);
      $(".lt_category_r ul").html(template("tpl-right",data));
    }
  });
};

//给左边li注册事件委托 获取自定属性id，渲染对象的二级分类
$(".lt_category_l").on("click","li",function () {
  $(this).addClass("now").siblings().removeClass("now");
  var id = $(this).data("id");
  renderSecond(id);
  //切换左侧分类 让右侧恢复顶端
  sc[1].scrollTo(0,0,300);
})