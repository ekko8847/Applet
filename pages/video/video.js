// pages/video/video.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [],
    navId: '',
    videoList: []
  },
  // 获取nav导航数据
  async getNavList() {
    const result = await request('/video/group/list')
    if (result.code === 200) {
      // console.log(result)
      this.setData({
        navList: result.data.slice(0, 20),
        navId: result.data[0].id //一上来获取到数据的时候就把第一个人的id保存起来
      })
    }
  },
  // 请求获取视频的列表数据
  async getVideoList() {
    const result = await request('/video/group', {
      id: this.data.navId
    })
    if (result.code === 200) {
      // console.log(result)
      this.setData({
        videoList: result.datas.map(item => item.data)
      })
    }
  },
  //点击切换nav
  changeNav(event) {
    this.setData({
      navId: event.target.dataset.id * 1
    })
    // 重新请求视频列表数据
    this.getVideoList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let userInfo = wx.getStorageSync('userInfo_key')
    //一上来就应该拿到导航栏数据
    await this.getNavList()
    //再根据用户是否登陆以及是否拿到navId去获取视频列表
    userInfo && userInfo.nickname && this.data.navId && this.getVideoList()
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