
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:20,
    CancelOrder:false
  },
  //取消订单
  onCancelOrder(e){
    var that=this
    console.log(e)
    that.setData({
      CancelOrder:!that.data.CancelOrder
    })
  },
  //
  selectConpons(e) {
    var that = this
    let index = e.currentTarget.dataset.index
    console.log(e)
    that.setData({
      conponsNum: index
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

  },

})