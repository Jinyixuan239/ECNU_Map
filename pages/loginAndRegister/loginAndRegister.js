// pages/loginAndRegister/loginAndRegister.js
//获取应用实例
const app = getApp()
const appid = 'wx4d2d3d6b8ee499d6';
const app_secret = "f0e90ced3722ec951b69ea8b88fd8a06";
const url = "https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code";
const DB = wx.cloud.database().collection("User")
const db = wx.cloud.database({
  env: '  ecnu-8gpse6bdd299c09f'
})
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: '欢迎使用ECNU课外运动打卡小程序',
    userInfo: {},
    openid: '',
  },
  //事件处理函数

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  },

  getUserInfo: function (e) {
    var openid
    console.log(e.detail.errMsg)
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    console.log(app)
    if (e.detail.errMsg == "getUserInfo:ok") {
      wx.login({
        success: wx.cloud.callFunction({
          name: 'getOpenid',
          complete: res => {
            // console.log('openid--',res)
            openid = res.result.openid
            // console.log(res.result.openid)
            // console.log(res)
            app.globalData.userInfo = e.detail.userInfo
            app.globalData.openid =res.result.openid
            console.log(app)
            DB.where({
              _openid:openid
              // _openid: "openid"
            }).get({
              success(res) {
                // console.log(res)
                // if (res.data[0]&&(!res.data[1])) {
                if (res.data[0]) {
                  wx.cloud.database().collection('User').where({
                    _openid:openid
                  }).update({
                    data:{
                      nickName: app.globalData.userInfo.nickName,
                      avatarUrl: app.globalData.userInfo.avatarUrl
                    },
                    success(res) {
                      console.log("更新成功")
                      // user={openid:openid,nickName:app.globalData.userInfo.nickName,avatarUrl:app.globalData.userInfo.avatarUrl}
                      // wx.setStorageSync('user', user)
                      wx.navigateTo({
                        url: "/pages/test/test"
                      })
                    }
                  })
                }
                else{
                  wx.cloud.database().collection('User').add({
                    data: {
                      openid: openid,
                      nickName: app.globalData.userInfo.nickName,
                      avatarUrl: app.globalData.userInfo.avatarUrl
                    },
                    success(res) {
                      console.log("注册成功")
                      user={openid:openid,nickName:app.globalData.userInfo.nickName,avatarUrl:app.globalData.userInfo.avatarUrl}
                      wx.setStorageSync('user', user)
                      wx.navigateTo({
                        url: "/pages/test/test"
                      })
                    }
                  })
                }
              },
              fail(res) {
              }
            })
          }
        })
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '需要成功授权才能使用',
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})