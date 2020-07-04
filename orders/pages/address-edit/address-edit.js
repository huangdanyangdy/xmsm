import { Http } from "../../../utils/http"
import { api } from "../../../api"
var addressProvince = ''
var addressCity = ''
var addressDistrict = ''
var addressDetail = ''
var memberName = ''
var memberTel = ''
var addressDefault = false
var addressId = ''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        region: [],
        switchstart: false,
        addressId: addressId
    },
    OnName(e) {
        var that = this
        console.log(e)
        memberName = e.detail.value
        that.setData({
            name: e.detail.value
        })

    },
    Onphone(e) {
        var that = this
        console.log(e)
        memberTel = e.detail.value
        that.setData({
            phone: e.detail.value
        })

    },
    Onaddress(e) {
        var that = this
        console.log(e)
        addressDetail = e.detail.value
        that.setData({
            address: e.detail.value
        })

    },
    // 
    OnaddressImport() {
        var that = this
        let region = that.data.region
        wx.chooseAddress({
            success(res) {
                region[0] = res.provinceName,
                    region[1] = res.cityName,
                    region[2] = res.countyName,
                    that.setData({
                        name: res.userName,
                        phone: res.telNumber,
                        region: region,
                        address: res.detailInfo
                    })
            }
        })
    },
    bindRegionChange: function(e) {
        var that = this
        addressProvince = e.detail.value[0]
        addressCity = e.detail.value[1]
        addressDistrict = e.detail.value[2]
        console.log('picker发送选择改变，携带值为', e.detail.value)
        that.setData({
            region: e.detail.value
        })
    },
    OnSwitch(e) {
        var that = this
        addressDefault = !that.data.switchstart
        that.setData({
            switchstart: !that.data.switchstart
        })
        console.log(that.data.switchstart)
    },
    //完成
    Ondone() {
        var that = this
        let region = that.data.region
        let data = { addressProvince: addressProvince, addressCity: addressCity, addressDistrict: addressDistrict, addressDetail: addressDetail, memberName: memberName, memberTel: memberTel, addressDefault: addressDefault }
        console.log("data", data)
      wx.showLoading({
        title: '加载中',
      })

     
        if (that.verify()) {
            if (addressId) {
                data.op = 'update',
                    Http.requestByIgnoreLogin({
                        url: api.address.address + "/" + addressId,
                        data: data,
                        method: "PUT",
                        success(res) {
                            wx.navigateBack({

                            })
                            console.log("res.data", res)
                        },
                         complete() {
                           setTimeout(function () {
                             wx.hideLoading()
                           }, 500)
                  }
                    })
            } else {
                Http.requestByIgnoreLogin({
                    url: api.address.address,
                    data: data,
                    method: "POST",
                    success(res) {
                    
                        wx.navigateBack({

                        })
                        console.log("res.data", res)
                    },
                    fail(err) {
                        console.log("err", err);
                    },
                    complete(){
                      setTimeout(function () {
                        wx.hideLoading()
                      }, 500)
                     
                    }
                })

            }
        }
    },
    verify() {
        let region = this.data.region
        if (!this.data.name || this.data.name === '') {
            wx.showToast({
                title: '请输入收货人姓名',
                icon: "none",
                duration: 1500
            })
            return false
        }
        if (!this.data.address || this.data.address === '') {
            wx.showToast({
                title: '详细地址',
                icon: "none",
                duration: 1500
            })
            return false
        }
        if (!region || region[2] === "全部" || region[2] === "区") {
            wx.showToast({
                title: '请选择正确的配送地址!',
                icon: "none",
                duration: 1500
            })
            return false
        }
        return true
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        addressId = options.addressId
        console.log("addressId", addressId)
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
        var region = that.data.region
        var name = that.data.name
        var phone = that.data.phone
        var address = that.data.address
        if (addressId) {
            Http.requestByIgnoreLogin({
                url: api.address.address + "/" + addressId,
                model: "GET",
                success(res) {
                    let addressMsg = res.data.data
                    console.log("===", res.data.data)
                    addressProvince = region[0] = addressMsg.addressProvince
                    addressCity = region[1] = addressMsg.addressCity
                    addressDistrict = region[2] = addressMsg.addressDistrict
                    addressDetail = address = addressMsg.addressDetail
                    memberName = name = addressMsg.memberName
                    memberTel = phone = addressMsg.memberTel
                    that.setData({
                        name: name,
                        phone: phone,
                        region: region,
                        address: address
                    })
                }
            })
        }

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
        addressDefault = ''
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