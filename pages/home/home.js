// const date = new Date()
// const years = []
// const months = []
// const days = []

// for (let i = 1990; i <= date.getFullYear(); i++) {
//   years.push(i)
// }

// for (let i = 1; i <= 12; i++) {
//   months.push(i)
// }

// for (let i = 1; i <= 31; i++) {
//   days.push(i)
// }


// const {
//   $Message
// } = require('../../dist/base/index');
Page({
  data: {
    city: '上海',
    hotList:[],
    loadingSta:true,
    recommendList:[],
    reList:[],
    num:1,
    imgUrls: [
      'https://wx-gsf.oss-cn-hangzhou.aliyuncs.com/home/%E7%94%BB%E6%9D%BF%201%402x.png?x-oss-process=image/resize,h_300',
    ],
    newsList: [],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 700,
    indicatorActiveColor: '#CCCCCC',
    indicatorColor: '#32537d',
    circular: "true",

    visible1: false,

    targetTime1: 0,
    clearTimer: false,
    region: '',
    multiIndex: [0, 0, 0],
    multiArray: [
      ['全部', '100万以下', '100-500万', '500-1000万', '1000万以上'],
      ['全部', '50m²以下', '50-100m²', '100-200m²', '200m²以上'],
      ['全部', '住宅', '商铺', '公寓', '别墅', '洋房'],
    ],
  },
  onShow: function() {
    let v = this;
    wx.getStorage({
      key: 'city',
      success: function(res) {
        v.setData({
          city: res.data.name
        })
      },
    })
  },

  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  bindMultiPickerChange: function(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },

  handleOpen1() {
    this.setData({
      visible1: true
    });
  },

  handleClose1() {
    this.setData({
      visible1: false
    });
  },


  //获取新闻列表
  detailList() {
    let v = this;
    wx.request({
      url: 'https://app.gsfzd.com/index.php/news/index/lists',
      method: 'POST',
      data: {
        page: 1,
        num: 6
      },
      success: (res) => {
        let data = [];
        let info = res.data.info;
        for (var i = 0; i < info.length;i++){
          data.push(info[i].news_headline)
        }
        v.setData({
          newsList: data
        })

      }
    })
  },

  //下拉刷新
  onPullDownRefresh: function() {
    this.setData({
      recommendList: [],
      reList:[],
    })
    this.recommend(1)
    this.heat();
  },

  onUnload(options) {
    this.setData({
      clearTimer: true
    });

  },

  myLinsterner(e) {
    this.setData({
      status: '结束'
    });
  },

  onLoad(event) {
    this.detailList();
    this.heat();
    this.recommend(1);
  },

  onReachBottom(){
    let v = this;
    v.data.num += 1; 
    v.setData({
      loadingSta: true
    })

    v.recommend(v.data.num);
  },

  //热门排行版
  heat(event) {
    let v = this;
    wx.request({
      url: 'https://app.gsfzd.com/index.php/hou/hou/heat',
      method: 'POST',
      data: {
        pag: 1,
        num: 5
      },
      success: function (res) {
        console.log(res)
        let data = res.data.data
        for (var i = 0; i < data.length; i++) {
          data[i].hou_pic = JSON.parse(data[i].hou_pic)
        }
        v.setData({
          hotList: data
        });
        wx.stopPullDownRefresh()
      }
    })
  },



  maifang() {
    wx.showModal({
      title: '友情提示',
      showCancel:false,
      content: '下载《贵上房》官方APP可享受此功能',
    })
  },

  //为你推荐
  recommend(num) {
    let v = this;
    wx.request({
      url: 'https://app.gsfzd.com/houses/details/recommend',
      method: 'POST',
      data: {
        page: num,
        num: 10
      },
      success: function (res) {
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
  }
})