Page({
  data: {
    current: 'xin',
    current_scroll: 'xin',
    num:1,
    loadingSta:true,
    reList:[],
    recommendList:[],
  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  onLoad() {
    let v = this;
    wx.setNavigationBarTitle({
      title: '贵上推荐'
    });

    v.detail('', '', '0,999999', '')
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
    this.setData({
      reList:[]
    })
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    }),
    this.data.num = 1;
    this.detail(this.data.current, '', '0,999999', '')
  },


  handleChangeScroll({ detail }) {
    this.setData({
      current_scroll: detail.key
    });
  },


  //搜索
  detail(table, city_id, pirce, type_id, search) {
    let v = this;

    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://app.gsfzd.com/homes/homes/so',
      method: 'POST',
      data: {
        page: v.data.num,
        num: 10,
        table: table,
        city_id: city_id,
        pirce: pirce,
        type_id: type_id,
        search: ''
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

        wx.hideLoading();
        v.setData({
          loadingSta: false
        })
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
      v.detail(v.data.current, '', '0,999999', '')
    }, 200)


  },
});