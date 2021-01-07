// pages/test/test.js

var app = getApp();
const DB = wx.cloud.database().collection("User")
const db = wx.cloud.database({
  env: 'ecnu-8gpse6bdd299c09f'
})
const _ = db.command


 var length=1
Page({
  /**
   * 页面的初始数据
   */
  data: {
    length:3
  },
sss:function(){
  if(length==1){
    console.log(length)
    length=2
this.setData({
  length:2
})
return
  }
  
if(length==2){
  console.log(length)
  length=3
  this.setData({
    length:3
  })
  return
}

if(length==3){
  console.log(length)
  length=1
  this.setData({
    length:1
  })
  return
}


},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   

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