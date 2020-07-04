// pages/subject-detail/subject-detail.js
import { wxParse } from "../../wxParse/wxParse.js";
import { Http } from "../../utils/http.js";
import { api, _api_root } from "../../api.js";
var subjectId
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        subjectId = options.subjectId
        console.log("subjectId", subjectId)
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
            //
        Http.requestByIgnoreLogin({

                url: api.home.subject_list + "/" + subjectId,
                method: 'get',
                success(res) {
                    console.log("ww", res.data)
                }
            })
            // 
        Http.requestByIgnoreLogin({

            url: _api_root + "subjectDetail/" + subjectId,
            method: 'get',
            success(res) {
                console.log("ww22", res.data.data)
                wxParse('detail', 'html', res.data.data.subjectContent, that)
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