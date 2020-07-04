// pages/paySuccess/paySuccess.js
import { Http } from "../../../utils/http.js";
import { api } from "../../../api.js";
var http = new Http();
var ordersId = null;

Page({
    data: {
        payPromotion: {},
        imgUrl: api.requestImageUrl
    },
    toMyOrder() {
        wx.navigateTo({
            url: "/orders/pages/myOrders/myOrders?ordersId=" + ordersId
        })
    },
    toIndex() {
        wx.reLaunch({
            url: "/pages/index/index"
        })
    },
    toOrderDetail() {
        wx.navigateTo({
            url: "/orders/pages/orders-detail/orders-detail?ordersId=" + ordersId
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let _this = this;
        ordersId = options.ordersId;
        if (ordersId) {
            Http.requestByIgnoreLogin({
                url: api.myorders.myorders + "/" + ordersId,
                // data: { ordersId: ordersId },
                success(res) {
                    _this.setData({
                        orderDetail: res.data.data
                    })
                    console.log(res, "======")
                },
                fail(err) { console.log(err) }
            })
            Http.requestByIgnoreLogin({
                url: api.coupon.payPromotion,
                success(res) {
                    console.log("支付有礼", res);
                    if (res.data.status.toString() == "0") {
                        let payPromotions = res.data.data;
                        if (payPromotions && payPromotions.length > 0) {
                            _this.setData({
                                payPromotion: payPromotions[0]
                            })
                        }
                    }
                }
            })
        }
    },
    getPayCoupon(e) {
        let payPromotion = this.data.payPromotion;
        let couponId = payPromotion.payPromotionPresentCouponId;
        Http.requestByIgnoreLogin({
            url: api.coupon.get + couponId,
            success(res) {
                console.log(res);
                if (res.data.status.toString() == "0") {
                    wx.showToast({
                        title: '领取成功',
                        icon: 'none',
                        image: '',
                        duration: 1500,
                        mask: false,
                        success: (result) => {

                        },
                        fail: () => {},
                        complete: () => {}
                    })
                } else {
                    wx.showToast({
                        title: '领取失败',
                        icon: 'none',
                        image: '',
                        duration: 1500,
                        mask: false,
                        success: (result) => {

                        },
                        fail: () => {},
                        complete: () => {}
                    });
                }
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