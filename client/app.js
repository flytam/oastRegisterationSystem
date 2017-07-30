//app.js
App({
  onLaunch: function () {
    wx.login({
      success: (res)=>{
        //获取登陆的code存在全局种
        this.globalData.code = res.code;
        //console.log(res.code)
        
        let that = this;
        //初次登陆的时候检测是否提交了数据

        /*************/
        /****************/

      }
    })
  },
  globalData:{
    code:"",
    hasPost:false
  }
})