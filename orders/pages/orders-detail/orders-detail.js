import { Http } from "../../../utils/http"
import { api } from "../../../api"
import { formatTimeTwo } from "../../../utils/util"
var ordersId = ''
var ordersSn = ''
var reason
Page({

    /**
     * 页面的初始数据
     */
    data: {
        state: 10,
        CancelOrder: false,
        refundReason: [
            { reason: "我不想买了" },
            { reason: "未按约定时间发货" },
            { reason: "拍多/多拍/不喜欢" },
            { reason: "其他原因" },
        ]
    },
    //取消订单
    onCancelOrder(e) {
        var that = this
        console.log(e)
        that.setData({
            CancelOrder: !that.data.CancelOrder
        })
    },

    //退款理由
    selectReason(e) {
        var that = this
        let index = e.currentTarget.dataset.index
        let reasonContent = e.currentTarget.dataset.reason
        reason = reasonContent
        console.log("reason", reason)
        console.log(e)
        that.setData({
            reasonNum: index
        })
    },
    //确认取消
    comfirmCancel(e) {
        var that = this
        console.log("reason", reason)
        if (reason) {
            Http.requestByIgnoreLogin({
                url: api.myorders.myorders + "/" + ordersId,
                data: { reason: reason },
                method: "DELETE",
                success(res) {
                    wx.showToast({
                        title: '取消成功!'
                    })
                    wx.navigateBack({

                        })
                        // let data = res.data.data;
                    console.log("data", res)
                },
            })
            that.setData({
                CancelOrder: !that.data.CancelOrder
            })
        } else {
            wx.showToast({
                title: "请选择理由",
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

    },
    // 申请退款
    orderRefund(e) {
      var goodsId=e.currentTarget.dataset.goodsId
        wx.navigateTo({
            //  url: '/orders/pages/refund-goodsList/refund-goodsList?ordersId='+ordersId,
          url: '/orders/pages/service/service?ordersId=' + ordersId + "&goodsId=" + goodsId,
        })
    },
    //
    topay() {
        if (ordersId) {
            Http.requestByIgnoreLogin({
                url: api.pay.pay,
                data: { ordersId: ordersId },
                success(resPay) {
                    if (resPay.data.status.toString() == "0") {
                        wx.requestPayment({
                            timeStamp: resPay.data.data.timeStamp,
                            nonceStr: resPay.data.data.nonceStr,
                            package: resPay.data.data.packages,
                            signType: 'MD5',
                            paySign: resPay.data.data.paySign,
                            success(result) {
                                console.log("支付成功")
                                let timeout = setTimeout(function() {
                                    wx.reLaunch({
                                        url: '/orders/pages/pay-result/pay-result?ordersId=' + ordersId,
                                    })
                                    clearTimeout(timeout);
                                }, 500)
                            },
                            fail(err) {
                                wx.showToast({
                                    title: '支付失败',
                                    icon: 'none',
                                    image: '',
                                    duration: 3000,
                                    mask: false,
                                    success: (result) => {
                                        wx.redirectTo({
                                            url: '/orders/pages/orders-detail/orders-detail?ordersId=' + ordersId,
                                        })
                                    }
                                });
                            }
                        })
                    }
                }
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        ordersId = options.ordersId
        console.log("ordersId", ordersId)


    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    onShow: function() {
        var that = this
        that.setData({
                imgurl: api.requestImageUrl
            })
            // 订单详情
        Http.requestByIgnoreLogin({
                url: api.myorders.myorders + "/" + ordersId,
                success(res) {
                    console.log("orders", res.data)
                    let orders = res.data.data
                    console.log("ordersSn", ordersSn)
                    orders.ordersCreateTime = formatTimeTwo(orders.ordersCreateTime, "Y-M-D h:m:s")
                    that.setData({
                        orders: orders
                    })

                }

            })
            // 订单商品
        Http.requestByIgnoreLogin({
                url: api.myorders.myorders + "/" + ordersId + "/ordersGoods",
                success(res) {
                    console.log("goods", res.data)
                    that.setData({
                        goodsList: res.data.data
                    })
                }

            })
            // 订单地址
        Http.requestByIgnoreLogin({
                url: api.myorders.myorders + "/" + ordersId + "/ordersAddress",
                success(res) {
                    console.log("address", res.data)
                    that.setData({
                        address: res.data.data
                    })
                }

            })
            // 订单sn

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