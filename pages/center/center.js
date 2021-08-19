// pages/center/center.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    translateY: '',
    transitionL: '',
    userInfo: {},
    recentList: []
  },

  //手指刚按下的时候获取手指当前的位置
  handlerStart(event) {
    //touches是一个数组,代表手指的个数
    startY = event.touches[0].clientY
    //清空原来的过渡,避免造成卡顿
    this.setData({
      transition: ''
    })
  },
  /* 
  手指移动的时候，我们需要求出手指移动的位置，进而求出手指移动的距离
  手指移动的距离就是盒子要移动的距离
  */
  handlerMove(event) {
    let endY = event.touches[0].clientY
    let disY = endY - startY
    if (disY < 0) {
      disY = 0
    } else if (disY > 200) {
      disY = 200
    }
    this.setData({
      translateY: disY + 'rpx'
    })
  },
  // 手指抬起，元素要恢复到原来的位置
  handlerEnd() {
    this.setData({
      translateY: 0,
      transition: 'transform 1s'
    })
  },

  //点击头像跳转到登录页
  toLogin(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  //获取用户的播放记录
  async getRecentList() {
    let uid = this.data.userInfo.userId
    const result = await request('/user/record', {
      uid,
      type: 0
    })
    if (result.code === 200) {
      this.setData({
        recentList: result.allData.slice(0, 20).map(item => item.song.al)
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 小程序里面存储Storage不需要把对象转化为json串
    let userInfo = wx.getStorageSync('userInfo_key')
    this.setData({
      userInfo
    })
    //判断用户是不是登录，决定发请求获取用户的播放记录
    if (userInfo.nickname) {
      this.getRecentList()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})