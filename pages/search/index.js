import { request } from "../../request/index"
import regeneratorRuntime from '../../lib/runtime/runtime'
// pages/search/index.js
Page({
  data: {
    goods:[],
    isFocs:false,
    inputValue:''
  },
  Timeout: -1,
  clearInput(){
    this.setData({
      goods:[],
      isFocs:false,
      inputValue:''
    })
  },
  handleInput(e){
    const {value} = e.detail
    if(!value.trim()){
      this.setData({
        goods:[],
        isFocs:false
      })
      return
    }
    this.setData({
      isFocs:true
    })
    clearTimeout(this.Timeout)
    this.Timeout = setTimeout(() => {
      this.qsearch(value)
    },2000)
  },
  async qsearch(query){
    const res = await request({url:'/goods/qsearch',data:{query}})
    let goods = res.data.message
    this.setData({
      goods
    })
  }
})