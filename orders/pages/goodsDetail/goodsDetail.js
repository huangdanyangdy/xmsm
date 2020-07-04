// pages/goodsDetail/goodsDetail.js
import { wxParse } from "../../../wxParse/wxParse.js"
import { Http } from "../../../utils/http";
import { _api_root, api, requestImageUrl } from "../../../api";
import { formatTimeTwo } from "../../../utils/util"
var couponId = '1';
var goodsId = '';
var skuSelectArr = [];
var skus;
var resultIndex = '';
var goodsNum = 1;
var goodsSkuId = '';
var recommendGoodsId = '';
var recommendShopId = ''
var couponId = '';
var cartId = [];
var goodsSku;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        starStatus: false, //收藏状态
        couponUse: [{
            use: true
        }, {
            use: true
        }, { use: true }], //优惠使用状态
        couponMaskStatus: false, //优惠弹窗状态
        sepcMaskStatus: false, //规格弹窗状态
        // goodsSkuStorage:0,//规格仓库剩余
        paramStatus: false, //参数弹窗状态
        specNum: 1, //规格商品数量
        specStock: 0,
        specActiveNum: ''
    },
    toIndex() {
        wx.navigateTo({
            url: '/pages/index/index',
        })
    },
    //收藏事件
    addAttention(e) {
        let that = this
        that.setData({
            starStatus: !that.data.starStatus
        })
        if (that.data.starStatus) {
            Http.requestByIgnoreLogin({
                url: api.goodsFavorites.goodsFavorites + "/" + goodsId,
                method: "POST",
                success(res) {
                    let data = res.data;
                    console.log("goodsFavorites", data)
                    wx.showToast({
                        icon: 'none',
                        title: res.data.msg,
                        duration: 1500,
                        mask: false,
                        success: (result) => {

                        },
                        fail: () => {},
                        complete: () => {}
                    });
                },
            })
        } else {
            Http.requestByIgnoreLogin({
                url: api.goodsFavorites.goodsFavorites + "/" + goodsId,
                method: "DELETE",
                success(res) {
                    let data = res.data;
                    console.log("goodsFavorites", data)
                    wx.showToast({
                        icon: 'none',
                        title: res.data.msg,
                        duration: 1500,
                        mask: false,
                        success: (result) => {

                        },
                        fail: () => {},
                        complete: () => {}
                    });
                },
            })
        }

    },

    getCoupon(e) {
        let that = this
        let index = e.currentTarget.dataset.index;
        let coupon = that.data.coupon
        let couponId = e.currentTarget.dataset.couponId
        coupon[index].choose = !that.data.coupon[index].choose
        couponId = coupon[index].couponId.toString()
            //请求优惠券数据
        Http.requestByIgnoreLogin({
            url: api.coupon.list + "/" + couponId,
            method: "POST",
            success(res) {
                let data = res.data;
                console.log("coupon", data)
                that.setData({
                    coupon: coupon
                })
                wx.showToast({
                    icon: 'none',
                    title: "领取成功"
                })
            },
        })
    }, //领取优惠券事件

    getCouSuccess() {
        let that = this
        this.setData({
            couponMaskStatus: !that.data.couponMaskStatus
        })
    }, //领取优惠券成功

    amouSub() {
        let that = this;
        if (that.data.specNum > 1) {
            let specNum = that.data.specNum - 1
            that.setData({
                specNum: specNum
            })
            goodsNum = specNum
            console.log("goodsNum", goodsNum)
        }
    }, //减少商品
    amouAdd() {
        let that = this;
        let specNum = that.data.specNum + 1
        that.setData({
            specNum: specNum
        })
        goodsNum = specNum
        console.log("goodsNum", goodsNum)
    }, //添加商品


    // 加入购物车
    OnAddCart() {
        Http.requestByIgnoreLogin({
            url: api.cart.addCart,
            method: 'POST',
            data: { goodsNum: goodsNum, goodsId: goodsId, goodsSkuId: goodsSkuId },
            success: (res) => {
                wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 1500,
                    mask: false,
                });
                console.log("res", res)
            },
            fail: (res) => {

            },
            complete: () => {}
        });
    },

    toBuyNow() {
        var that = this
            // console.log("goodsNum=",goodsNum,"goodsId=",goodsId,"goodsSkuId=",goodsSkuId)
        if (goodsSkuId == '') {
            wx.showToast({
                title: "请选择规格",
                icon: 'none'
            })
        } else {
            Http.requestByIgnoreLogin({
                url: api.cart.addCart,
                method: 'POST',
                data: { goodsNum: goodsNum, goodsId: goodsId, goodsSkuId: goodsSkuId },
                success: (res) => {
                    // wx.showToast({
                    //   title: res.data.msg,
                    //   icon: 'none',
                    //   duration: 1500,
                    //   mask: false,
                    // });
                    cartId = []
                    console.log("res", res)
                    cartId.push(res.data.data.cartId)
                    if (cartId) {
                        Http.requestByIgnoreLogin({
                            url: api.cart.addCart + "/" + res.data.data.cartId,
                            method: "PUT",
                            data: { operation: 'set', goodsNum: goodsNum },
                            success(res) {
                                console.log("resfdsfsdfds", res)
                            }
                        })
                    }
                    that.setData({
                        sepcMaskStatus: !that.data.sepcMaskStatus
                    })
                    wx.navigateTo({
                        url: '/orders/pages/orders-sure/orders-sure?cartIds=' + cartId,
                        success: function(res) {},
                        fail: function(res) {},
                        complete: function(res) {},
                    })

                },
                fail: (res) => {

                },
                complete: () => {}
            });
        }

    }, //立即购买


    showSpec() {
        let that = this;
        that.setData({
            sepcMaskStatus: !that.data.sepcMaskStatus
        })
        Http.requestByIgnoreLogin({
            url: _api_root + `goods/${goodsId}/goodsSkuValue`,
            success(res) {
                console.log("skuList", res.data.data)
                let skuList = res.data.data;
                skuList.forEach(item => {
                    item.specValues.forEach(items => {
                            items.SpecValueChoose = false
                        })
                        // item.specValues[0].SpecValueChoose=true
                })
                that.setData({
                    skuList: skuList
              })
              setTimeout(function(){
                for (let i = 0; i < skuList.length; i++) {
                  that.changeSpecDetail(i, 0);
                }
                console.log("goodsSkuId-onlong", goodsSkuId)
              },1000)
             
            },
        })

        Http.requestByIgnoreLogin({
            url: _api_root + `goods/${goodsId}/goodsSku`,
            success(res) {
                skus = res.data.data
                skus.forEach(item => {
                    item.goodsSkuValues.sort((a, b) => {
                        return a.goodsSpecValueId - b.goodsSpecValueId;
                    }) 
                });
              that.setData({
                skus: skus
              })
              that.getGoodsSku(goodsSkuId)
              console.log("sku sort", skus);
            },
        })
    
    }, //展现/取消规格弹窗
