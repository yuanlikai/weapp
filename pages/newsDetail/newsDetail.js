// pages/newsDetail/newsDetail.js
var util = require("../../utils/util.js"); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
    content:{},
    time:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.newDetail(options.news_id)
    wx.setNavigationBarTitle({
      title: '贵上头条'
    })
  },

  newDetail(news_id){
    let v = this;
    wx.request({
      url: 'https://app.gsfzd.com/index.php/news/index/detail',
      method:'POST',
      data:{
        news_id: news_id,
      },
      success:(res)=>{
        v.setData({
          detail: res.data.data,
          content: JSON.parse(res.data.data.news_content),
          time: util.js_date_time(res.data.data.news_addtime).split(' ')[0]
        })
        console.log(this.data.content)
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

    wx.stopPullDownRefresh()
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