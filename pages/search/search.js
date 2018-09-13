// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    list: []
  },

  search(e) {
    // open - type=""
    let v = this;
    if (e.detail.value===''){

    }else{

      wx.getStorage({
        key: 'list',
        success: function (res) {
          console.log(res.data)
          var data = res.data;
          data.push(e.detail.value)
          var datas = data.reverse()
          wx.setStorage({
            key: 'list',
            data: datas,
          })
        },
        fail: (err) => {
          wx.setStorage({
            key: 'list',
            data: [e.detail.value],
          })
        }
      })
      wx.redirectTo({
        url: '/pages/lpList/lpList?search=' + e.detail.value
      })
    }
  },
  clickkck(e){
    wx.redirectTo({
      url: '/pages/lpList/lpList?search=' + e.currentTarget.dataset.alphaBeta
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    let v = this;
    wx.getStorage({
      key: 'list',
      success: function (res) {
        v.setData({
          list: res.data
        })
      },
    })
  },
  
  remove(){
    let v = this;
    wx.setStorage({
      key: 'list',
      data: [],
      success:(res)=>{
        v.setData({
          list: []
        })
      }
    })
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
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})