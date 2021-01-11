// pages/runningRecordDetails/runningRecordDetails.js
const db = wx.cloud.database()
const _ = db.command
const app = getApp()
const appid = 'wx4d2d3d6b8ee499d6';
const app_secret = "f0e90ced3722ec951b69ea8b88fd8a06";
const url = "https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code";
var point=[];
var that;

function drawline(){
  console.log('draw')
  that.setData({
    polyline:[{
      points:point,
      color:'#ff0000',
      width:4,
      dottedLine:false
    }]
  });
  var poly=that.data.polyline;
  console.log(poly)
}

Page({
  // 页面初始化
  data: {
  //跑步信息
    running:{},
    polyline:[],
    latitude: '31.227977',
    longitude: '121.405814',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this
    var polyline=that.data.polyline;
    // console.log('1')
    let running_id = wx.getStorageSync("running_id")
    db.collection('record').where({
      _id:running_id
    }).get({
      success: function(res) {
        // res.data 包含该记录的数据
        point=res.data[0].point;
        console.log(point);
        that.setData({
          running:res.data[0]
        })
        drawline();
        console.log('poly:'+polyline)
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