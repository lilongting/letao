/**
 * Created by msi on 2017/10/29.
 */
$(function () {
  //初始化表单校验
  var $form = $('#form')
  $form.bootstrapValidator({
    //使用的图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //配置校验规则
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: "用户名不能为空"
          },
          callback: {
            message: "用户名错误"
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: "用户密码不能为空"
          },
          stringLength: {
            min: 6,
            max: 12,
            message: "用户密码必须是6-12位"
          },
          callback: {
            message: "用户密码错误"
          }
        }
      }
    }
  });
  //表单校验初始化后，就会有一个校验实例
  var validator =$form.data("bootstrapValidator");
  //注册校验成功事件
  $form.on("success.form.bv",function (e) {
    e.preventDefault();
    //发送ajax
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$form.serialize(),
      success:function (data) {
        if(data.success){
          location.href = "index.html"
        }else {
          if(data.error===1000){
            validator.updateStatus("username","INVALID","callback");
          }
          if(data.error===1001){
            validator.updateStatus("password","INVALID","callback")
          }
        }
      }
    })
  });
  //表单重置
  $("[type='reset']").on("click",function () {
      validator.resetForm();
  })
})