//app.js
App({
  onLaunch: function () {
    wx.login({
      success: (res)=>{
        //获取登陆的code存在全局种
        this.globalData.code = res.code;
        let that = this;
        wx.request({
          url: 'http://api.njuptdocker.cn:8080/post',
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            // success
            if (res.hasPost === 'yes'){
              //之前已经提交过数据 跳转到数据展示页面
              that.globalData.hasPost = true;
              console.log('已经提交过了')
            }
            else {
              //之前还没有提交数据到报名页面

            }
          },
          fail: function() {
            // fail 服务器错误
          },
        })
      }
    })
  },
  globalData:{
    code:"",
    hasPost:false
  }
})