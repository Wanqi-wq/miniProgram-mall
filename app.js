//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs) 
    
    //从缓存中取出token，判断token是否存在
   const token = wx.getStorageSync('token')
    if (token && token.length > 0) {
      //如果token存在，判断token是否过期
      this._checkToken(token)
    }else{
      //如果token不存在，执行登录
      this._login()
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  _checkToken(token){
    wx.request({
      url: 'http://123.207.32.32:3000/auth',
      method: 'post',
      header: {
        token
      },
      success: (res) => {
        //如果token有效
        if (!res.data.errcode) {
          this.globalData.token = token
         
        }else {
          //如果无效，则重新登录
          this._login()
        } 
      }
    })
  },
  _login() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        const code = res.code
        wx.request({
          url: 'http://123.207.32.32:3000/login',
          method: 'post',
          data:{
            code
          },
          success: (res) => {
            //获取token
            const token = res.data.token;
            this.globalData.token = token;
            //将token储存在storage中
            wx.setStorageSync('token', token)
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    token:'',
    cart: wx.getStorageSync('cart') || [],
    checkAll: true
  }
})