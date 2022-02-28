import { request } from "../../request/index"
import regeneratorRuntime from '../../lib/runtime/runtime'
// pages/category/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightContent: [],
    currentIndex: 0,
    scrollTop: 0
  },
  Cates: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断是否有缓存
    const Cates = wx.getStorageSync('cates')
    if(!Cates){
      this.getCates()
    }else{
      if(Date.now()-Cates.time>1000*300){
        this.getCates()
      }else{
        this.Cates = Cates.data
        let leftMenuList = this.Cates.map(e => e.cat_name)
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        });
      }
    }
  },
  async getCates(){
    const res = await request({url: '/categories'})
    this.Cates = res.data.message
    wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
    let leftMenuList = this.Cates.map(e => e.cat_name)
    let rightContent = this.Cates[0].children
    this.setData({
      leftMenuList,
      rightContent
    });
  },
  handleItemTab(e){
    const {index} = e.currentTarget.dataset
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex : index,
      rightContent,
      // 重新设置距离顶部的距离
      scrollTop: 0
    });
  }
})