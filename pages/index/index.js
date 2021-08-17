// pages/index/index.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    recommendList: [],
    rankList: []
  },
  //获取轮播图数据
  async getBannerList() {
    const result = await request('/banner', {
      type: 2
    })
    if (result.code === 200) {
      this.setData({
        bannerList: result.banners
      })
    }
  },
  //获取歌曲列表数据
  async getRecommendList() {
    const result = await request('/personalized', {
      limit: 20
    })
    if (result.code === 200) {
      this.setData({
        recommendList: result.result
      })
    }
  },
  //获取排行榜的列表数据(需要4个榜单数据)
  async getRankList() {
    let index = 0
    let rankList = []
    while (index < 4) {
      const result = await request(`/top/list`, {
        idx: index++
      })
      if (result.code === 200) {
        let obj = {
          id: result.playlist.id,
          name: result.playlist.name,
          songList: result.playlist.tracks.slice(0, 3)
        }
        rankList.push(obj)
        this.setData({
          rankList: rankList
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBannerList()
    this.getRecommendList()
    this.getRankList()
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