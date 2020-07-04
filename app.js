//app.js
import { Http } from './utils/http.js';
import { api } from "./api.js";
var http = new Http();
App({
    onLaunch: function() {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
                success: loginRes => {
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    if (loginRes.code) {
                        Http.requestByIgnoreLogin({
                            url: api.login,
                            data: {
                                code: loginRes.code
                            },
                            success(res) {
                                console.log(res.data.data);
                                wx.setStorageSync('token', res.data.data.token);
                                wx.setStorageSync('memberId', res.data.data.memberId);
                                wx.setStorageSync("sessionKey", res.data.data.sessionKey);
                            },
                            fail(err) {
                                console.log(err);
                            }
                        })
                    }
                }
            })
            // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        index_toastStatus: 1, //首页优惠券弹窗状态
        userInfo: null,
        tabbar:  {
            color:   "#777777",
            selectedColor:   "#FF443A",
            backgroundColor:   "#ffffff",
            borderStyle:   "red",
            list:  [{
                    "text": "首页",
                    "pagePath": "pages/index/index",
                    "iconPath": "/pages/images/home.png",
                    "selectedIconPath": "/pages/images/home_0.png"
                },
                {
                    "text": "分类",
                   "pagePath": "pages/goods-class/goods-class",
                    "iconPath": "/pages/images/class.png",
                    "selectedIconPath": "/pages/images/class_0.png"
                },
                {
                    "text": "购物车",
                    "pagePath": "pages/cart/cart",
                    "iconPath": "/pages/images/buy.png",
                    "selectedIconPath": "/pages/images/buy_0.png"
                },
                {
                    "text": "我的",
                    "pagePath": "pages/mine/mine",
                    "iconPath": "/pages/images/my.png",
                    "selectedIconPath": "/pages/images/my_0.png"
                }
            ]
        }
    }
})