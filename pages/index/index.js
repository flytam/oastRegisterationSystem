//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    departmentArr:['请选择部门 ','计算机部','电子部','技术支持中心'],
    currentSelect:'',
    index:0
  },
  bindPickerChange: function(e){
    this.setData({
      index: e.detail.value
    });
  },
  onLoad:  ()=> {
  }
})
