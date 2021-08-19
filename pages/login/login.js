// pages/login/login.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: ''
  },

  //收集手机号和密码
  handlerInput(event) {
    let type = event.currentTarget.id
    const value = event.detail.value
    this.setData({
      //type是动态的值
      [type]: value
      /* 
      []语法：
        1、取值（拿变量当中或者表达式的值）2、拿到值再次和外部组成新语法
      */
    })
  },
  // 点击登录的逻辑
  async login() {
    let {
      phone,
      password
    } = this.data
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      // 弹出消息
      wx.showToast({
        title: '手机号不合法',
      })
      return
    }
    if (!/^\w{6,20}$/.test(password)) {
      wx.showToast({
        title: '密码不合法',
      })
      return
    }
    //发请求
    const result = await request('/login/cellphone', {
      phone,
      password,
      isLogin: true
    })
    if (result.code === 200) {
      wx.setStorageSync('userInfo_key', result.profile)
      wx.reLaunch({
        url: '/pages/center/center',
      })
    } else if (result.code === 400) {
      wx.showToast({
        title: '用户名错误',
      })
    } else if (result.code === 502) {
      wx.showToast({
        title: '密码错误',
      })
    } else if (result.code === 501) {
      wx.showToast({
        title: '账号不存在',
      })
    } else {
      wx.showToast({
        title: '未知错误',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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