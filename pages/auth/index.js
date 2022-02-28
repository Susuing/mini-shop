import {login} from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/index"

Page({
  async handleGetUserInfo(e){
    const {encryptedData,iv,rawData,signature} = e.detail
    console.log(e)
    const {code} = await login()
    const loginParams = {encryptedData,rawData,iv,signature,code}
    const {token} = await request({url:'/users/wxlogin',data:loginParams,method:'post'})
    console.log(token)
    wx.setStorageSync('token', token)
    wx.navigateBack({
      delta:1
    })
  }
})