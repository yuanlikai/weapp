// pages/tickling/tickling.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '意见反馈'
    })

  },
  bindFormSubmit(e){
    if (e.detail.value.textarea.length < 10) {
      wx.showModal({
        title: '友情提示提示',
        content: '意见反馈不得小于10个字',
        showCancel: false,
        success: function (res) {

        }
      })
    } else {
    wx.request({
      url: 'https://app.gsfzd.com/personal/user/feedback',
      method:'POST',
      data:{
        info: e.detail.value.textarea
      },
      success:(res)=>{
        wx.switchTab({
          url: '/pages/me/me',
          success:()=>{
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
    }
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