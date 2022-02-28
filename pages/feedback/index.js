// pages/feedback/index.js
Page({
  data:{
    tabs: [
      {
        id:0,
        value:'体验问题',
        isActive: true
      },
      {
        id:1,
        value:'商品/商家投诉',
        isActive: false
      }
    ],
    imgList:[],
    textVal:''
  },
  UpLoadImgs:[],
  // 事件监听tab被点击
  handletabsItemChange(e){
    const {index} = e.detail
    let {tabs} = this.data
    tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tabs
    })
  },
  handleChooseImg(){
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        
        this.setData({
          imgList:[...this.data.imgList,...result.tempFilePaths]
        })
      }
    });
      
  },
  handleRemoveImg(e){
    const {index} = e.currentTarget.dataset
    let imgs = this.data.imgList
    imgs.splice(index,1)
    console.log(imgs);
    this.setData({
      imgList:imgs
    })
  },
  handleTextInput(e){
    const {value} = e.detail
    this.setData({
      textVal:value
    })
  },
  handleFormSubmit(){
    const {textVal,imgList} = this.data
    if(!textVal.trim()){
      wx.showToast({
        title: '输入的不合法',
        icon: 'error',
        mask: true
      })
      return
    }
    wx.showLoading({
      title: '正在上传中',
      mask: true
    })
    if(imgList.length !== 0){
      imgList.forEach((v,i) => {
        wx.uploadFile({
          filePath: v,
          name: 'file',
          url: 'https://images.ac.cn/Home/Index/UploadAction/',
          formData: {},
          success: (result) => {
            let url = JSON.parse(result.data).url
            this.UpLoadImgs.push(url)
          }
        })
        if(i === imgList.length-1){
          //提交数据到后台
          console.log("提交数据");
          //清空界面
          this.setData({
            textVal:'',
            imgList:[]
          })
          wx.hideLoading()
          //返回上一层
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }else{
      wx.hideLoading()
      wx.navigateBack({
        delta: 1
      })
    }
    
  }
})