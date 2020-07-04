const app = getApp();
import {
  api, _api_root
} from "../../api.js";
import {
  Http
} from "../../utils/http.js";
var http = new Http();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openid: null,
    session_key: null,
    path: null
  },
  onGotUserInfo: function(e) {
    let _this = this;
    this.doIt(e);
  },
  doIt(e) {
    console.log("asdsda");
    console.log(e);
    this.getMember(e);
    // const memberInfo = await this.getMemberInfo(e);
  },
  getMember(e) {
    let _this = this;

    if (e.detail.userInfo) {
      var wxUserInfo = e.detail.userInfo;
      //调用登录接口获取code
      wx.login({
        success: function(loginRes) {
          if (loginRes.code) {
            Http.requestByIgnoreLogin({
              url: api.login,
              data: {
                code: loginRes.code
              },
              success(res) {
                console.log(res.data);
                wx.setStorageSync('token', res.data.data.token);
                // wx.setStorageSync("sessionKey", res.data.data.sessionKey);
                // wx.setStorageSync('memberId', res.data.data.memberId);
                _this.getMemberInfo(e,res.data.data);
              },
              fail(err) {
                console.log(err);
              }
            })
          }
        }
      })
    }

  },
  getMemberInfo(e,memberInfo) {
    let _this = this;
    let userInfo = {
      "sessionKey": memberInfo.sessionKey,
      "encryptedData": e.detail.encryptedData,
      "iv": e.detail.iv,
      "rawData": e.detail.rawData,
      "signature": e.detail.signature,
      "memberCarOwner": 0,
      "memberStore": 0
    }
    // a.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    Http.requestByIgnoreLogin({
      // url: api.member.info,
      url:_api_root+"member",
      method: 'POST',
      data: userInfo,
      success: function(res) {
        _this.jump();
      },
      fail(err) {
        console.log(err);
      }
    })

  },
  jump() {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let path = options.path;
    if (path) {
      this.setData({
        path: path
      })
    }
    console.log(path);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})