/**
 * Created by msi on 2017/11/4.
 */
$(function () {
  // tools.checkLogin(data);
  //添加下拉刷新
  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper",
      down: {
        auto: true,
        callback: function () {
          //渲染
          $.ajax({
            type: "get",
            url: "/cart/queryCart",
            success: function (data) {
              console.log(data);
              setTimeout(function () {
                // console.log(data);
                tools.checkLogin(data);
                // setTimeout(function () {
                //   $("#OA_task_2").html(template("tpl", {data: data}));
                // },500)
                $("#OA_task_2").html(template("tpl", {data: data}));
                mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
              }, 1000);

            }
          });
        }
      }
    }
  });

//删除功能,ios上一个bug
  //mui禁用了click，需要使用tap
  $("#OA_task_2").on("tap", ".btn_delete", function () {
    var id = $(this).data("id");
    mui.confirm("您确定删除么？", "提示", ["否", "是"], function (e) {
      if (e.index === 0) {
        mui.toast("取消删除");
      } else {
        $.ajax({
          type: "get",
          url: "/cart/deleteCart",
          data: {
            id: [id]//后台规定必须是数组，否则报错
          },
          success: function (data) {
            tools.checkLogin(data);
            if (data.success) {
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
          }
        })
      }
    })
  });
  //编辑
  $("#OA_task_2").on("tap", ".btn_edit", function () {
    var data = this.dataset;
    var html = template("tpl2", data);
    //需要把html这个字符串中所有的\n全部替换掉.否则会装换成<br/>
    html = html.replace(/\n/g, "");
    //confirm
    mui.confirm(html,"编辑商品", ["确定", "取消"], function (e) {
      if (e.index === 0) {
        //修改
        $.ajax({
          type: "post",
          url: "/cart/updateCart",
          data: {
            id: data.id,
            size: $(".lt_edit_size span.now").html(),
            num: $(".mui-numbox-input").val()
          },
          success: function (data) {
            tools.checkLogin(data);
            if (data.success) {
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
          }
        });
      } else {
        mui.toast("取消编辑");
      }
    });
    //重新渲染mui数字框  给尺码注册点击事件
    mui(".mui-numbox").numbox();
    $(".lt_edit_size span").on("tap", function () {
      $(this).addClass("now").siblings().removeClass("now");
    })
  });
  //计算总金额
  $("#OA_task_2").on("change", ".ck", function () {
    var total = 0;
    $(":checked").each(function (i, e) {
      total += $(this).data("num") * $(this).data("price");
    });
    $(".lt_total span").html(total.toFixed(1));
  })
})