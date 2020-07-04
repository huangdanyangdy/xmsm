import { api,_api_root, requestImageUrl } from "../../../api";
import { Http } from "../../../utils/http";
var ordersId = ''
var goodsId = ''
var ordersShippingFee = ""
var goodsPrice = ""
var refundMoneyAll = ""
let refundWays = ""
let refundReason = ""
var refundExpress = ""
Page({
  data: {
situation:false,
refundWay:false,
situationNum:'',
refundWayNum:'',
    refundReason: [
      { reason: "商品描述的尺寸与实物不符" },
      { reason: "做工问题" },
      { reason: "质量问题" },
      { reason: "少件/漏发" },
      { reason: "未按约定时间发货" }
    ],
    RefundWays:[
      { ways:"上门取件(官方推荐)"},
      { ways: "自行寄回" }
    ],
    files: new Array()


  },
		// 退款原因弹窗
	OnSituation(e){
		 var that = this
		that.setData({
		    situation: !that.data.situation
		})
    console.log(that.data.situation)
	},
	//
	selectSituation(e){
		  var that = this
		let index = e.currentTarget.dataset.index
    refundReason = e.currentTarget.dataset.refundReason
		console.log(e)
		that.setData({
		    situationNum: index
		})
	},
  //退款说明
  Oninput(e){
    refundExpress = e.detail.value
    console.log(refundExpress,"refundExpress")
  },
	// 退货方式弹窗
	OnRefund(e){
		 var that = this
		that.setData({
		    refundWay: !that.data.refundWay
		})
	},

	//选择退货方式
	selectRefundWay(e){
		var that = this
		let index = e.currentTarget.dataset.index
    refundWays = e.currentTarget.dataset.refundWays
		console.log(e)
		that.setData({
		    refundWayNum: index
		})
	},

  //提交
  OnSubmit() {
    var that = this
    var files = that.data.files
    if (refundWays == '' || refundReason == '') {
      wx.showToast({
        title: '请选择退款原因或退款方式',
        icon: "none"
      })
    } else {
      // 提交退款信息
      let data = { ordersId: ordersId, goodsId: goodsId, refundReason: refundReason, refundExpress: refundExpress, refundPic: files }
      console.log(data, "submit")
      Http.requestByIgnoreLogin({
        url: api.refund.ordersRefund,
        method: "POST",
        data: data,
        success(res) {
          console.log("成功", res);
          if (res.data.status.toString() == "0") {
            wx.showModal({
              content: '退货退款申请成功',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.navigateBack({
                    delta: 2
                  })
                }
              }
            })
          } else {
            wx.showModal({
              content: '退货退款申请失败',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.navigateBack({
                    delta: 2
                  })
                }
              }
            })
          }
        }, fail(err) { console.log(err); }
      })
    }
  },


   // 上传照片
  selectPhoto() {
    var _this = this
    wx.showActionSheet({
      itemList: ['从相册选择'],
      success(res) {
        //拍照
        if (_this.data.files.length < 3) {
          // if (res.tapIndex === 0) {
          //   console.log("暂未开放拍照上传")
          // } else {
          wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album'],
            success(res) {
              console.log(res)
              // _this.data.files.forEach(item => {
              //   console.log("item.:" + item)
              // })
              var token = wx.getStorageSync("token");
              wx.uploadFile({
                url: api.uploadUrl,
                filePath: res.tempFilePaths[0],
                name: 'imageFile',
                header: {
                  'content-type': 'application/json', // 默认值
                  'token': token,
                  shopId: api.shopId
                },
                success(res) {
                  console.log("res.data", res.data, JSON.parse(res.data));
                  try {
                    let data = JSON.parse(res.data).data;
                    if (data.relativePath) {
                      let files = _this.data.files;
                      files.push(data.relativePath);
                      _this.setData({
                        // imgurl: res.tempFilePaths[0],
                        files: files
                      })
                      console.log("图片", _this.data.files);
                    }
                  } catch (error) {
                    console.log("上传错误", err);
                  }
                }
              })
              //上传图片到服务器
            }
          })
          // }
        } else {
          wx.showModal({
            title: '提示',
            content: '最多只能上传3张图片哦',
            success: function (res) {
              if (res.confirm) {

              } else {

              }
            }
          })
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    ordersId = options.ordersId
    goodsId = options.goodsId
    that.setData({
      imgurl: requestImageUrl
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
    let that = this;
    //  获取退款物流费用
    Http.requestByIgnoreLogin({
      url: api.myorders.myorders + "/" + ordersId,
      success(res) {
        console.log("orderInfo", res.data.data)
        var orderInfo = res.data.data
        that.setData({
          orderInfo: orderInfo
        })
      }
    })
    //  获取退款商品信息
    Http.requestByIgnoreLogin({
      url: _api_root + `myOrders/${ordersId}/goods?goodsId=${goodsId}`,
      success(res) {
        console.log("goods", res.data.data)
        let goods = res.data.data//退款金额
        that.setData({
          goods: goods
        })
      }
    })
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