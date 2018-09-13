// index.js
var util = require("../../utils/util.js"); 

// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../map/bmap-wx.min.js');
var wxMarkerData = [];

Page({
  data: {

    // markers: [],
    // latitude: '31.059351',
    // longitude: '121.243908',
    // placeData: {},
    type:'',
    hotList: [],
    houTypeList: [],
    loadingSta: true,
    recommendList: [],
    reList: [],
    num: 1,
    detail: {
      hou_id: '',
      hou_names: '',
      hou_pirce: '',
      hou_opentime: '',
      hou_br: '',
      hou_address: '',
      hou_mobile: '',
    },
    imgUrls: [],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 700,
    current: 1,
    markers: [{
      // iconPath: "/image/b.png",
      id: 0,
      latitude: 31.059351,
      longitude: 121.243908,
      width: 18,
      height: 35
    }],
  },
  index(e) {
    this.setData({
      current: e.detail.current + 1
    })
  },
  tanc() {
    wx.showModal({
      title: '友情提示',
      showCancel: false,
      content: '下载《贵上房》官方APP可享受此功能',
      // success: function (res) {
      //   if (res.confirm) {
      //     console.log('用户点击确定')
      //   } else if (res.cancel) {
      //     console.log('用户点击取消')
      //   }
      // }
    })
  },

  regionchange(e) {
    // console.log(e.type)
  },
  markertap(e) {
    // console.log(e.markerId)
  },
  controltap(e) {
    // console.log(e.controlId)
  },

  
  onLoad(options) {
    this.setData({
      type: options.type
    })
    wx.showLoading({
      title: '加载中',
    })
    this.recommend(1);
    this.detail(options.hou_id, options.type);
  },

  //地图
  maps(){
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'RqhyfBAvoUGY1HX2x7BRFmX1LYZGRcd8'
    });
    var fail = function (data) {
    };
    
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
    }

    // 发起POI检索请求 
    BMap.search({
      "query": '公交',
      location: String(that.data.markers[0].latitude + ',' + that.data.markers[0].longitude),
      width: 18,
      height: 25,
      fail: fail,
      success: success,
      // 此处需要在相应路径放置图片文件 
      iconPath: '/image/b-a.png',
      // 此处需要在相应路径放置图片文件 
      iconTapPath: '/image/b.png'
    }); 
  },

  //预览图片
  viewImg(e) {
    let v = this;
    wx.previewImage({
      current: e.currentTarget.dataset.alphaBeta,
      urls: v.data.imgUrls
    })
  },

  //调取呼叫电话接口
  phone() {
    let v = this;
    wx.makePhoneCall({
      phoneNumber: String(v.data.detail.hou_mobile) //仅为示例，并非真实的电话号码
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    let v = this;
    return {
      title: '贵上房：' + v.data.detail.names,
      path: 'pages/housesDetail/housesDetail?hou_id=' + v.options.id
    }
  },

  //为你推荐下拉加载
  onReachBottom() {
    let v = this;
    // v.data.num += 1;
    // v.setData({
    //   loadingSta: true
    // })
    // setTimeout(function() {
    //   v.recommend(v.data.num);
    // }, 200)
  },

  //下拉刷新
  onPullDownRefresh: function() {
    let v = this;

    this.setData({
      recommendList: [],
      reList: [],
    })
    this.recommend(1)
    this.detail(v.options.hou_id);


  },

  //为你推荐列表
  recommend(num) {
    let v = this;
    wx.request({
      url: 'https://app.gsfzd.com/houses/details/recommend',
      method: 'POST',
      data: {
        page: num,
        num: 10
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        let data = res.data.data;
        for (var i = 0; i < data.length; i++) {
          data[i].hou_pic = JSON.parse(data[i].hou_pic);
          v.data.reList.push(data[i])
        }
        v.setData({
          recommendList: v.data.reList
        })
        v.setData({
          loadingSta: false
        })
      }
    })
  },

  //获取楼盘详情
  detail(hou_id, type1) {
    let v = this;
    wx.request({
      url: 'https://app.gsfzd.com/houses/details/details',
      method: 'POST',
      data: {
        type: type1,
        detail: hou_id
      },
      success: (res, req) => {
        console.log(res.data)

        // latitude:"31.059351"
        // longitude:"121.243908"
        
        v.setData({
          markers: [{
            id: 0,
            latitude: res.data.data.latitude,
            longitude: res.data.data.longitude,
            width: 18,
            height: 35
          }],
        })

        v.houType(res.data.data.id)
        v.setData({
          detail: {
            hou_id: res.data.data.id,
            hou_names: res.data.data.names,
            hou_pirce: res.data.data.pirce,
            hou_opentime: util.js_date_time(res.data.data.opentime).split(' ')[0],
            hou_br: res.data.data.br,
            hou_address: res.data.data.address,
            hou_mobile: res.data.data.mobile
          },
        })
        let imgList = [];
        var data = JSON.parse(res.data.data.pic);
        for (var i = 0; i < data.length; i++) {
          imgList.push(data[i].url +'?x-oss-process=image/resize,h_400')
        }
        v.setData({
          imgUrls: imgList
        })
        setTimeout(function() {
          wx.hideLoading();
          wx.stopPullDownRefresh()
        }, 300)

        v.maps()
      }
    })
  },

  //根据楼盘ID获取户型
  houType(hou_id) {
    let v = this;
    wx.request({
      url: 'https://app.gsfzd.com/houses/details/house',
      method: 'POST',
      data: {
        hou_id: hou_id
      },
      success: (res, req) => {
        v.setData({
          houTypeList: res.data.data
        })
      }
    })
  },

  // showSearchInfo: function (data, i) {
  //   var that = this;
  //   that.setData({
  //     placeData: {
  //       title: '名称：' + data[i].title + '\n',
  //       address: '地址：' + data[i].address + '\n',
  //       telephone: '电话：' + data[i].telephone
  //     }
  //   });
  // },
  changeMarkerColor: function (data, i) {
    var that = this;
    var markers = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        // 此处需要在相应路径放置图片文件 
        data[j].iconPath = "https://guishangf.oss-cn-shanghai.aliyuncs.com/1532688882%281%29.jpg";
      } else {
        // 此处需要在相应路径放置图片文件 
        data[j].iconPath = "https://guishangf.oss-cn-shanghai.aliyuncs.com/1532688882%281%29.jpg";
      }
      markers[j](data[j]);
    }
    that.setData({
      markers: markers
    });
  },

  makertap: function(e) {
    var that = this;
    var id = e.markerId;
    that.showSearchInfo(wxMarkerData, id);
    that.changeMarkerColor(wxMarkerData, id);
  },
  ljyy(){
    let v = this;
    console.log(v)
    wx.getStorage({
      key: 'userName',
      success: function(res) {
        console.log(res.data)
        wx.request({
          url: 'https://app.gsfzd.com/houses/details/appointment',
          method:'POST',
          data:{
            type: 0
          },
          success:(res)=>{
            console.log(res)
          }
        })
      },
    })
  }
})