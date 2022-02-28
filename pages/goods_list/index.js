import { request } from "../../request/index"
import regeneratorRuntime from '../../lib/runtime/runtime'

// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id:0,
        value:'综合',
        isActive: true
      },
      {
        id:1,
        value:'销量',
        isActive: false
      },
      {
        id:2,
        value:'价格',
        isActive: false
      }
    ],
    goodsList:[]
  },
  QueryParams:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  TotalPage:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cat_id||''
    this.QueryParams.query = options.query||''
    this.getGoodList()
  },
  // 获取数据
  async getGoodList(){
    const res = await request({url:'/goods/search',data:this.QueryParams})
    const total = res.data.message.total
    this.TotalPage = Math.ceil(total / this.QueryParams.pagesize)
    let goodsList = res.data.message.goods
    this.setData({
      goodsList:[...this.data.goodsList,...res.data.message.goods]
    })
    wx.stopPullDownRefresh()
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
  // 滑动页面触底
  onReachBottom(){
    if(this.QueryParams.pagenum>=this.TotalPage){
      wx.showToast({
        title: '没有下一页了',
      })
    }else{
      this.QueryParams.pagenum++
      this.getGoodList()
    }
  },
  // 下拉刷新界面
  onPullDownRefresh(){
    this.setData({
      goodsList:[]
    })
    this.QueryParams.pagenum = 1
    this.getGoodList()
  }
})