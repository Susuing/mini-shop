import { getSetting, chooseAddress, openSetting, showModal ,showToast,requestPayment} from "../../utils/asyncWx.js"
import regeneratorRuntime from '../../lib/runtime/runtime'
import { request } from "../../request/index"
Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    // 1 获取缓存中的收货地址信息
    const address = wx.getStorageSync("address");
    // 1 获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart") || [];
    cart = cart.filter( v => v.checked )
    // 1 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    })
    
    this.setData({
      cart,
      totalPrice,
      totalNum, 
      address
    });

  },
  async handleOrderPay(){
    try {
      const token = wx.getStorageSync('token')
    if(!token){
      console.log("没有");
      wx.navigateTo({
        url: '/pages/auth/index',
      })
    }
    const header = {Authorization:token}
    const order_price	= this.data.totalPrice
    const consignee_addr = this.data.address.all
    let goods = []
    const {cart} = this.data
    cart.forEach( v => goods.push({
        goods_id : v.goods_id,
        goods_number : v.num,
        goods_price : v.goods_price
      }
    ))
    const res = await request({url:'/my/orders/create',data:{order_price,consignee_addr,goods},header,method:'post'})
    const {order_number} = res.data.message
    const res1 = await request({url:'/my/orders/req_unifiedorder',data:{order_number},header,method:'post'})
    const {pay} = res1.data.message
    await requestPayment(pay)
    wx.showToast({
      title: '支付成功',
    })
    wx.navigateTo({
      url: '/pages/order/index',
    })
    let newCart = wx.getStorageSync('cart')
    newCart = newCart.filter(v => !v.checked)
    wx.setStorageSync('cart', newCart)
    } catch (error) {
      wx.showToast({
        title: '支付失败',
      })
      console.log(error);
    }
  }
  
 
})