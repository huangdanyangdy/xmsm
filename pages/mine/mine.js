import { api, requestImageUrl, _api_root } from "../../api.js"
import { Http } from "../../utils/http.js"
var http = new Http();
var app = getApp();
Page({
    data: {
        myOrder: [
            { status: '待付款', imgSrc: 'https://img.xmsmoo.com/upload/simuIcon/20191026160103423670.png' },
            { status: '待发货', imgSrc: 'https://img.xmsmoo.com/upload/simuIcon/20191026175645678958.png' },
            { status: '待收货', imgSrc: 'https://img.xmsmoo.com/upload/simuIcon/20191026175704961272.png' },
            { status: '待评价', imgSrc: 'https://img.xmsmoo.com/upload/simuIcon/20191026175719233427.png' },
        ],
        tools: [
            { toolsImg: 'https://img.xmsmoo.com/upload/simuIcon/20191026170234555032.png', toolsName: '分销中心' },
            { toolsImg: 'https://img.xmsmoo.com/upload/simuIcon/20191028091924799080.png', toolsName: '商家中心' },
            { toolsImg: 'https://img.xmsmoo.com/upload/simuIcon/20191028091945378672.png', toolsName: '我的会员' },
            { toolsImg: 'https://img.xmsmoo.com/upload/simuIcon/20191028092401997150.png', toolsName: '收货地址' },
            { toolsImg: 'https://img.xmsmoo.com/upload/simuIcon/20191028092434911481.png', toolsName: '会员中心' },
            { toolsImg: 'https://img.xmsmoo.com/upload/simuIcon/20191028092453801854.png', toolsName: '精挑细选' },
            { toolsImg: 'https://img.xmsmoo.com/upload/simuIcon/20191028092510460779.png', toolsName: '运输保险' },
            { toolsImg: 'https://img.xmsmoo.com/upload/simuIcon/20191028092527004094.png', toolsName: '电子发票' },
            { toolsImg: 'https://img.xmsmoo.com/upload/simuIcon/20191028092550651345.png', toolsName: '商家入驻' },
            { toolsImg: 'https://img.xmsmoo.com/upload/simuIcon/20191028092613260374.png', toolsName: '等级分销' },
            { toolsImg: 'https://img.xmsmoo.com/upload/simuIcon/20191028092712155740.png', toolsName: '优惠券' },
            { toolsImg: 'https://img.xmsmoo.com/upload/simuIcon/20191028092729153683.png', toolsName: '邀请码' },
        ]
    },
  toMemberCouppon(){
    wx.navigateTo({
      url: "/member/pages/member-coupon/member-coupon"
    })
  },
    toAllOrder() {
        wx.navigateTo({
            url: "/orders/pages/myOrders/myOrders"
        })
    }, //查看全部订单
    toOrderStatus(e) {
        let index = e.currentTarget.dataset.index
        index = Number(index) + 1
        wx.navigateTo({
            url: "/orders/pages/myOrders/myOrders?mineIndex=" + index
        })
    },//跳转各个状态的订单页面
 
  toCollect(){
    wx.navigateTo({
      url: "/member/pages/member-collect/member-collect"
    })
  },//跳转收藏夹
    
    onGoods(e) {
        var that = this
        let goodsId = e.currentTarget.dataset.goodsId
        console.log(goodsId)
        if (goodsId) {
            wx.navigateTo({
                url: '/orders/pages/goodsDetail/goodsDetail?goodsId=' + goodsId,
                success: (result) => {

                },
                fail: () => {},
                complete: () => {}
            });
        }
    },//跳转商品列表


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        that.setData({
            imgurl: requestImageUrl
        })

        // //请求店铺推荐数据
        Http.requestByIgnoreLogin({
            url: api.goodsRecommend.goodsRecommend,
            success(res) {
                let goodsRecommend = res.data.data;
                console.log("goodsRecommend", goodsRecommend)
                // evaList.forEach(item=>{
                //     item.goodsEvaluateAddTime = formatTimeTwo(item.goodsEvaluateAddTime,"Y-M-D h:m:s")
                // })
                that.setData({
                    goodsRecommend: goodsRecommend,
                })
            },
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
        var _this = this
        _this.setData({
            imgUrl: api.requestImageUrl
        })
        //请求用户数据
        Http.requestByIgnoreLogin({
            url: api.member.default,
            success(res) {
                console.log(res.data)
                if (res.data.status.toString() == "0") {
                    let data = res.data.data
                    if (!data.memberNickname) {
                        wx.showModal({
                            title: '提示',
                            content: '登录授权后方可进行该操作,是否进行登录授权',
                            success(res) {
                                if (res.confirm) {
                                    wx.navigateTo({
                                        url: '/pages/welcome/welcome'
                                    })
                                }
                            }
                        })
                    }
                    _this.setData({
                        member: data
                    })
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '登录失败,是否重新登录',
                        success(res) {
                            if (res.confirm) {
                                wx.navigateTo({
                                    url: '/pages/welcome/welcome'
                                })
                            }
                        }
                    })
                }
            },
            fail(err) {
                wx.showModal({
                    title: '提示',
                    content: '登录授权后方可进行该操作,是否进行登录授权',
                    success(res) {
                        if (res.confirm) {
                            wx.navigateTo({
                                url: '/pages/welcome/welcome'
                            })
                        }
                    }
                })
            }
        })
        // 收藏
      Http.requestByIgnoreLogin({
        url: api.goodsFavorites.goodsFavorites+"/count",
        success(res) {
          // let goodslist=[]
          let favoritesNum = res.data.data;
          // goodsFavorites.forEach(item=>{
          //   goodslist.push(item[1])
          // })
          _this.setData({
            favoritesNum: favoritesNum
          })
          console.log("favoritesNum", favoritesNum)
        },
      })
    //优惠
      Http.requestByIgnoreLogin({
        url: api.coupon.memberCoupon+"/count",
        success(res) {
          let couponsNum=res.data.data
          _this.setData({
            couponsNum: couponsNum
          })
          console.log("couponsNum", couponsNum)
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