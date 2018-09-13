// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommendList:[],
    reList:[],
    loadingSta:true,
    num:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '贵上头条'
    })
    let v = this;
    v.detailList(1);
    
  },

  //获取新闻列表
  detailList(num){
    let v = this;
    wx.request({
      url: 'https://app.gsfzd.com/index.php/news/index/lists',
      method:'POST',
      data:{
        page: num,
        num:10
      },
      success:(res)=>{
        let data = res.data.info;
        console.log(res.data.info)
        for(var i = 0; i < data.length;i++){
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
      v.detailList(v.data.num);
    }, 200)
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
    this.detailList(1)
    wx.stopPullDownRefresh()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})