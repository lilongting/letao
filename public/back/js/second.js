/**
 * Created by msi on 2017/10/31.
 */
$(function () {
  var currentPage = 1;
  var pageSize = 5;
  //二级分页
  function render() {
    $.ajax({
      type: 'get',
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (data) {
        // console.log(data);
        $("tbody").html(template("tpl", data));
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil(data.total / pageSize),
          size: "small",
          onPageClicked(event, originalEvent, type, page){
            currentPage = page;
            render();
          }
        });
      }
    })
  }

  render();

  //显示模态框
  $(".btn_add").on('click', function () {
    $("#addModal").modal("show");
    //渲染下拉框
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (data) {
        // console.log(data);
        $(".dropdown-menu").html(template("tpl2", data));
      }
    });
  });

  //点击下拉框，让其选中
  $(".dropdown-menu").on('click', 'a', function () {
    //获取当前a标签内容，赋值给dropdown-text
    $(".dropdown-text").text($(this).text());
    //修改隐藏域value
    $("#categoryId").val($(this).data("id"));
    //让categoryId通过验证
    $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");
  })
  //初始上传文件
  $("#fileupload").fileupload({
    dataType: "json",
    //上传成功时，执行回调函数
    done: function (e, data) {
      console.log(data);
      $(".img_box img").attr("src", data.result.picAddr);
      $("#brandLogo").val(data.result.picAddr);
      $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  });
  //表单校验
  $form = $("#form");
  $form.bootstrapValidator({
    //取消默认不校验
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传图片"
          }
        }
      }
    }
  });
  $form.on("success.form.bv", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/category/addSecondCategory",
      data: $form.serialize(),
      success: function (data) {
        if (data.success) {
          $("#addModal").modal("hide");
          currentPage = 1;
          render();
          //重置表单
          $form[0].reset();
          $form.data("bootstrapValidator").resetForm();
          $(".dropdown-text").text("请选择一级分类");
          $(".img_box img").attr("src", "images/none.png");
        }
      },
      // error:function (data) {
      //   console.log(data);
      // }
    })
  })
});