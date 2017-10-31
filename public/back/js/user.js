/**
 * Created by msi on 2017/10/30.
 */
$(function () {
  var currentPage = 1;
  var pageSize = 8;

  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (data) {
        // console.log(data);
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
  //点击启用或禁用
  //因为按钮动态创建出来的，需要委托事件
  $("tbody").on("click", ".btn", function () {
    $("#userModal").modal("show");
    var id = $(this).parent().data("id")
    var isDelete = $(this).parent().data("isDelete");
    isDelete = isDelete === 1 ? 0 : 1;
    //禁用或启用此用户 .off()清除之前的事件避免重复事件
    $(".btn_confirm").off().on("click",function () {
      $.ajax({
        type:"post",
        url:"/user/updateUser",
        data:{
          id:id,
          isDelete:isDelete
        },
        success:function (data) {
          if(data.success){
            $("#userModal").modal("hide");
            render();
          }
        }
      })
    })
  })
});