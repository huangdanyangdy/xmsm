import {api,_api_root, requestImageUrl} from "../../../api";
import {Http} from "../../../utils/http";
var ordersId =""
var goodsId=""
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    OnRefundMoney() {
        wx.navigateTo({
          url: '/orders/pages/refund-money/refund-money?ordersId=' + ordersId + "&goodsId=" + goodsId,
            success: (result) => {

            },
            fail: () => {},
            complete: () => {}
        });
    },
    OnRefundGoods() {
        wx.navigateTo({
          url: '/orders/pages/refund-goods/refund-goods?ordersId=' + ordersId+"&goodsId="+goodsId,
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
      let that = this
      ordersId = options.ordersId
      goodsId = options.goodsId
      console.log("ordersId", ordersId)
        that.setData({
            imgurl: requestImageUrl
        })
        //  获取退款商品信息
      Http.requestByIgnoreLogin({
        url: _api_root + `myOrders/${ordersId}/goods?goodsId=${goodsId}`,
        success(res) {
          console.log("goods", res.data.data)
          that.setData({
            goods: res.data.data
          })
        }
      })
      //  发起退款
        // Http.requestByIgnoreLogin({
        //   url: api.refund.ordersRefund + "/?ordersId=" + ordersId,
        //   // data: { ordersId},
        //     success(res) {
        //       let data = res.data.data;
        //       console.log("data", data)
        //         that.setData({
        //           data: data,
        //         })
        //     },
        
        //  })
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