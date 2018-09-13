// pages/housesType/housesType.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houTypeList:[],
    housesTypeList: {
      hou_ses_name: '',
      hou_size_info: '',
      hou_ses_price: '',
      hou_ses_tel: '',
      hou_ses_pic: '',
      hou_ses_area: '',
      hou_ses_content: '',
      hou_ses_feat: '',
      hou_ses_look: ''
    },
    detail:{},
    state:0
  },

  maifang() {
    wx.showModal({
      title: '友情提示',
      showCancel: false,
      content: '下载《贵上房》官方APP可享受此功能',
    })
  },
  phone() {
    let v = this;
    
    wx.makePhoneCall({
      phoneNumber: String(v.data.housesTypeList.hou_ses_tel) //仅为示例，并非真实的电话号码
    })
  },
  send() {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if(options.type==='ge'){
      this.setData({
        state:1
      })
      this.housesDetailD(options.hou_id, options.type);

    } else {
      this.setData({
        state: 0
      })
      this.housesType(options.hou_ses_id)
    }

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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {

    let v = this;
    if (v.options.type) {
      console.log('1')
      return {
        title: '贵上房：' + v.data.housesTypeList.hou_ses_name + ' / ' + v.data.housesTypeList.hou_size_info,
        path: '/pages/housesType/housesType?hou_id=' + v.data.housesTypeList.hou_ses_id + '&type=ge'
      }
    } else {
      return {
        title: '贵上房：' + v.data.housesTypeList.hou_ses_name + ' / ' + v.data.housesTypeList.hou_size_info,
        path: '/pages/housesType/housesType?hou_ses_id=' + v.data.housesTypeList.hou_ses_id
      }
    }
    // return {
    //   title: '贵上房：' + v.data.housesTypeList.hou_ses_name + ' / ' + v.data.housesTypeList.hou_size_info,
    //   path: '/pages/housesType/housesType?hou_ses_id=' + v.data.housesTypeList.hou_ses_id
    // }
  },

  //户型图片处理
  viewImg(e) {
    let v = this;
    wx.previewImage({
      current: v.data.housesTypeList.hou_ses_pic,
      urls: [v.data.housesTypeList.hou_ses_pic]
    })
  },

  housesDetailD(hou_id, type1) {
    let v = this;
    wx.request({
      url: 'https://app.gsfzd.com/houses/details/details',
      method: 'POST',
      data: {
        type: type1,
        detail: hou_id
      },
      success: (res, req) => {
        console.log()
        v.setData({
          housesTypeList: {
            hou_ses_id: res.data.data.id,
            hou_ses_name: res.data.data.title ,
            hou_size_info: res.data.data.plot,
            hou_ses_price: res.data.data.pirce,
            hou_ses_tel: res.data.data.mobile,
            // hou_ses_pic: res.data.data.hou_ses_pic,
            hou_ses_area: res.data.data.area,
            hou_ses_content: res.data.data.content,
            hou_ses_address: res.data.data.address,

            hou_ses_floor: res.data.data.floor,
            hou_ses_floors: res.data.data.floors,

            hou_ses_room: res.data.data.room,
            hou_ses_type: res.data.data.type.split(',')[0],
            hou_ses_types: res.data.data.type.split(',')[1],
            

            hou_ses_year: res.data.data.year,
            hou_ses_right: res.data.data.right,

            
            // hou_ses_feat: res.data.data.hou_ses_feat,
            hou_ses_look: res.data.data.aspect,
            hou_ses_pic: JSON.parse(res.data.data.pics)[0].url
          },
        })

        wx.setNavigationBarTitle({
          title: res.data.data.names
        })

        wx.stopPullDownRefresh()
      }
    })
  },

  //户型详情
  housesType(hou_ses_id) {
    let v = this;
    wx.request({
      url: 'https://app.gsfzd.com/houses/details/home',
      method: 'POST',
      data: {
        hou_id: hou_ses_id
      },
      success: (res, req) => {
        v.setData({
          housesTypeList: {
            hou_ses_id: res.data.data.hou_ses_id,
            hou_ses_name: res.data.data.hou_ses_name,
            hou_size_info: res.data.data.hou_size_info,
            hou_ses_price: res.data.data.hou_ses_price,
            hou_ses_tel: res.data.data.hou_ses_tel,
            hou_ses_pic: res.data.data.hou_ses_pic,
            hou_ses_area: res.data.data.hou_ses_area,
            hou_ses_content: res.data.data.hou_ses_content,
            hou_ses_feat: res.data.data.hou_ses_feat,
            hou_ses_look: res.data.data.hou_ses_look,
            hou_ses_pic: 'http://img.gsfzd.com/' + res.data.data.hou_ses_pic
          },
        })
        v.houType(res.data.data.hou_id)
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
        console.log()
      }
    })
  }

})