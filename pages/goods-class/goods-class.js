import { api, requestImageUrl, _api_root } from "../../api.js"
import { Http } from "../../utils/http.js"
var http = new Http();
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        navClassNum: 0,
        goodsClassNum:0
    },
    toSearch(){
        wx.navigateTo({
            url:'/pages/search/search'
        })
    },//跳转搜索页面
    // 
    onClass(e) {
        console.log(e)
        var that = this
        let index = e.currentTarget.dataset.index
        that.setData({
            navClassNum: index,
            goodsClassNum:index
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        that.setData({
            imgurl: requestImageUrl
        })
        // 请求分类数据
        Http.requestByIgnoreLogin({
            method: 'get',
            url: api.class.getById,
            success(res) {
                let goodsClass = res.data.data;
                console.log("goodsClass",res.data.data);
                that.setData({
                    goodsClass: goodsClass
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