import { request } from "../../request/index"
import regeneratorRuntime from '../../lib/runtime/runtime'

// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id:0,
        value:'商品收藏',
        isActive: true
      },
      {
        id:1,
        value:'品牌收藏',
        isActive: false
      },
      {
        id:2,
        value:'店铺收藏',
        isActive: false
      },
      {
        id:3,
        value:'浏览器足迹',
        isActive: false
      }
    ],
    goodsList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    this.getGoodList()
  },
  // 事件监听tab被点击
  handletabsItemChange(e){
    const {index} = e.detail
    let {tabs} = this.data
    tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tabs
    })
  },
  async getGoodList(){
    const goodsList = wx.getStorageSync('collect')||[]
    this.setData({
      goodsList
    })
  }
})