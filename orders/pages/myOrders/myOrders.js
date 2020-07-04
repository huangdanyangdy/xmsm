
// orders/pages/myOrders/myOrders.js
import { Http } from "../../../utils/http";
import { _api_root, api, requestImageUrl } from "../../../api";
import { formatTimeTwo } from "../../../utils/util"
var ordersId = ''
var reason
Page({

    /**
     * 页面的初始数据
     */
    data: {
        status: 0,
        orderStatus: [
            { orderName: '全部', status: 0 },
            { orderName: '待付款', status: 10 },
            { orderName: '待发货', status: 20 },
            { orderName: '待收货', status: 30 },
            { orderName: '待评价', status: 40 },
        ],
        refundReason: [
            { reason: "我不想买了" },
            { reason: "未按约定时间发货" },
            { reason: "拍多/多拍/不喜欢" },
            { reason: "其他原因" },
        ]
    },
    changeOrders(e) {
        let that = this;
        let status = e.currentTarget.dataset.status
        let index = e.currentTarget.dataset.index
        that.setData({
            status: index
        })
    }, //切换订单状态
    /**
     * 生命周期函数--监听页面加载
     */
    toOrderMsg(e) {
        let that = this
        var ordersId = e.currentTarget.dataset.ordersId
        that.setData({
            ordersId: ordersId
        })
        wx.navigateTo({
            url: '/orders/pages/orders-detail/orders-detail?ordersId=' + ordersId,
        })
    },
    onLoad: function(options) {
        // console.log(options)
        let that = this
        that.setData({
            status: options.mineIndex, //个人中心订单状态
            imgurl: requestImageUrl
        })
    },
    //取消订单
    onCancelOrder(e) {
        var that = this
        ordersId = e.currentTarget.dataset.ordersId
        console.log(ordersId)
        that.setData({
            CancelOrder: !that.data.CancelOrder
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
        that.onShow()
    },

    //取消理由
    selectReason(e) {
        var that = this
        let index = e.currentTarget.dataset.index
        reason = e.currentTarget.dataset.reason
        console.log("reason", reason)
        console.log(e)
        that.setData({
            reasonNum: index
        })
    },
    //确认收货
    OnReceive() {
        var that = this
        Http.requestByIgnoreLogin({
            url: api.myorders.myorders + "/" + ordersId,
            method: "GET",
          data: { ordersId: ordersId, op: 'Received' },
            success(res) {
                console.log("ddd", res.data)

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
        let that = this
            //  获取订单列表
        Http.requestByIgnoreLogin({
            url: api.order.orderList,
            data:{pageSize:50},
            success(res) {
                let ordersVOList = res.data.data.ordersVOList;
                console.log("orderList", ordersVOList)
                let orderslist = []
                orderslist.push(new Array());
                orderslist.push(new Array());
                orderslist.push(new Array());
                orderslist.push(new Array());
                orderslist.push(new Array());
                orderslist[0] = ordersVOList

                console.log(orderslist)
                ordersVOList.forEach(item => {
                    item.ordersState = item.ordersState.toString()
                    if (item.ordersState == 10) {
                        orderslist[1].push(item)
                    }
                    if (item.ordersState == 20) {
                        orderslist[2].push(item)
                    }
                    if (item.ordersState == 30) {
                        orderslist[3].push(item)
                    }
                    if (item.ordersState == 40) {
                        orderslist[4].push(item)
                    }
                });
                console.log("orderslist", orderslist)
                that.setData({
                    orderslist: orderslist
                })

            },
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