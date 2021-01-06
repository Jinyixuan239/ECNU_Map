// 全局命令
const DB=wx.cloud.database().collection("User")
const db=wx.cloud.database({
  env:' ecnu-8gpse6bdd299c09f'
});
const _=db.command;
var app=getApp();
// 全局变量
var locations;

var point=[];
var that2;
var lat,long,lat0,long0;
var i=0,j=0;
var s;
var path0="cloud://ecnu-8gpse6bdd299c09f.6563-ecnu-8gpse6bdd299c09f-1304551843/checked.png";


function drawline(){
  that2.setData({
    polyline:[{
      points:point,
      color:'#ff0000',
      width:4,
      dottedLine:false
    }]
  });
}
function getlocation(){
    /*lat=lat+0.000005;
    long=long+0.000005;
    point.push({latitude:lat,longitude:long});//测试代码*/
    
  wx.getLocation({
    type:'gcj02',
    success: function(res){
      lat=res.latitude;
      long=res.longitude;
      point.push({latitude:lat,longitude:long});
      console.log(point);
    }
  })
}
function Rad(d){
  return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
}

function totalDistance(lat1,lng1,lat2,lng2){

  var radLat1 = Rad(lat1);
  var radLat2 = Rad(lat2);
  var a = radLat1 - radLat2;
  var  b = Rad(lng1) - Rad(lng2);
  s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
  Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
  s = s *6378.137 ;// 地球半径
  s = Math.round(s * 10000) / 10000; //输出为公里
  //s=s.toFixed(2);
  that2.setData({
    distance:s
  })
}
function getdistance(lat1,lng1,lat2,lng2){
  var radLat1 = Rad(lat1);
  var radLat2 = Rad(lat2);
  var a = radLat1 - radLat2;
  var  b = Rad(lng1) - Rad(lng2);
  s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
  Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
  s = s *6378.137 ;// 地球半径
  s = Math.round(s * 10000) / 10000; //输出为公里
  //s=s.toFixed(2);
  return s;
}

  function settime(){  // 设置跑步时间
    var second = that2.data.second;
    var minute = that2.data.minute;
    var hours = that2.data.hours ;
    second++;
    if (second >= 60) {
        second = 0 ;
        minute++;
        if (minute >= 60) {
            minute = 0;
            hours++;
            if (hours < 10) {
                that2.setData({
                    hours: '0' + hours
                })
            } else {
                that2.setData({
                    hours: hours
                })
            }
        }
        if (minute < 10) {
            that2.setData({
                minute: '0' + minute
            })
        } else {
            that2.setData({
                minute: minute
            })
        }
    }
    if (second < 10) {
        that2.setData({
            second: '0' + second
        })
    } else {
        that2.setData({
            second: second
        })
    }
}
function getspeed(){
  var speed;
  var second = that2.data.second;
  var minute = that2.data.minute;
  var hours = that2.data.hours;
  var s=that2.data.distance;
  var time=hours+minute/60+second/3600;
  speed=s/time;
  that2.setData({
    speed:speed
  })
}
Page({
  // 页面初始化
  data: {
    markers: [
      // {
      //   id: 0,
      //   iconPath: "../../image/noicon.png",
      //   latitude: 31.234531,
      //   longitude: 121.412425,
      //   width: 32,
      //   height: 32
      // },
      // //位置1
      // {
      //   id: 1,
      //   iconPath: "../../image/noicon.png",
      //   latitude: 31.234172,
      //   longitude: 121.413485,
      //   width: 32,
      //   height: 32
      // },
      // //位置2
      // {
      //   id: 2,
      //   iconPath:  "../../image/noicon.png",
      //   latitude: 31.233091,
      //   longitude: 121.413279,
      //   width: 32,
      //   height: 32
      // },
      // //位置3
      // {
      //   id: 3,
      //   iconPath:  "../../image/yesicon.png",
      //   latitude: 31.232837,
      //   longitude: 121.412331,
      //   width: 32,
      //   height: 32
      // },
    ],
    latitude: '',
    longitude: '',
//跑步信息
    polyline:[],
    speed:'0'+0,
    distance:'0'+0,
    hours: '0' + 0,
    minute: '0' + 0,
    second: '0' + 0

  },
  onLoad: function () {
   
    var that = this;
    DB.where({
      _id: "a8831daa5fdc64f4001fb7b95c6a9395"
    }).get({
      success(res) {
        console.log(res.data[0].location[0][1])
        //let that = this
        locations=res.data[0].location
        app.globalData.locations=locations   
        that2.setData({
          markers:[
      {
        id: 0,
        iconPath: '../../image/unchecked.png',
        latitude: locations[0][0],
        
        longitude: locations[0][1],
        width: 32,
        height: 32
      },
      //位置1
      {
        id: 1,
        // iconPath: '../../image/unchecked.png',
        // latitude: locations[1][1],
        // longitude: locations[1][0],
        width: 32,
        height: 32
      },
      //位置2
      {
        id: 2,
        iconPath:  '../../image/unchecked.png',
        latitude: locations[2][1],
        longitude: locations[2][0],
        width: 32,
        height: 32
      },
      //位置3
      {
        id: 3,
        iconPath:  '../../image/unchecked.png',
        latitude: locations[3][1],
        longitude: locations[3][0],
        width: 32,
        height: 32
      },
          ]
        })
        console.log(app.globalData.locations);
      }
    })
     
   
    wx.getLocation({
      type:'gcj02',
      success: function(res){
        lat=res.latitude;
        lat0=res.latitude;
        long=res.longitude;
        long0=res.longitude;

        point.push({latitude:lat,longitude:long});
        that.setData({
          latitude:res.latitude,
          longitude:res.longitude,
        })
      }
    });
  },



  start: function(){
    that2=this;
    var markers=that2.data.markers;
    this.timer=setInterval(repeat,1000);

    function repeat(){
      i++;
      //console.log(point[i-1].latitude);
      getlocation();
      drawline();
      totalDistance(lat0,long0,point[i-1].latitude,point[i-1].longitude);
      settime();
      getspeed();
      //var r1=getdistance(lat0+0.0001,long0+0.0001,point[i-1].latitude,point[i-1].longitude);//测试代码
      var r1=getdistance(markers[0].latitude,markers[0].longitude,point[i-1].latitude,point[i-1].longitude);
      if(r1<0.005)
      {
         console.log('yes');
         markers[0].iconPath="../../image/yesicon.png";
         var path1=markers[0].iconPath;
         var path2=markers[1].iconPath;
         var path3=markers[2].iconPath;
         var path4=markers[3].iconPath;
         console.log(markers[0]);
         that2.setData({
           markers:[
            {
              id: 0,
              iconPath: path1,
              latitude: 31.234531,
              longitude: 121.412425,
              width: 32,
              height: 32
            },
            //位置1
            {
              id: 1,
              iconPath: path2,
              latitude: 31.234172,
              longitude: 121.413485,
              width: 32,
              height: 32
            },
            //位置2
            {
              id: 2,
              iconPath:  path3,
              latitude: 31.233091,
              longitude: 121.413279,
              width: 32,
              height: 32
            },
            //位置3
            {
              id: 3,
              iconPath:  path4,
              latitude: 31.232837,
              longitude: 121.412331,
              width: 32,
              height: 32
            },
           ]
         })
      }
      var r2=getdistance(markers[1].latitude,markers[1].longitude,point[i-1].latitude,point[i-1].longitude);
      if(r2<0.005)
      {
         console.log('yes');
         markers[1].iconPath="../../image/yesicon.png";
         var path1=markers[0].iconPath;
         var path2=markers[1].iconPath;
         var path3=markers[2].iconPath;
         var path4=markers[3].iconPath;
         console.log(markers[0]);
         that2.setData({
           markers:[
            {
              id: 0,
              iconPath: path1,
              latitude: 31.234531,
              longitude: 121.412425,
              width: 32,
              height: 32
            },
            //位置1
            {
              id: 1,
              iconPath: path2,
              latitude: 31.234172,
              longitude: 121.413485,
              width: 32,
              height: 32
            },
            //位置2
            {
              id: 2,
              iconPath:  path3,
              latitude: 31.233091,
              longitude: 121.413279,
              width: 32,
              height: 32
            },
            //位置3
            {
              id: 3,
              iconPath:  path4,
              latitude: 31.232837,
              longitude: 121.412331,
              width: 32,
              height: 32
            },
           ]
         })
      }
      var r3=getdistance(markers[2].latitude,markers[2].longitude,point[i-1].latitude,point[i-1].longitude);
      if(r3<0.005)
      {
         console.log('yes');
         markers[2].iconPath="../../image/yesicon.png";
         var path1=markers[0].iconPath;
         var path2=markers[1].iconPath;
         var path3=markers[2].iconPath;
         var path4=markers[3].iconPath;
         console.log(markers[0]);
         that2.setData({
           markers:[
            {
              id: 0,
              iconPath: path1,
              latitude: 31.234531,
              longitude: 121.412425,
              width: 32,
              height: 32
            },
            //位置1
            {
              id: 1,
              iconPath: path2,
              latitude: 31.234172,
              longitude: 121.413485,
              width: 32,
              height: 32
            },
            //位置2
            {
              id: 2,
              iconPath:  path3,
              latitude: 31.233091,
              longitude: 121.413279,
              width: 32,
              height: 32
            },
            //位置3
            {
              id: 3,
              iconPath:  path4,
              latitude: 31.232837,
              longitude: 121.412331,
              width: 32,
              height: 32
            },
           ]
         })
      }
      var r4=getdistance(markers[3].latitude,markers[3].longitude,point[i-1].latitude,point[i-1].longitude);
      if(r4<0.005)
      {
         console.log('yes');
         markers[3].iconPath="../../image/yesicon.png";
         var path1=markers[0].iconPath;
         var path2=markers[1].iconPath;
         var path3=markers[2].iconPath;
         var path4=markers[3].iconPath;
         console.log(markers[0]);
         that2.setData({
           markers:[
            {
              id: 0,
              iconPath: path1,
              latitude: 31.234531,
              longitude: 121.412425,
              width: 32,
              height: 32
            },
            //位置1
            {
              id: 1,
              iconPath: path2,
              latitude: 31.234172,
              longitude: 121.413485,
              width: 32,
              height: 32
            },
            //位置2
            {
              id: 2,
              iconPath:  path3,
              latitude: 31.233091,
              longitude: 121.413279,
              width: 32,
              height: 32
            },
            //位置3
            {
              id: 3,
              iconPath:  path4,
              latitude: 31.232837,
              longitude: 121.412331,
              width: 32,
              height: 32
            },
           ]
         })
      }
      }
  },

  end: function(){
    console.log('end');
    clearInterval(this.timer);
  }
})