//app.js
App({
  globalData: {},
  onLaunch: function () {
    wx.login({
      success: (res) => {
        //获取登陆的code存在全局种
        if (res.code) {
          wx.getUserInfo({
            success:  (res)=> {
              this.globalData.userInfo = res.userInfo;
              //console.log(this,res)
            }
          })
          wx.request({
            url: 'https://njuptdocker.cn/api/code2openid',
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            data: {
              code: res.code,
              test: 'xxx'
            },
            success: function (res) {
              if (res.data.status === 'ok') {
                try {
                  wx.setStorageSync('session', res.data.session)
                } catch (e) {
                  console.log(e)
                }
              } else {
                console.log(res.data.message);
              }
            }
          })
        }

      }
    })
  },
  globalData: {
    userInfo: null
  }
})