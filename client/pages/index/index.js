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
      '请选择性别', '男', '女', '其他'
    ],
    weixin_id: "",
    id: "",
    name: "",
    phone: "",
    department: "",
    email: "",
    sex: "",
    phoneError: false,
    emailError: false
  },
  onLoad: function () {},
  sendInfo: function () {
    const {
      id,
      department,
      name,
      sex,
      phone,
      email
    } = this.data;
    if (!this.data.phoneError && !this.data.emailError) {

      // 判断下全部正确填写才能提交
      wx.request({
        url: 'https://njuptdocker.cn:8888/post',
        success: function (res) {
          console.log(res.data);
        },
        method: 'POST',
        data: {
          id,
          department,
          name,
          sex,
          phone,
          email
        },
        header: {
          'content-type': 'application/json'
        }
      })
    } else {
      return;
    }

  },
  getId: function (e) {
    this.setData({id: e.detail.value});
  },
  getName: function (e) {
    this.setData({name: e.detail.value})
  },
  getPhone: function (e) {
    if (!(/^1[34578]\d{9}$/.test(e.detail.value))) {
      //格式错误
      this.setData({phoneError: true});
    } else {
      this.setData({phone: e.detail.value, phoneError: false});
    }
  },
  getEmail: function (e) {
    if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(e.detail.value)) {
      this.setData({email: e.detail.value, emailError: false})
    } else {
      //格式错误
      this.setData({emailError: true})
    }
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
