import { api } from "../../../api"
import { Http } from "../../../utils/http"
var cartIds = null;
var goodsNums = ''
var goodsId = ''
var address = ''
var memberCouponId = ''
var memberName, memberTel, addressProvince, addressCity, addressDistrict, addressDetail, memberCouponId
Page({

    /**
     * 页面的初始数据
     */
    data: {
        conpons: false,
        conponsNum: 0,
        starNum: 3
    },
    //优惠券
    onConpons() {
        var that = this
        Http.requestByIgnoreLogin({
            url: api.coupon.cartMemberCoupon,
            data: { cartIds: cartIds },
            success(res) {
                console.log("res", res.data.data)
                that.setData({
                    conponList: res.data.data
                })
            }
        })
        that.setData({
            conpons: !that.data.conpons
        })
    },
    // 
    selectConpons(e) {
        var that = this
        let memberCouponId = e.currentTarget.dataset.memberCouponId
        memberCouponId = memberCouponId
        console.log(e)
        that.setData({
            conponsNum: memberCouponId
        })
    },
    // 
    onAddress() {
        wx.setStorageSync("cartIds", cartIds);
        wx.navigateTo({
            url: '/orders/pages/address-list/address-list',
            success: (result) => {

            },
            fail: () => {},
            complete: () => {}
        });
    },
    //提交订单
    GetOrder() {
        var that = this

        let data = {
            cartIds: cartIds,
            memberName: address.memberName,
            memberTel: address.memberTel,
            addressProvince: address.addressProvince,
            addressCity: address.addressCity,
            addressDistrict: address.addressDistrict,
            addressDetail: address.addressDetail,
        }
        console.log("data", data)
        if (cartIds) {
            wx.showToast({
                title: '订单创建中',
                icon: 'loading',
                duration: 3000,
                mask: true
            })
            if (memberCouponId) {
                data.memberCouponId = memberCouponId
            }
            Http.requestByIgnoreLogin({
                url: api.order.create,
                data: data,
                methods: "POST",
                success(res) {
                    console.log("res.data", res.data)
                    if (res.data.status.toString() == "1") {

                        wx.showModal({

                            content: res.data.msg,
                        })
                    }
                    if (res.data.status.toString() == "0") {
                        wx.showToast({
                            title: '提交支付',
                            icon: 'none',
                            image: '',
                            duration: 1500,
                            mask: false
                        });
                        if (res.data.data.ordersId) {
                            let ordersId = res.data.data.ordersId
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
                                                    duration: 1500,
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
                        } else {
                            wx.showToast({
                                title: '创建订单出错,请重试',
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

                }
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options, "options")
        cartIds = options.cartIds
        goodsNums = options.goodsNum
        goodsId = options.goodsId
        console.log("onload", cartIds);
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
        console.log("adfdfdsfdfds", wx.getStorageSync("address"))

        console.log("onshow", cartIds);
        address = wx.getStorageSync("address");
        console.log("address", address)

        that.setData({
            imgurl: api.requestImageUrl,
            address: address
        })
        Http.requestByLogin({
            url: api.order.confirm,
            data: { cartIds: cartIds },
            success(res) {
                console.log("orders", res.data.data)
                that.setData({
                    orders: res.data.data,
                    cartList: res.data.data.cartList,
                    // address: res.data.data.address
                })
                console.log("cartList", res.data.data.cartList)
            }
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
        cartIds = null
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