import {
  cities
} from './city';
Page({
  data: {
    cities: []
  },
  tapName(event) {
    wx.setStorage({
      key: "city",
      data: event.currentTarget.dataset.alphaBeta
    })

    wx.getStorage({
      key: 'city',
      success: function(res) {
        console.log(res.data)
      }
    })
    wx.switchTab({
      url: '/pages/home/home'
    })
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: '选择省份'
    })
  },
  onReady() {
    let storeCity = new Array(26);
    const words = ["G", "J", "S", "Y", "Z"]
    words.forEach((item, index) => {
      storeCity[index] = {
        key: item,
        list: []
      }
    })
    cities.forEach((item) => {
      let firstName = item.pinyin.substring(0, 1);
      let index = words.indexOf(firstName);
      storeCity[index].list.push({
        id: item.id,
        name: item.name,
        key: firstName
      });
    })
    this.data.cities = storeCity;
    this.setData({
      cities: this.data.cities
    })
  }
});