// pages/runningRecord/runningRecord.js
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
    userInfo: {},
    openid: app.globalData.openid,
    dataList_test:
    [
      {startTime:"2020-12-24",distance:"1.5",totalTime:"12分15秒",ifPass:1},
      {startTime:"2020-12-23",distance:"1.2",totalTime:"9分15秒",ifPass:0},
      {startTime:"2020-12-22",distance:"0.9",totalTime:"6分15秒",ifPass:0}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('User').where({
      _openid: 'ofxEN4446kVhgv8tASapp2FgAmPo'
    })
    .get({
      success: function(res) {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data)
        this.setData(
          {
            dataList:res.data
          }
        )
      }
    })
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