// orders/pages/refund-msg/refund-msg.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        topSate: true,
        refundState: 30,
    },
    //
    Ontop() {
        var that = this
        that.setData({
            topSate: !that.data.topSate
        })
    },
    //物流
    OnLogistics() {
        wx.navigateTo({
            url: '/orders/pages/refund-logistics/refund-logistics',
            success: (result) => {

            },
            fail: () => {},
            complete: () => {}
        });
    },
    //申请客服
    OnCustomer() {
        wx.navigateTo({
            url: '/orders/pages/refund-customer/refund-customer',
            success: (result) => {

            },
            fail: () => {},
            complete: () => {}
        });
    },
    //协商记录
    OnRecording() {
        wx.navigateTo({
            url: '/orders/pages/refund-recording/refund-recording',
            success: (result) => {

            },
            fail: () => {},
            complete: () => {}
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      var ordersId=options.ordersId
      console.log("ordersId",ordersId)
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