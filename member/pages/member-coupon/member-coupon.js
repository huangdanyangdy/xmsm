// member/pages/member-coupon/member-coupon.js
import {Http} from "../../../utils/http";
import {api} from "../../../api";
import {formatTimeTwo} from "../../../utils/util";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    // couponUse: [{
    //   use: true
    // }, {
    //   use: true
    // }, { use: true }], //优惠使用状态
    memberCoupon:[],
  },
  changeCoupon(e){
    var self=this;
    let index=e.currentTarget.dataset.index;
    self.setData({
      index:index
    })
  },
  //去使用优惠券
  toUseCoupon(e){
    wx.navigateTo({
      url: '/pages/goods-class/goods-class',
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    Http.requestByIgnoreLogin({
      url: api.coupon.memberCoupon,
      success(res) {
        let coupon = res.data.data;
        console.log(coupon);
        let now = new Date().getTime();
        let memberCoupon = [];
        let useCoupon =[];
        let usedCoupon = [];
        let expiryCoupon = [];
        coupon.forEach(item => {
          item.couponExpiryTimeFormat= formatTimeTwo(item.couponExpiryTime, "Y-M-D h:m");
          item.couponDrawTimeFormat = formatTimeTwo(item.couponDrawTime, "Y-M-D h:m");
          if(item.couponUse){
            item.couponState = "used";
            usedCoupon.push(item);
          }else{
            var residual= item. couponExpiryTime - now;
            if (residual<=0){
              item.couponState = "pass";
              expiryCoupon.push(item);
            }else{
              item.couponState = "use";
              useCoupon.push(item);
            }
          }
        });
        memberCoupon.push(useCoupon);
        memberCoupon.push(usedCoupon);
        memberCoupon.push(expiryCoupon);
        that.setData({
          memberCoupon:memberCoupon
        });
        // that.setData({
        //   coupon: coupon,
        // })
        console.log("coupon", that.data.memberCoupon)
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})