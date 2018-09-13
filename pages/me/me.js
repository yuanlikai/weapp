// pages/me/me.js
const { $Toast } = require('../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: false
  },
  getPhoneNumber: function(e) {
    wx.showLoading({
      title: '加载中',
    })
    let v = this;
    wx.login({
      success: res => {
        // console.log(res.code)
        wx.request({
          url: 'https://app.gsfzd.com/index.php/publics/wexin/wexin',
          data: {
            js_code: res.code
          },
          method: 'POST',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function(res) {
            let session = JSON.parse(res.data).session_key;
            // 授权
            wx.login({
              success: res => {
                // console.log(res.code)
                wx.request({
                  url: 'https://app.gsfzd.com/index.php/publics/wexin/decryptData',
                  data: {
                    encryptedData: e.detail.encryptedData,
                    sessionKey: session,
                    iv: e.detail.iv
                  },
                  method: 'POST',
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success: function(res) {
                    
                    if (res.data.error === true) {
                      wx.setStorage({
                        key: 'userName',
                        data: res.data.data,
                        success: (res) => {
                          v.setData({
                            state: 1
                          })
                        },
                        fail: (error) => {
                          v.setData({
                            state: 0
                          })
                        }
                      })

                    } else {
                      console.log('登录失败,请重新登录！')
                      v.handleWarning()
                    }
                    wx.hideLoading()
                  }
                })
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
              }
            })
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // Do some initialize when page load.
  },
  handleWarning() {
    $Toast({
      content: '登录失败',
      type: 'error'
    });
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
      key: 'userName',
      success: function(res) {
        if (res.data) {
          v.setData({
            state: 1
          })
        } else {
          v.setData({
            state: 0
          })
        }
      },
      fail: (error) => {
        v.setData({
          state: 0
        })

      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  phone() {
    let v = this;
    wx.makePhoneCall({
      phoneNumber: '400-0052-533' //仅为示例，并非真实的电话号码
    })
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
  onShareAppMessage: function() {

  }
})