import { request } from "../../request/index"
import regeneratorRuntime, { mark } from '../../lib/runtime/runtime'

// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodObj:{},
    isCollect: false
  },
  Goods_info:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    const pages = getCurrentPages()
    let options = pages[pages.length-1].options
    const {goods_id} =  options
    this.getGooddetail(goods_id)
    
  },
  async getGooddetail(goods_id){
    const res = await request({url:'/goods/detail',data:{goods_id}})
    let goodObj = res.data.message
    this.Goods_info = goodObj
    const collect = wx.getStorageSync('collect')||[]
    let isCollect = collect.some(v => v.goods_id === this.Goods_info.goods_id)
    this.setData({
      goodObj:{
        goods_name: goodObj.goods_name,
        goods_price: goodObj.goods_price,
        goods_introduce: goodObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodObj.pics
      },
      isCollect
    })
  },
  // 点击放大预览图片
  handlePrevewImage(e){
    const urls = this.Goods_info.pics.map( v => v.pics_mid)
    wx-wx.previewImage({
      urls: urls,
      current: e.currentTarget.dataset.url
    })
  },
  handleCartAdd(){
    let cart = wx.getStorageSync('cart') || []
    const index = cart.findIndex( v => v.goods_id === this.Goods_info.goods_id)
    if(index === -1){
      this.Goods_info.num = 1
      cart.push(this.Goods_info)
    }else{
      cart[index].num++
    }
    wx.setStorageSync('cart', cart)
    wx-wx.showToast({
      title: '添加成功！',
      icon: 'success',
      mask: true
    })
  },
  handleCollect(){
    const collect = wx.getStorageSync('collect')||[]
    let isCollect = false
    let index = collect.findIndex(v => v.goods_id === this.Goods_info.goods_id)
    if(index !== -1){
      collect.splice(index,1)
      isCollect = false
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mark: true
      })
    }else{
      collect.push(this.Goods_info)
      isCollect = true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mark: true
      })
    }
    wx.setStorageSync('collect', collect)
    this.setData({
      isCollect
    })
  }
})