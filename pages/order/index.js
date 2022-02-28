import { request } from "../../request/index"
import regeneratorRuntime from '../../lib/runtime/runtime'

// pages/order/index.js
Page({
  data: {
    tabs: [
      {
        id:0,
        value:'全部',
        isActive: true
      },
      {
        id:1,
        value:'待付款',
        isActive: false
      },
      {
        id:2,
        value:'待发货',
        isActive: false
      },
      {
        id:3,
        value:'退款/退货',
        isActive: false
      }
    ],
    orders: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow() {
    const pages = getCurrentPages()
    let currentPage = pages[pages.length-1].options
    let {type} = pages[pages.length-1].options
    this.changeTitleByIndex(type-1)
    this.getOrders(type)
  },
  async getOrders(type){
    const token = wx.getStorageSync("token")
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return
    }
    const header = {Authorization:token}
    const res = await request({url:'/my/orders/all',data:{type},header})
    let {orders} = res.data.message
    orders = orders.map(v => ({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
    this.setData({
      orders
    })
  },
  changeTitleByIndex(index){
    let {tabs} = this.data
    tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tabs
    })
  },
  // 事件监听tab被点击
  handletabsItemChange(e){
    const {index} = e.detail
    this.changeTitleByIndex(index)
    this.getOrders(index+1)
  },
})