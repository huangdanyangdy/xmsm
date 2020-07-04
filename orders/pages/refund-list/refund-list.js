// orders/pages/refund-list/refund-list.js
import {api} from "../../../api";
import {Http} from "../../../utils/http";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseStatus:0
  },
  changeStatus(e){
    let that=this
    var status=e.currentTarget.dataset.status
    that.setData({
      chooseStatus: status
    })
  },

  toRefundDetail(e){
    console.log("ordersId", e)
    var ordersId=e.currentTarget.dataset.ordersId;
   
    wx.navigateTo({
      url: '/orders/pages/refund-msg/refund-msg?ordersId=' + ordersId,
    })
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
    var that = this
    that.setData({
      imgurl: api.requestImageUrl,
    })
    // var ordersId=options.ordersId
    // 获取退款订单列表
    Http.requestByIgnoreLogin({
      url: api.refund.ordersRefund,
      success(res) {
        console.log("ordersList", res.data.data.content)
        let ordersList=res.data.data.content
        that.setData({
          ordersList: ordersList
        })
      }
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