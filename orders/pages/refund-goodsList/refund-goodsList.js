// pages/cart/cart.js
import { api, } from "../../../api"
import { Http } from "../../../utils/http"
var goodsPrices = 0
var goodsNums = 0
var cartIds = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsNums: goodsNums,
    goodsPrices: 0,
  },


  //减
  OnMinus(e) {
    var that = this
    let cartlist = that.data.cartlist
    let index = e.currentTarget.dataset.index
    let goodsNum = cartlist[index].goodsNum
        if (goodsNum > 1) {
          cartlist[index].goodsNum = cartlist[index].goodsNum - 1
          that.setData({
            cartlist: cartlist,
          })
        }
  },
  //加
  OnAdd(e){
    var that = this
    let cartlist = that.data.cartlist
    let index = e.currentTarget.dataset.index
    let goodsNum = cartlist[index].goodsNum
        console.log(res.data)
        cartlist[index].goodsNum = cartlist[index].goodsNum + 1
        that.setData({
          cartlist: cartlist,
        })
  },
  //
  onGoods(e) {
    var that = this
    let goodsId = e.currentTarget.dataset.goodsId
    console.log(goodsId)

  },
  //选择
  OnCartChoose(e) {
    var that = this
    let cartlist = that.data.cartlist
    let index = e.currentTarget.dataset.index
    let cartChoose = cartlist[index].cartChoose
    console.log(index)
    cartlist[index].cartChoose = !cartChoose
    that.setData({
      cartlist: cartlist
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.setData({
      imgurl: api.requestImageUrl,
    })
      var ordersId=options.ordersId
    // 订单商品
    Http.requestByIgnoreLogin({
      url: api.myorders.myorders + "/" + ordersId + "/ordersGoods",
      success(res) {
        console.log("goods", res.data.data)
        let goodsList=res.data.data
        goodsList.forEach(item=>{
          item.goodsChoose=false
        })
        that.setData({
          goodsList: goodsList
        })
      }
    })

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
    var that=this
    cartIds=[];

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