import { api, requestImageUrl, _api_root } from "../../../api.js"
import { Http } from "../../../utils/http.js"
var http = new Http();
var app = getApp();
var goodsId=''
let goodsClassId = null; var that ;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onGoods(e) {
    var that = this
    let goodsId = e.currentTarget.dataset.goodsId
    console.log("goodsId", goodsId)
    if (goodsId) {
      wx.navigateTo({
        url: '/orders/pages/goodsDetail/goodsDetail?goodsId=' + goodsId,
      });
    }
  },
  // 删除收藏的商品
  deleteCollect(e){
    var that=this
    var goodsId = e.currentTarget.dataset.goodsId
    Http.requestByIgnoreLogin({
      url: api.goodsFavorites.goodsFavorites+"/"+goodsId,
      method:"delete",
      success(res) {
        let deleteGoods = res.data;
        // that.setData({
        //   goodsFavorites: goodsFavorites
        // })
        that.onShow()
        console.log("deleteGoods", deleteGoods)
      },
     
    })
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      imgurl: requestImageUrl
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
    that = this
    Http.requestByIgnoreLogin({
      url: api.goodsFavorites.goodsFavorites,
      success(res) {
        let goodsFavorites = res.data.data.content;
        that.setData({
          goodsFavorites: goodsFavorites
        })
        console.log("goodsFavorites", goodsFavorites)
      },
    })

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