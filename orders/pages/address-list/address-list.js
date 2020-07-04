// orders/pages/address-list/address-list.js
import { Http } from "../../../utils/http"
import { api } from "../../../api"
var addressId = ''
var memberName, memberTel, addressProvince, addressCity, addressDistrict, addressDetail
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    //选择地址
    onAddress(e) {
        var that = this
        let addressId = e.currentTarget.dataset.addressId
        let address = that.data.address
        let index = e.currentTarget.dataset.index
        console.log(address[index])
        addressId = addressId
        Http.requestByIgnoreLogin({
            url: api.address.address + "/" + addressId,
            success(res) {
                console.log("res.data", res.data)
                that.setData({
                    address: address
                })
                if (!addressId == '') {
                    wx.setStorageSync("address", address[index]);
                    wx.navigateBack({

                    })
                }
                console.log("address", address[index])
            }
        })

    },
    // 删除
    Ondelete(e) {
        var that = this
        let addressId = e.currentTarget.dataset.addressId
        Http.requestByIgnoreLogin({
            url: api.address.address + "/" + addressId,
            method: "DELETE",
            success(res) {
                that.onShow()
                wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    image: '',
                    duration: 300,
                    mask: false,
                });
                console.log(res.data)
            }
        })
    },
    // 微信导入
    OnwxAddress() {
        var that = this
        wx.chooseAddress({
            success(res) {
                let address = {}
                address.memberName = res.userName
                address.addressProvince = res.provinceName
                address.addressCity = res.cityName
                address.addressDistrict = res.countyName
                address.addressDetail = res.detailInfo
                address.memberTel = res.telNumber
                wx.setStorageSync("address", address);
                console.log("address", address)
                wx.navigateBack({

                })
            }
        })
    },
    // 新增地址
    OnaddAddress() {
        wx.navigateTo({
            url: '/orders/pages/address-edit/address-edit',
            success: (result) => {},
            fail: () => {},
            complete: () => {}
        });
    },
    // 编辑
    OnaddressSet(e) {
        var that = this
        let addressId = e.currentTarget.dataset.addressId
        if (addressId) {
            wx.navigateTo({
                url: '/orders/pages/address-edit/address-edit?addressId=' + addressId,
                success: (result) => {

                },
                fail: () => {},
                complete: () => {}
            });
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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
        Http.requestByIgnoreLogin({
            url: api.address.address,
            success(res) {
                console.log("res.data", res.data.data.content)
                let address = res.data.data.content
                that.setData({
                    address: address
                })
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