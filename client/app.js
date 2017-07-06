//app.js
App({
  onLaunch: function () {
    wx.login({
      success: (res)=>{
        //获取登陆的code存在全局种
        this.globalData.code = res.code;
        console.log(res.code)
        
        let that = this;
        //初次登陆的时候检测是否提交了数据
        wx.request({
          url: 'https://njuptdocker.cn:8000/check',
          data: {
            code:that.globalData.code
          },
          method: 'GET',
          // header: {},
          success: function(res){
            // success
            if (res.hasPost === 'yes'){
              //之前已经提交过数据 跳转到数据展示页面
              that.globalData.hasPost = true;
              console.log('已经提交过了')
            }
            else {
              //之前还没有提交数据到 报名页面默认

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