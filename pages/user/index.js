// pages/user/index.js
Page({
  data:{
    userInfo:{},
    collect_goods_num: 0
  },
  onShow(){
    const userInfo = wx.getStorageSync('userInfo')||[]
    const collect = wx.getStorageSync('collect')||[]
    let collect_goods_num = collect.length
    this.setData({
      userInfo,
      collect_goods_num
    })
  }
})