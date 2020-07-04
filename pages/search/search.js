import { api, requestImageUrl, _api_root } from "../../api.js"
import { Http } from "../../utils/http.js"
var http = new Http();
var app = getApp();
var content=''
Page({

    /**
     * 页面的初始数据
     */
    data: {
     
    },

    /**
     * 生命周期函数--监听页面加载
     */
  Oninput(e){
    var that=this
    content = e.detail.value
    that.setData({
      content: content
    })
  },
  // 搜索商品
  searchGoods(){
    var that=this
    wx.navigateTo({
      url:"/pages/goods-list/goods-list?searchText="+this.data.content
    })
  },
  toGoodsList(e){
    var that = this
    let goodsValue=e.currentTarget.dataset.goodsValue
    wx.navigateTo({
      url: "/pages/goods-list/goods-list?searchText=" + goodsValue
    })
  },
  deleteSearch(){
    let that = this;
    // 历史搜索
    Http.requestByIgnoreLogin({
      url: api.search.history,
      method:"DELETE",
      success(res) {
        // console.log("fds",res.data)
        that.onShow()
      },
    })
  },
    onLoad: function(options) {
    
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
      let that = this;
      // 历史搜索
      Http.requestByIgnoreLogin({
        url: api.search.history,
        success(res) {
          let history = res.data.data.content;
          console.log("history", history)
          that.setData({
            history: history
          })
        },
      })
      // 热门搜索
      Http.requestByIgnoreLogin({
        url: api.search.hot,
        success(res) {
          let hot = res.data.data;
          console.log("hot", hot)
          that.setData({
            hot: hot
          })
          // 把热门搜索放到搜索框里
          if (content == '') {
            that.setData({
              content: hot[0].searchHotValue
            })
            console.log("content", that.data.content)
          }
        },
      })
      // 
      Http.requestByIgnoreLogin({
        url: _api_root + "searchDefault",
        success(res) {
          let Default = res.data.data;
          console.log("CO", Default)
          that.setData({
            content: Default.searchDefaultValue
          })
        },
      })
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