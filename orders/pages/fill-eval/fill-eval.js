// orders/pages/fill-eval/fill-eval.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starNum1:-1,
    starNum2:-1,
    starNum3:-1,
    starNum4:-1,

  },

  blackbtp1(e){
    let index = e.currentTarget.dataset.index;
    console.log(index);
    this.setData({
      starNum1:index
    })
  },//点亮星星
  blackbtp2(e){
    let index = e.currentTarget.dataset.index;
    console.log(index);
    this.setData({
      starNum2:index
    })
  },//点亮星星
  blackbtp3(e){
    let index = e.currentTarget.dataset.index;
    console.log(index);
    this.setData({
      starNum3:index
    })
  },//点亮星星
  blackbtp4(e){
    let index = e.currentTarget.dataset.index;
    console.log(index);
    this.setData({
      starNum4:index
    })
  },//点亮星星

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