// 规格商品选择
  getGoodsSku(goodsSkuIds){
    var that=this
    var skus = that.data.skus
    skus.forEach(item =>{
      if (item.goodsSkuId == goodsSkuIds){
        that.setData({
          goodsSku:item
        })
        console.log("goodsSku", that.data.goodsSku)
      }
    })
},

  //
 
  changeSpec(e) {
    let Aindex = e.currentTarget.dataset.aindex
    let Bindex = e.currentTarget.dataset.bindex
    this.changeSpecDetail(Aindex,Bindex);
  },
  changeSpecDetail(Aindex, Bindex) {
        var that = this
        // let Aindex = e.currentTarget.dataset.aindex
        // let Bindex = e.currentTarget.dataset.bindex
        let skuList = that.data.skuList
        // let goodsSpecValueId = e.currentTarget.dataset.specValueId
        // console.log("e", e, "goodsSpecValueId", goodsSpecValueId)
        console.log(Aindex, Bindex)
        skuList[Aindex].specValues.forEach(item => {
            item.SpecValueChoose = false
        })
        skuList[Aindex].specValues[Bindex].SpecValueChoose = true
        that.setData({
            skuList: skuList
        })
        let specValueIds = []
        skuList.forEach(item => {
            item.specValues.forEach(items => {
                if (items.SpecValueChoose) {
                    specValueIds.push(items.goodsSpecValueId)
                }
            })
        })
        specValueIds.sort((a, b) => {
            return a - b;
        })
        resultIndex = this.judge(specValueIds);
        if(resultIndex||resultIndex==0){
          let goodsSkuStorage = skus[resultIndex].goodsSkuStorage
          goodsSkuId = skus[resultIndex].goodsSkuId
        }
     that.getGoodsSku(goodsSkuId)
        // console.log("resultIndex", resultIndex);
        // console.log("specValueIds", specValueIds)
        // console.log("skuList", skuList)
        // console.log("goodsSkuId", goodsSkuId)
        // console.log("goodsSkuStorage", goodsSkuStorage)
    }, //选取规格事件
    judge(specValueIds) {
        let skuLength = skus.length;
        if (skuLength > 0) {
            let skuValueLength = skus[0].goodsSkuValues.length;
            if (skuValueLength == specValueIds.length) {
                for (let i = 0; i < skus.length; i++) {
                    const goodsSkuValues = skus[i].goodsSkuValues;
                    let trueLength = 0;
                    for (let j = 0; j < goodsSkuValues.length; j++) {
                        const goodsSkuValue = goodsSkuValues[j];
                        if (goodsSkuValue.goodsSpecValueId == specValueIds[j]) {
                            trueLength++;
                        }
                    }
                    if (trueLength == skuValueLength) {
                        return i;
                    }
                }
            }
        }
    },
    showParams() {
        let that = this;
        that.setData({
            paramStatus: !that.data.paramStatus
        })
    }, //查看参数
    toEvalDet() {
        wx.navigateTo({
            url: '/orders/pages/evalDetail/evalDetail?goodsId=' + goodsId,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    }, //查看评论详情

    togoodsDetail(e) {
        var that = this;
        recommendGoodsId = e.currentTarget.dataset.goodsId;
        wx.navigateTo({
            url: "/orders/pages/goodsDetail/goodsDetail?goodsId=" + recommendGoodsId
        })
    },
    togoodsList(e) {
        var that = this;
        wx.navigateTo({
            url: "/pages/shopping-mall/shopping-mall"
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        goodsId = options.goodsId
            // console.log("goodsId",goodsId)
        that.setData({
                imgurl: requestImageUrl
            })
            // 请求商品详情数据
        Http.requestByIgnoreLogin({
                url: api.goods.goods + goodsId,
                success(res) {
                    let content = res.data.data;
                    console.log(content)
                    let goodsPrice = content.goodsPrice.toString().split('.');
                    let priceOne = goodsPrice[0]
                    let priceTwo = goodsPrice[1]
                        // console.log("priceOne",priceOne)
                        // console.log("==dd===",goodsPrice[1])
                    if (goodsPrice[1] == undefined) {
                        let priceTwo = "00"
                        that.setData({
                            priceTwo: priceTwo
                        })
                    }
                    that.setData({
                        priceTwo: priceTwo,
                        content: content,
                        priceOne: priceOne
                    })


                },
            })
            //请求优惠券数据
        Http.requestByIgnoreLogin({
                url: api.coupon.goodsCoupon + goodsId + "/coupon",
                success(res) {
                    let data = res.data.data;
                    console.log("coupon", data)
                    data.forEach(item => {
                        item.couponEndTime = formatTimeTwo(item.couponEndTime, "Y-M-D h:m:s")
                        item.couponStartTime = formatTimeTwo(item.couponStartTime, "Y-M-D h:m:s")
                        item.choose = true
                    })
                    that.setData({
                        coupon: data,
                    })
                    console.log("coupon", that.data.coupon)
                },
            })
            //商品副文本
        Http.requestByIgnoreLogin({
                url: api.goods.goodsDetail + goodsId,
                success(res) {
                    console.log("详情", res);
                    let goodsDetail = res.data.data;
                    console.log("详情", goodsDetail);
                    let sc = '';
                    if (goodsDetail.goodsContent) {
                        sc = wxParse('detail', 'html', goodsDetail.goodsContent, that)
                    }
                    console.log("goodsContent", sc);

                    that.setData({
                        goodsDetail: goodsDetail
                    })
                },
                fail(err) { console.log(err, "无该商品的详情富文本") }
            })
            //请求评论统计数据
        Http.requestByIgnoreLogin({
                // url: api.goods.goods+ goodsId + "/goodsEvaluate",
                url: api.goods.goodsEvaStatistics + goodsId,
                success(res) {
                    let evaAll = res.data.data;
                    let num = 0
                    let goodPercent = 0
                    evaAll.forEach(item => {
                        if (!item.statisticsNum == 0) {
                            num += item.statisticsNum
                            goodPercent = evaAll[0].statisticsNum / num * 100
                        }
                    })
                    that.setData({
                            evaAll: evaAll,
                            num: num,
                            goodPercent: goodPercent.toFixed(0)
                        })
                        // console.log("num", num)
                },
            })
            //请求评论数据
        Http.requestByIgnoreLogin({
            url: api.goods.goods + goodsId + "/goodsEvaluate?pageSize=2",
            success(res) {
                let evaList = res.data.data.content;
                evaList.forEach(item => {
                    item.goodsEvaluateAddTime = formatTimeTwo(item.goodsEvaluateAddTime, "Y-M-D h:m:s")
                    item.goodsEvaluatePic = (item.goodsEvaluatePic.split(","))
                })
                console.log("evaList", evaList)
                that.setData({
                    evaList: evaList
                })
            },
        })

        // //请求店铺推荐数据
        Http.requestByIgnoreLogin({
                url: api.goodsRecommend.goodsRecommend,
                success(res) {
                    let goodsRecommend = res.data.data;
                    console.log("goodsRecommend", goodsRecommend)
                    that.setData({
                        goodsRecommend: goodsRecommend,
                    })
                },
            })
            // 判断goods关注
        Http.requestByIgnoreLogin({
            url: api.goodsFavorites.goodsFavorites + "/" + goodsId,
            method: "GET",
            success(res) {
                let data = res.data;
                if (res.data.status.toString() == '0') {
                    that.setData({
                        starStatus: true
                    })
                } else {
                    that.setData({
                        starStatus: false
                    })
                }
                console.log("goodsFavorites", data)
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
        goodsSkuId == null
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