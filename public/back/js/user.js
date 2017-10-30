/**
 * Created by msi on 2017/10/30.
 */
$(function () {
  var currentPage = 1;
  var pageSize = 16;

  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (data) {
        console.log(data);
        var html = template("tpl", data)
        $("tbody").html(html);
        //分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,//bootstrap版本
          currentPage: currentPage,//指定当前是第几页
          size: "small",
          totalPages: Math.ceil(data.total / pageSize),
          onPageClicked: function (event, originalEvent, type, page) {
            currentPage = page;
            render();
          }
        });
      }
    });
  }
  render();
});