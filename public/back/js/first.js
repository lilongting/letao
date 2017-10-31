/**
 * Created by msi on 2017/10/31.
 */
$(function () {
  var currentPage = 1;
  var pageSize = 5;
  //一级分页
  function render() {
    $.ajax({
      type: 'get',
      url: "/category/queryTopCategoryPaging",
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
  $(".btn_add").on("click", function () {
    $("#addModal").modal("show");
  })
  //校验表单
  var $form = $("#form");
  // console.log($form);
  $form.bootstrapValidator({
    //校验时使用的图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      //name属性
      categoryName: {
        validators: {
          notEmpty: {
            message: "一级分类名称不能为空"
          }
        }
      }
    }
  });
  $form.on("success.form.bv", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $form.serialize(),
      success: function (data) {
        if (data.success) {
          $("#addModal").modal("hide");
          //重新渲染
          currentPage = 1;
          render();
          //重置表单
          $form.data("bootstrapValidator").resetForm();
          //表单有一个reset方法，会把表单中所有的值都清空,js对象的方法
          $form[0].reset();
        }
      }
    })
  })
});