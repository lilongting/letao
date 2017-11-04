/**
 * Created by msi on 2017/11/1.
 */
mui(".mui-scroll-wrapper").scroll({
  indicators: false
});
//渲染搜索记录列表
//localStorage
// 数据不会自动携带，需要手动获取  setItem  getItem  removeItem
// 获取localStorage中的lt_search_history, 是一个json字符串
// 把这个json转换成一个数组。
// 使用模版引擎把内容渲染出来
function getHistory() {
  var search_history = localStorage.getItem("lt_search_history") || "[]";
  var arr = JSON.parse(search_history);
  return arr;
}
function render() {
  var arr = getHistory();
  $(".lt_history").html(template("tpl", {arr: arr}));
}
render();
//清空功能 事件委托
$(".lt_history").on("click", ".icon_empty", function () {
  localStorage.removeItem("lt_search_history");
  render();
});
//删除功能
$(".lt_history").on("click", ".fa-close", function () {
  var btnArray = ["是", "否"];
  //吧this存起来，
  var $this = $(this)
  mui.confirm("你确定删除这条记录", "提示", btnArray, function (data) {
    // console.log(data);
    if (data.index == 0) {
      var arr = getHistory();
      //如果不在外面存储this，在此处function已改变this指向，找不到this（undefined 转换数字是0），所以在删除最后一项的时候，删除的是第一项
      var index = $this.data("index");
      arr.splice(index, 1);
      localStorage.setItem("lt_search_history", JSON.stringify(arr));
      render();
      mui.toast("删除成功");
    } else {
      mui.toast("删除取消");
    }
  });
});
//添加功能
$(".search_btn").on("click", function () {
  var key = $(".search_text").val().trim();
  if (key === "") {
    mui.alert("你搜空？！", "提示");
    return;
  }
  //把value值存储到缓冲中
  var arr = getHistory();
  //如果数组中已经存在了这条记录，删除这条记录，把key存到第一条
  //如果数组的长度>=10,删除最后一条，把key存在第一条
  //把key存到第一条
  //获取key在arr中的索引,如果索引是-1，说明没有
  var index = arr.indexOf(key);
  if (index > -1) {
    //说明有
    arr.splice(index, 1);
  }
  //删除最后一条
  if (arr.length >= 10) {
    arr.pop();
  }
  //把key存到数组的第一条
  arr.unshift(key);
  //存储缓存中
  localStorage.setItem("lt_search_history", JSON.stringify(arr));
  // render();
  //页面跳转
  location.href = "searchList.html?key=" + key;
})
