// pages/cart/cart.js
import { api, } from "../../api"
import { Http } from "../../utils/http"
var goodsPrices = 0
var goodsNums = 0
var cartIds = []
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsNums: goodsNums,
      goodsPrices: 0,
        allselect: false,
        goods: [
            { price: '23', goodsNum: 5 },
            { price: '23', goodsNum: 5 },
            { price: '23', goodsNum: 5 },
            { price: '23', goodsNum: 5 }
        ]
    },
    //计算价格
    getGoodsPrices(e) {
        var that = this
        let cartlist = that.data.cartlist
        let goodsPrices = 0.00
        let goodsNums = 0
      if (cartlist) {
          cartlist.forEach(item => {
            if (item.cartChoose) {
              goodsPrices += item.goodsNum * item.goodsPrice
              goodsNums += item.goodsNum
            }
          })
          that.setData({
            goodsPrices: goodsPrices.toFixed(2),
            goodsNums: goodsNums
          })
          console.log("goodsPrices", that.data.goodsPrices)
        }
       
    },
    //全选
    OnAllselect() {
        var that = this
        let cartlist = that.data.cartlist
        cartlist.forEach(item => {
            item.cartChoose = !that.data.allselect
        });
        that.setData({
            cartlist: cartlist,
            allselect: !that.data.allselect
        })
        that.getGoodsPrices()
    },
    //减
    OnMinus(e) {
        var that = this
        let cartlist = that.data.cartlist
        let index = e.currentTarget.dataset.index
        let cartId = e.currentTarget.dataset.cartId
        let goodsNum = cartlist[index].goodsNum
        console.log(cartId)
        Http.requestByIgnoreLogin({
            url: api.cart.addCart + "/" + cartId,
            data: { operation: 'sub' },
            method: "PUT",
            success(res) {
                console.log(res.data)
                if (goodsNum > 1) {
                    cartlist[index].goodsNum = cartlist[index].goodsNum - 1
                    that.setData({
                        cartlist: cartlist,
                    })
                    console.log(cartlist)
                    that.getGoodsPrices()
                } else {
                    that.onShow()
                }
            },
            fail(err) {
                console.log(err);

            }

        })


    },
    //加
    OnAdd(e) {
        var that = this
        let cartlist = that.data.cartlist
        let index = e.currentTarget.dataset.index
        let cartId = e.currentTarget.dataset.cartId
        let goodsNum = cartlist[index].goodsNum
        Http.requestByIgnoreLogin({
            url: api.cart.addCart + "/" + cartId,
            data: { operation: 'add' },
            method: "PUT",
            success(res) {
                console.log(res.data)
                cartlist[index].goodsNum = cartlist[index].goodsNum + 1
                that.setData({
                    cartlist: cartlist,
                })
                that.getGoodsPrices()
            }
        })

    },
    // 
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
    },
    //选择
    OnCartChoose(e) {
        var that = this
        let cartlist = that.data.cartlist
        let index = e.currentTarget.dataset.index
        let allselect = that.data.allselect
        let cartChoose = cartlist[index].cartChoose
        let selects = true
        console.log(index)
        cartlist[index].cartChoose = !cartChoose
        that.setData({
            cartlist: cartlist
        })
        for (let i = 0; i < cartlist.length; i++) {
            selects = selects && cartlist[i].cartChoose
        }

        if (selects == true) {
            allselect = true
        } else {
            allselect = false
        }
        that.setData({
            allselect: allselect
        })
        console.log(allselect)
        that.getGoodsPrices()
    },
    //去结算
    OnSettle() {
        var that = this
        var cartlist = that.data.cartlist
      cartIds = [];
        cartlist.forEach(item => {
            if (item.cartChoose) {
                cartIds.push(item.cartId)
            }
        })
        if (cartIds.length < 1) {
            wx.showModal({
                content: '至少要选择一样商品',
                showCancel: false,
                confirmText: '确定',
                confirmColor: '#3CC51F',
                success: (result) => {
                    if (result.confirm) {
                        return false;
                    }
                }
            })
        } else {
            wx.navigateTo({
                url: '/orders/pages/orders-sure/orders-sure?cartIds=' + cartIds
            });
        }
        console.log("cartIds", cartIds)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      this.getGoodsPrices()
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
        that.setData({
            imgurl: api.requestImageUrl,
              allselect: false
        })
        Http.requestByLogin({
            url: api.cart.addCart,
            success(res) {
                let cartlist = res.data.data.content
                cartlist.forEach(item => {
                    item.cartChoose = false
                });
                that.setData({
                    cartlist: cartlist
                })
              that.getGoodsPrices()
                console.log("cartlist", res.data.data)
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
      var that=this
      cartIds=[];

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