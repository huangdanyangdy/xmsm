// pages/goodsDetail/goodsDetail.js
var goodsId = ''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        starStatus: true, //收藏状态
        couponUse: [{
            use: true
        }, {
            use: true
        }, { use: true }], //优惠使用状态
        couponMaskStatus: false, //优惠弹窗状态
        sepcMaskStatus: false, //规格弹窗状态
        paramStatus: false, //参数弹窗状态
        specNum: 1 //规格商品数量
    },

    collectGoods() {
        let that = this
        that.setData({
            starStatus: !that.data.starStatus
        })
    }, //收藏事件

    getCoupon(e) {
        let that = this
        let index = e.currentTarget.dataset.index;
        console.log(index)
        let couponUse = this.data.couponUse;
        couponUse[index].use = false;
        that.setData({
            couponUse: couponUse
        })
        wx.showToast({
            icon: 'none',
            title: "领取成功"
        })
    }, //领取优惠券事件
    getCouSuccess() {
        let that = this
        this.setData({
            couponMaskStatus: !that.data.couponMaskStatus
        })
    }, //领取优惠券成功
    amouSub() {
        let that = this;
        if (that.data.specNum > 1) {
            let specNum = that.data.specNum - 1
            that.setData({
                specNum: specNum
            })
        }
    }, //减少商品
    amouAdd() {
        let that = this;
        let specNum = that.data.specNum + 1
        that.setData({
            specNum: specNum
        })
    }, //添加商品
    showSpec() {
        let that = this;
        that.setData({
            sepcMaskStatus: !that.data.sepcMaskStatus
        })
    }, //展现/取消规格弹窗
    showParams() {
        let that = this;
        that.setData({
            paramStatus: !that.data.paramStatus
        })
    }, //查看规格参数
    toEvalDet() {
        wx: wx.navigateTo({
            url: '/orders/pages/evalDetail/evalDetail',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    }, //查看评论详情
    toBuyNow() {
        wx.navigateTo({
            url: '/orders/pages/orders-sure/orders-sure',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        goodsId = options.goodsId
        console.log(goodsId)
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