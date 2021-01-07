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
var path_bi="../../image/bijingdian.png";
var path_tu="../../image/meijingdian.png";
var that2;
var lat,long,lat0,long0;
var i=0,j=0;
var s;
var maxspeed=0;
var sum_must=0,sum_via=0;
var k;
var lat_=[],lng_=[];

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
    lat=lat-0.000005;
    long=long+0.000005;
    point.push({latitude:lat,longitude:long});//测试代码
    
  // wx.getLocation({
  //   type:'gcj02',
  //   success: function(res){
  //     lat=res.latitude;
  //     long=res.longitude;
  //     point.push({latitude:lat,longitude:long});
  //     console.log(point);
  //   }
  // })
}

function Rad(d){
  return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
}

function totalDistance(lat1,lng1,lat2,lng2){

  var last=that2.data.s;
  that2.setData({
    lastdistance:last
  });
  var radLat1 = Rad(lat1);
  var radLat2 = Rad(lat2);
  var a = radLat1 - radLat2;
  var  b = Rad(lng1) - Rad(lng2);
  s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
  Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
  s = s *6378.137 ;// 地球半径
  s = Math.round(s * 10000) / 10000; //输出为公里
  var s_=s.toFixed(3);
  that2.setData({
    distance:s_,
    s:s
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
  // var second = that2.data.second;
  // var minute = that2.data.minute;
  // var hours = that2.data.hours;
  var s1=that2.data.s;
  var s2=that2.data.lastdistance;
  var s=s1-s2;
  //var time=hours+minute/60+second/3600;
  var time=1/3600;
  speed=s/time;
  var pace,pace_min,pace_sec;
  if(speed==0) pace=0;
  else pace=1/speed;
  pace_min=Math.floor(pace*60);
  pace_sec=((pace*60-pace_min).toFixed(2))*100
  speed=speed.toFixed(2);
  that2.setData({
    speed:speed,
    pace_min:pace_min,
    pace_sec:pace_sec
  })
}
function getmaxspeed(){

  var speed=that2.data.speed;
  if(maxspeed<speed) maxspeed=speed;
  maxspeed=maxspeed*1000/3600
  that2.setData({
    maxspeed:maxspeed+'m/s'
  })
}
function IfPass(){
  var second = that2.data.second;
  var minute = that2.data.minute;
  var hours = that2.data.hours;
  var maxspeed=that2.data.maxspeed;
  var distance=that2.data.distance;
  var pace_min=that2.data.pace_min;
  var pace_sec=that2.data.pace_sec;
  var pace=pace_min+pace_sec/60;
  var time=hours+minute/60+second/3600;
  if(sum_must>=1&&sum_via>=2&&time<=0.25&&distance>=1.5&&pace<10){
    //console.log('222')
    that2.setData({
      ifpass:'达标'
    })
  }
}


Page({
  // 页面初始化
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    mHidden:true,
    isright:0,
    notstart:1,
  //跑步信息
    polyline:[],
    speed:'0'+0,
    pace_min:'0'+0,
    pace_sec:'0'+0,
    maxspeed:'0'+0+'m/s',
    s:'0'+0,
    distance:'0'+0,
    lastdistance:'0'+0,
    hours: '0' + 0,
    minute: '0' + 0,
    second: '0' + 0,
    start_time:'0'+0,
    ifpass:'未达标'
  },

  changeModel: function(){
    this.setData({
      mHidden:true
    })
  },
  modelCancel: function(){
    this.setData({
      mHidden:true
    });
  },

  onLoad: function () {
   
    var that = this;
    DB.where({
      _id: "a8831daa5fdc64f4001fb7b95c6a9395"
    }).get({
      success(res) {
        console.log(res.data[0].location[0][1])
        //let that = this
        var l=0,a=0
        locations=res.data[0].location
        app.globalData.locations=locations   
        k=Math.floor(Math.random()*7)
        var k_=Math.floor(Math.random()*7);
        if(k==k_) k_=Math.floor(Math.random()*7);
        console.log(k)
        console.log(k_)
        var path=[];
        //
        for(l=0;l<7;l++)
        {
          if(l==k||l==k_) path[l]=path_bi;
          else path[l]=path_tu;
        }
        var k1=[];
        k1[0]=Math.floor(Math.random()*29);
        for(var b=1;b<7;b++)
        {
          var radm=Math.floor(Math.random()*29);
          if(radm==k1[b-1])
          {
            b--;continue;
          }
          else k1[b]=radm;
        }
        for(a=0;a<7;a++)
        {
         
          lat_[a]=locations[k1[a]][0];
          lng_[a]=locations[k1[a]][1];
        }


        console.log(k1);
        console.log(lat_)
        that.setData({
          markers:[
      //位置1      
      {
        id: 0,
        iconPath: path[0],
        latitude: lat_[0],
        longitude: lng_[0],
        width: 22.36,
        height: 29.8
      },
      //位置2
      {
        id: 1,
        iconPath: path[1],
        latitude: lat_[1],
        longitude: lng_[1],
        width: 22.36,
        height: 29.8
      },
      //位置3
      {
        id: 2,
        iconPath:  path[2],
        latitude: lat_[2],
        longitude: lng_[2],
        width: 22.36,
        height: 29.8
      },
      //位置4
      {
        id: 3,
        iconPath: path[3],
        latitude: lat_[3],
        longitude: lng_[3],
        width: 22.36,
        height: 29.8
      },
      //位置5
      {
        id: 4,
        iconPath: path[4],
        latitude: lat_[4],
        longitude: lng_[4],
        width: 22.36,
        height: 29.8
      },
      //位置6
      {
        id: 5,
        iconPath: path[5],
        latitude: lat_[5],
        longitude: lng_[5],
        width: 22.36,
        height: 29.8
      },
      //位置7
      {
        id: 6,
        iconPath: path[6],
        latitude: lat_[6],
        longitude: lng_[6],
        width: 22.36,
        height: 29.8
      }
          ]
        })
        //console.log(app.globalData.locations);
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

     wx.showActionSheet({
            itemList: ['惯用左手', '惯用右手'],
            success (res) {
              console.log(res.tapIndex)
              that.setData({
                isright: res.tapIndex
              })
            },
            fail (res) {
              wx.navigateBack({
                url: "/pages/home/home"
              })
            }
          })
  },

  start: function(){
    that2=this;
    j++;
    var notstart=that2.data.notstart;
    if(notstart==1){
    that2.setData({
      notstart:0
    })
    if(j==1){
      var TIME=String(new Date());
      that2.setData({
        start_time:TIME
      })
    }
    var markers=that2.data.markers;
    this.timer=setInterval(repeat,1000);

    function repeat(){
      i++;
      var r=[];
      //console.log(point[i-1].latitude);
      getlocation();
      drawline();
      totalDistance(lat0,long0,point[i-1].latitude,point[i-1].longitude);
      settime();
      getspeed();
      getmaxspeed();
      IfPass();
      var r1=getdistance(lat0+0.0001,long0+0.0001,point[i-1].latitude,point[i-1].longitude);//测试代码
      //var r1=getdistance(markers[0].latitude,markers[0].longitude,point[i-1].latitude,point[i-1].longitude);

      for(var p=0;p<6;p++)
      {
        r[p]=getdistance(markers[p].latitude,markers[p].longitude,point[i-1].latitude,point[i-1].longitude);
      }
      
      for(var q=0;q<6;q++)
      {
        if(r[q]<5)
        {
          wx.vibrateShort();
          console.log('yes');
          if(k==q){markers[q].iconPath="../../image//bichecked.png";sum_must++;}
          else{ markers[q].iconPath="../../image/tuchecked.png";sum_via++;}
          var path1=markers[0].iconPath;
          var path2=markers[1].iconPath;
          var path3=markers[2].iconPath;
          var path4=markers[3].iconPath;
          var path5=markers[4].iconPath;
          var path6=markers[5].iconPath;
          var path7=markers[6].iconPath;
          console.log(markers[0]);
          that2.setData({
            markers:[
             //位置1
             {
               id: 0,
               iconPath: path1,
               latitude: lat_[0],
               longitude: lng_[0],
               width: 22.36,
               height: 29.8
             },
             //位置2
             {
               id: 1,
               iconPath: path2,
               latitude: lat_[1],
               longitude: lng_[1],
               width: 22.36,
               height: 29.8
             },
             //位置3
             {
               id: 2,
               iconPath:  path3,
               latitude: lat_[2],
               longitude: lng_[2],
               width: 22.36,
               height: 29.8
             },
             //位置4
             {
               id: 3,
               iconPath:  path4,
               latitude: lat_[3],
               longitude: lng_[3],
               width: 22.36,
               height: 29.8
             },
             //位置5
             {
               id: 4,
               iconPath:  path5,
               latitude: lat_[4],
               longitude: lng_[4],
               width: 22.36,
               height: 29.8
             },
             //位置6
             {
               id: 5,
               iconPath:  path6,
               latitude: lat_[5],
               longitude: lng_[5],
               width: 22.36,
               height: 29.8
             },
             //位置7
             {
               id: 6,
               iconPath:  path7,
               latitude: lat_[6],
               longitude: lng_[6],
               width: 22.36,
               height: 29.8
             },
            ]
          })
        }
      }
      }
    }
    else{
      console.log('stop');
      clearInterval(this.timer);
      that2.setData({
        notstart:1
      })
    }
  },

  end: function(){
    console.log('end');
    clearInterval(this.timer);
    this.setData({
      mHidden:false
    })
    wx.navigateTo({
      url:  "pages/runningRecord/runningRecord"
    })
    wx.cloud.database().collection('record').
    add({
      data:{
        datetime:that2.data.start_time,
        distance:that2.data.distance,
        run_time_minute:that2.data.minute,
        run_time_sec:that2.data.second,
        pace_min:that2.data.pace_min,
        pace_sec:that2.data.pace_sec,
        finish:that2.data.ifpass,
        point:point
      },
    });
  }
})