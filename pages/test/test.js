// pages/test/test.js

var app = getApp();
const DB = wx.cloud.database().collection("User")
const db = wx.cloud.database({
  env: 'ecnu-8gpse6bdd299c09f'
})
const _ = db.command

Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showActionSheet({
      itemList: ['惯用左手', '惯用右手'],
      success(res) {
        // console.log(res.tapIndex)
      },
      fail(res) {
        wx.navigateBack({
          url: "/pages/home/home"
        })
      }
    })
    DB.where({
      _id: app.globalData.openid
    }).get({
      success(res) {
// console.log(res)
      }}),

    wx.cloud.database().collection('User').where(


    ).add({
      data: {
        topSpeed: "5:00",
        bottomSpeed:"10:00",
        averageSpeed:"7:50",
        path:[],
        start_end_Time:["12-01-7:00","7:15"],
        runningTime:1800,
        finished:true,
        ended:true
      },
      success(res) {}
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