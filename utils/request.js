import config from './config'
// request(路径,参数,请求方式)
function request(path, data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + path,
      method,
      data,
      // 设置请求头，我们可以把cookie拿到设置上
      header:{
        //从数据中找到MUSIC开头的数据作为cookies携带
        cookie:wx.getStorageSync('cookie_key')&&wx.getStorageSync('cookie_key').find(item => item.startsWith('MUSIC'))
      },
      success: (res) => {
        /* 
        cookie是在res里面的
        我们需要判断是不是登陆操作(通过登陆时传过来的data数据)
        把res里面的cookie信息保存起来
        */
       if(data.isLogin){
        wx.setStorageSync('cookie_key', res.cookies)
      }
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
export default request