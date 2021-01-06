// pages/home/home.js

var app = getApp();
const DB = wx.cloud.database().collection("User")
const db = wx.cloud.database({
  env: ' ecnu-8gpse6bdd299c09f'
})
const _ = db.command
var locations
Page({
  go_runningRecord: function () {
    wx.navigateTo({
      url: "/pages/runningRecord/runningRecord"
    })
  },
  go_running: function () {
    console.log("跑步")
    DB.where({
      _id: "a8831daa5fdc64f4001fb7b95c6a9395"
    }).get({
      success(res) {
        // console.log(res.data[0].location)
        let that = this
        locations=res.data[0].location
        app.globalData.locations=locations
        wx.navigateTo({
          url: "/pages/running/running"
        })    
      }
    })
    
  },
  chek: function () {
    
  },
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '',
    nickName: '',
    location: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    this.setData({
      avatarUrl: app.globalData.userInfo.avatarUrl,
      nickName: app.globalData.userInfo.nickName
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