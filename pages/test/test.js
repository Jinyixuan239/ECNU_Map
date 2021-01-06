var app = getApp();
const DB = wx.cloud.database().collection("User")
const db = wx.cloud.database({
  env: 'ecnu-8gpse6bdd299c09f'
})
const _ = db.command

// Page({
//   data: {

//   },

//   onLoad: function (options) {
// console.log(app.globalData.userInfo.avatarUrl)
//   },


// })
var app = getApp();
Page({
    onLoad: function() {
        console.log("test");
        console.log(app);
    }
})