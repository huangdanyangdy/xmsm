// member/pages/member/member.js
import {api, requestImageUrl} from "../../../api";
import {Http} from "../../../utils/http";

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  toRegister(){
    wx.navigateTo({
      url:'/member/pages/member-register/member-register'
    })
  },//跳转会员签到页面
  toPoints(){
    wx.navigateTo({
      url:'/member/pages/member-points/member-points'
    })
  },//跳转会员积分页面
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    _this.setData({
      imgurl: requestImageUrl
    })
    //请求用户数据
    Http.requestByIgnoreLogin({
      url: api.member.default,
      success(res) {
        console.log(res.data)
        if (res.data.status.toString() == "0") {
          let data = res.data.data
          if (!data.memberNickname) {
            wx.showModal({
              title: '提示',
              content: '登录授权后方可进行该操作,是否进行登录授权',
              success(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/welcome/welcome'
                  })
                }
              }
            })
          }
          _this.setData({
            member: data
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '登录失败,是否重新登录',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/welcome/welcome'
                })
              }
            }
          })
        }
      },
      fail(err) {
        wx.showModal({
          title: '提示',
          content: '登录授权后方可进行该操作,是否进行登录授权',
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/welcome/welcome'
              })
            }
          }
        })
      }
    })
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