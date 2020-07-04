// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	goods:[
		{ price: '23',goodsNum:5},
		{ price: '23',goodsNum:5},
		{ price: '23',goodsNum:5},
		{ price: '23',goodsNum:5}
	]
  },
	//减
	OnMinus(e){
		var that=this
		let goods=that.data.goods
		let index=e.currentTarget.dataset.index
		let goodsNum=goods[index].goodsNum
		console.log(goodsNum)
		if (goodsNum>0) {
			goods[index].goodsNum = goods[index].goodsNum-1
			that.setData({
				goods:goods,
			})
		}else {
			return false
		}
		
	},
	//加
	OnAdd(e){
		var that=this
		let goods=that.data.goods
		let index=e.currentTarget.dataset.index
		let goodsNum=goods[index].goodsNum
		console.log(goodsNum)
			goods[index].goodsNum = goods[index].goodsNum+1
			that.setData({
				goods:goods,
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