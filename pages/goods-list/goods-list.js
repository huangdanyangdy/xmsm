import {
  api,
  requestImageUrl,
  _api_root
} from "../../api.js"
import {
  Http
} from "../../utils/http.js"
var http = new Http();
var app = getApp();
let goodsClassId = null;
let searchText = null;
Page({
  data: {
    FilterAsc: 'asc', //
    filterNum: 1,
    layout: false,
    sortToast: false
  },
  oninput() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  //价格
  onFilter(e) {
    var that = this
    let index = e.currentTarget.dataset.index
    var FilterAsc = that.data.FilterAsc
    if (FilterAsc == "asc") {
      FilterAsc = 'desc'
    } else {
      FilterAsc = 'asc'
    }
    console.log("3233", searchText, goodsClassId)
    let data = {};
    if (searchText) {
      data.searchText = searchText
    }
    if (goodsClassId) {
      data.goodsClassId = goodsClassId
    }
    data.priceSort = FilterAsc
    Http.requestByIgnoreLogin({
      url: api.goods.goods,
      data: data,
      success(res) {
        let content = res.data.data.content;
        console.log("asc", content);
        that.setData({
          content: content
        })
      }
    })
    that.setData({
      filterNum: index,
      FilterAsc: FilterAsc
    })

  },
  //销量
  onSales(e){
    var that = this
    let index = e.currentTarget.dataset.index
    var FilterAsc = that.data.FilterAsc
    if (FilterAsc == "asc") {
      FilterAsc = 'desc'
    } else {
      FilterAsc = 'asc'
    }
    console.log("3233", searchText, goodsClassId)
    let data = {};
    if (searchText) {
      data.searchText = searchText
    }
    if (goodsClassId) {
      data.goodsClassId = goodsClassId
    }
    data.salesSort = FilterAsc
    Http.requestByIgnoreLogin({
      url: api.goods.goods,
      data: data,
      success(res) {
        let content = res.data.data.content;
        console.log("asc", content);
        that.setData({
          content: content
        })
      }
    })
    that.setData({
      filterNum: index,
      FilterAsc: FilterAsc
    })
  },

  
  onlayout() {
    var that = this
    that.setData({
      layout: !that.data.layout
    })
    console.log(that.data.layout)
  },
  //显示/隐藏筛选弹窗
  showToast() {
    var that = this
    that.setData({
      sortToast: !that.data.sortToast
    })
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
  selectGoods() {
    var that = this
    // 请求分类数据
    Http.requestByIgnoreLogin({
      url: api.goods.goodsClass_list,
      success(res) {
        console.log("res", res.data.data)
        // let content = res.data.data.content;
        // that.setData({
        //   content: content
        // })
      },
    })
  },
  onLoad: function(options) {
    var that = this
    goodsClassId = options.goodsClassId;
    searchText = options.searchText;
    console.log("goodsClassId", goodsClassId)
    that.setData({
      imgurl: requestImageUrl
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
    var that = this
    if (goodsClassId) {
      // 请求分类数据
      Http.requestByIgnoreLogin({
        url: api.goods.goodsClass_list + "/" + goodsClassId + "/goods",

        method: "GET",
        success(res) {
          console.log("goodsClassId", goodsClassId)
          console.log("content", res.data.data)
          let content = res.data.data.content;
          that.setData({
            content: content
          })
        },
      })
    } else if (searchText) {
      Http.requestByIgnoreLogin({
        url: api.goods.goods + '?goodsName=' + searchText,
        // data: { goodsName: this.data.content},
        success(res) {
          let content = res.data.data.content;
          console.log("search", content);
          that.setData({
            content: content
          })
        }
      })
    }
    // 
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
    goodsClassId = null;
    searchText = null;
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