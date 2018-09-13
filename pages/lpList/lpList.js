// pages/lpList/lpList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingSta: true,
    // '单价', '100万以下', '100-500万', '500-1000万', '1000万以上'
    array1: [],
    array2: [{
        name: '全部',
        key: '0,9999999'
      },
      {
        name: '5000以下',
        key: '0,5000'
      },
      {
        name: '5000-10000',
        key: '5000,10000'
      },
      {
        name: '10000-20000',
        key: '10000,20000'
      },
      {
        name: '20000-60000',
        key: '20000,60000'
      },
      {
        name: '60000-80000',
        key: '60000,80000'
      },
      {
        name: '100000以上',
        key: '100000,999999'
      },
    ],
    // array3: 
    array4: [{
        name: '全部',
        key: ''
      },
      {
        name: '住宅',
        key: '住宅'
      },
      {
        name: '商铺',
        key: '商铺'
      },
      {
        name: '别墅',
        key: '别墅'
      },
      {
        name: '花园洋房',
        key: '花园洋房'
      },
      {
        name: '商住楼',
        key: '商住楼'
      },
      {
        name: '写字楼',
        key: '写字楼'
      },
      {
        name: '公寓',
        key: '公寓'
      },
    ],

    index1: 0,
    index2: 0,
    index3: 0,
    index4: 0,

    table: '',
    city_id: '',
    pirce: '',
    type_id: '',
    search: '',
    recommendList:[],
    reList:[],
    num:1,
    typess:'',
    saasdw:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log()
    let v = this;
    console.log(options.search)
    v.setData({
      search: options.search
    })

    switch (options.title) {
      case '新房直卖':
        v.data.typess = 'xin'
        break;
      case '优质房源':
        v.data.typess = 'you'
        break;
      case '中介精推':
        v.data.typess = 'zhong'
        break;
      case '个人房源':
        v.data.typess = 'ge',
        v.setData({
          saasdw:1
        })
        break;

    }
    wx.getStorage({
      key: 'city',
      success: function(res) {
        v.city(res.data.id)
      },
      fail: (res) => {
        v.city(792)
      }
    })

    wx.setNavigationBarTitle({
      title: options.title
    })


    
  },

  bindPickerChange: function(e) {
    let v = this
    if (e.currentTarget.dataset.alphaBeta === "位置") {
      v.setData({
        index1: e.detail.value
      })
      console.log(this.data.array1[this.data.index1])
    } else if (e.currentTarget.dataset.alphaBeta === "均价") {
      v.setData({
        index2: e.detail.value
      })

      console.log(this.data.array2[this.data.index2])

    } else if (e.currentTarget.dataset.alphaBeta === "类型") {
      v.setData({
        index4: e.detail.value
      })
    }
    v.setData({
      reList: []
    })
    v.detail(v.data.typess, v.data.array1[v.data.index1].areaId, v.data.array2[v.data.index2].key, v.data.array4[v.data.index4].key)
    // else if (e.currentTarget.dataset.alphaBeta === "户型") {
    //   v.setData({
    //     index3: e.detail.value
    //   })
    // } 
  },

  //搜索
  detail(table, city_id, pirce, type_id, search) {
    let v = this;
    wx.request({
      url: 'https://app.gsfzd.com/homes/homes/so',
      method: 'POST',
      data: {
        page: v.data.num,
        num:10,
        table: table,
        city_id: city_id,
        pirce: pirce,
        type_id: type_id,
        search: v.data.search
      },
      success: (res, req) => {
        console.log(res.data)

        let data = res.data.data;
        for (var i = 0; i < data.length; i++) {
          data[i].pic = JSON.parse(data[i].pic);
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

  //地区列表
  city(areaId) {
    let v = this;
    wx.request({
      url: 'https://app.gsfzd.com/index.php/city/city/index1',
      method: 'POST',
      data: {
        areaId: areaId
      },
      success: (res, req) => {
        v.data.array1.unshift({
          areaId: '',
          areaName: '全部'
        })

        let data = v.data.array1.concat(res.data.data)

        v.setData({
          array1: data
        })
        
        v.detail(v.data.typess, v.data.array1[v.data.index1].areaId, v.data.array2[v.data.index2].key, v.data.array4[v.data.index4].key)
      }
    })
  },

  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {

    let v = this;
    v.data.num += 1;
    v.setData({
      loadingSta: true
    })
    setTimeout(function () {
      v.detail(v.data.typess, v.data.array1[v.data.index1].areaId, v.data.array2[v.data.index2].key, v.data.array4[v.data.index4].key)
    }, 200)


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  }, 

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})