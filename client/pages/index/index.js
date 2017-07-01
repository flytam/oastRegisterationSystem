//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    departmentArr:['请选择部门 ','计算机部','电子部','技术支持中心'],
    currentSelect:'',
    index:0,
    index2:0,
    sex:['请选择性别','男','女','其他'],
    inputInfo:{
      weixin_id:"",
      id:"",
      name:"",
      
    }
  },
  bindPickerChange: function(e){
    this.setData({
      index: e.detail.value
    });
  },
    bindPickerChange2: function(e){
    this.setData({
      index2: e.detail.value
    });
  },
  onLoad:  function() {
  },
  sendInfo: function() {
    console.log(this.data)
    wx.request({
      url:"http://localhost:3000/post",
      data:{

      },
      success:(res) =>{
        console.log(res);
      }
    })
  }
})
