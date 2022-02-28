import {request} from "../../request/index"
// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    searchList: [],
    catesList: [],
    floorList: []
  },
  onLoad() {
    this.getSwiperList()
    this.getCatesList()
    this.getFloorList()
  },
  getSwiperList(){
    request({
      url: '/home/swiperdata'
    }).then(result =>{
      this.setData({
        searchList : result.data.message
      });
    })
  },
  getCatesList(){
    request({
      url: '/home/catitems'
    }).then(result =>{
      this.setData({
        catesList : result.data.message
      });
    })
  },
  getFloorList(){
    request({
      url: '/home/floordata'
    }).then(result =>{
      this.setData({
        floorList : result.data.message
      });
    })
  }
})
