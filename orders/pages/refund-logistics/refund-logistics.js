// orders/pages/refund-logistics/refund-logistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	logistics:false
  },
// 退款原因
	Onlogistics(e){
		 var that = this
		that.setData({
		    logistics: !that.data.logistics
		})
	},
	//
	selectSituation(e){
		  var that = this
		let index = e.currentTarget.dataset.index
		console.log(e)
		that.setData({
		    situationNum: index
		})
	},
	OnSituationFinish(e){
		var that=this
		that.setData({
			logistics: !that.data.logistics
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