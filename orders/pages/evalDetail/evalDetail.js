// packageA/pages/evalDetail/evalDetail.js
import { Http } from "../../../utils/http";
import { _api_root, api, requestImageUrl } from "../../../api";
import { formatTimeTwo } from "../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starStatus:true//收藏状态

  },
  collectGoods(){
    let that=this
    that.setData({
      starStatus:!that.data.starStatus
    })
  },//收藏事件

  toShopCart(){
    wx.navigateTo({
      url:"/pages/cart/cart"
    })
  },//跳转购物车
  addCart(){
    wx.showToast({
      title:"添加成功!",
      icon:"none"
    })
  },//添加购物车
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var goodsId = options.goodsId
    // console.log("goodsId",goodsId)
    that.setData({
      imgurl: requestImageUrl
    })
    //请求评论统计数据
    Http.requestByIgnoreLogin({
      // url: api.goods.goods+ goodsId + "/goodsEvaluate",
      url: api.goods.goodsEvaStatistics + goodsId,
      success(res) {
        let evaAll = res.data.data;
        let num = 0
        let goodPercent = 0
        evaAll.forEach(item => {
          if (!item.statisticsNum == 0) {
            num += item.statisticsNum
            goodPercent = evaAll[0].statisticsNum / num * 100
          }
        })
       
        that.setData({
          evaAll: evaAll,
          num: num,
          goodPercent: goodPercent.toFixed(0)
        })
        // console.log("num", num)
      },
    })

    //请求评论数据
    Http.requestByIgnoreLogin({
      url: api.goods.goods + goodsId + "/goodsEvaluate",
      success(res) {
        let evaList = res.data.data.content;
        console.log("evaList", evaList)
        evaList.forEach(item => {
          item.goodsEvaluateAddTime = formatTimeTwo(item.goodsEvaluateAddTime, "Y-M-D h:m:s")
          item.goodsEvaluatePic=(item.goodsEvaluatePic.split(","))
        })
        that.setData({
          evaList: evaList

        })
      },
    })

  },
  // preViewImage(e){
  //   var current=e.currentTarget.dataset.current
  //   console.log(current,"==========")
  //   wx.previewImage({
  //     current:current,
  //     urls:this.data.pre
  //   })
  // },

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