// pages/housesDetailD/housesDetailD.js

var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {
      hou_names: '',
      hou_pirce: '',
      hou_equity: '',
      hou_greerate: '',
      hou_plotrate: '',
      hou_br: '',
      hou_spot: '',
      hou_number: '',
      hou_gas: '',
      hou_steel: '',
      hou_address: '',
      hou_opentime: '',
      hou_datetime: '',
      hou_status: '',
      hou_area: '',
      hou_type: '',
      hou_card: '',
      hou_perty: '',
      hou_pertype: '',
      hou_pertyfee: '',
      hou_water: '',
      hou_br: '',
      hou_point: '',
      hou_content: '',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.housesDetailD(options.hou_id, options.type)
    
    
  },

  //下拉刷新
  onPullDownRefresh: function () {
    let v = this;
    v.housesDetailD(v.options.hou_id, v.options.type);
  },

  housesDetailD(hou_id, type1){
    let v = this;
    wx.request({
      url: 'https://app.gsfzd.com/houses/details/details',
      method:'POST',
      data: {
        type: type1,
        detail: hou_id
      },
      success:(res,req)=>{
        console.log(res.data)
        wx.setNavigationBarTitle({
          title: res.data.data.names
        })
        v.setData({
          detail: {
            hou_names: res.data.data.names,
            hou_pirce: res.data.data.pirce,
            hou_equity: res.data.data.equity,
            hou_greerate: res.data.data.greerate,
            hou_plotrate: res.data.data.plotrate,
            hou_br: res.data.data.br,
            hou_spot: res.data.data.spot,
            hou_number: res.data.data.number,
            hou_gas: res.data.data.gas,
            hou_steel: res.data.data.hou_steel,
            hou_address: res.data.data.address,
            hou_opentime: util.js_date_time(res.data.data.opentime).split(' ')[0],
            hou_datetime: util.js_date_time(res.data.data.datetime).split(' ')[0],
            hou_status: res.data.data.status,
            hou_area: res.data.data.area,
            hou_type: res.data.data.type,
            hou_card: res.data.data.card,
            hou_perty: res.data.data.perty,
            hou_pertype: res.data.data.pertype,
            hou_pertyfee: res.data.data.pertyfee,
            hou_water: res.data.data.water,
            hou_tel: res.data.data.tel,
            hou_point: res.data.data.point,
            hou_content: res.data.data.content,
          }
        })

        wx.stopPullDownRefresh()
      }
    })
  },

})