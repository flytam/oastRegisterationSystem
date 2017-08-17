//index.js 获取应用实例
const app = getApp()
Page({
  data: {
    departmentArr: [
      '请选择部门 ', '计算机部', '电子部', '技术支持中心'
    ],
    currentSelect: '',
    index: 0,
    index2: 0,
    sexs: [
      '  ', '男', '女', '其他'
    ],
    weixin_id: "",
    id: "",
    name: "",
    phone: "",
    department: "",
    email: "",
    sex: ""
  },
  onLoad: function () {},
  go: function () {
    wx.navigateTo({ //测试
      url: '../show/show?status=error&message=xxx'
    })
  },
  sendInfo: function () {
    //提交报名信息
    const {
      id, //学号
      department,
      name,
      sex,
      phone,
      email
    } = this.data;
    // console.log(this.data,getApp().globalData.code)
    wx.request({
      url: 'https://njuptdocker.cn/api/post',
      success: function (res) {
        if (res.data.status === 'ok') {
          wx.navigateTo({ //报名成功
            url: '../show/show?status=ok&message=ok'
          });
        }
        else {
          //报名失败
          wx.navigateTo({ //报名失败
            url: `../show/show?status=error&message=${res.data.message}`
          });
        }
      },
      method: 'POST',
      data: {
        id,
        department,
        name,
        sex,
        phone,
        email,
        session: wx.getStorageSync('session')
      },
      header: {
        'content-type': 'application/json'
      }
    })
  },
  getInfo: function(){
    wx.request({
      url: 'https://njuptdocker.cn/api/info',
      data:{
        session:wx.getStorageSync('session')
      },
      success: function(res){
        switch(res.data.status){
          case 'error':
          //错误
          wx.navigateTo({
            url:`../info/info?status=error`
          })
          break;
          case 'none':
          //未报名
          wx.navigateTo({
            url:`../info/info?status=none`
          })
          break;
          case 'ok':
          wx.navigateTo({
            //通过查询字符串传递报名信息
            url:`../info/info?status=ok&data=${JSON.stringify(res.data.data)}`
          })
          break;
          default:
          //返回错误状态
        }
      }
    })
  },
  getId: function (e) {
    this.setData({id: e.detail.value});
  },
  getName: function (e) {
    this.setData({name: e.detail.value})
  },
  getPhone: function (e) {
    this.setData({phone:e.detail.value});
  },
  getEmail: function (e) {
    this.setData({email: e.detail.value, emailError: false})
  },
  getSex: function (e) {
    this.setData({
      sex: this.data.sexs[Number.parseInt(e.detail.value, 10)],
      index2: e.detail.value
    });
  },
  getDepartment: function (e) {

    this.setData({
      department: this.data.departmentArr[Number.parseInt(e.detail.value, 10)],
      index: e.detail.value
    })
  }

})
