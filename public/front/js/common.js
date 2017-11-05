/**
 * Created by msi on 2017/11/2.
 */
var tools = {
  getParamObj: function () {
    // location.search
    var obj = {};
    var search = location.search;
    search = search.slice(1);
    var arr = search.split("&");
    for (var i = 0; i < arr.length; i++) {
      var key = arr[i].split("=")[0];
      // decodeURI()转换成文字
      var value = decodeURI(arr[i].split("=")[1]);
      obj[key] = value;
    }
    return obj;
  },
  getParam: function (key) {
    return this.getParamObj()[key];
  },
  checkLogin: function (data) {
    if (data.error == 400) {
      location.href = "login.html?retUrl=" + location.href;
    }
  }
}