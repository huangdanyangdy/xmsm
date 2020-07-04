import { api, requestImageUrl, _api_root } from "../../api.js"
import { Http } from "../../utils/http.js"
var http = new Http();
var app = getApp();
var goodsId = '';
var settime = ''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        moveParams: {
            scrollLeft: 0, // scroll-view滚动的距离,默认为0,因为没有触发滚动
            subLeft: 0, //点击元素距离屏幕左边的距离
            subHalfWidth: 0, //点击元素的宽度一半
            screenHalfWidth: 0, //屏幕宽度的一半
        },
        sortNum: 0, //分类购买
        saleSort: 0, //购买方式分类
        endstatus: false, //倒计时状态
        endTime: 2571633201418, //倒计时时间
        couponStatus: false
    },
    // 扫一扫
    OnSweeping() {
        var that = this
        wx.scanCode({
            onlyFromCamera: false,
            scanType: ['qrCode', 'barCode', 'datamatrix', 'pdf417'],
            success: (res) => {
                console.log(res)

            },
            fail: () => {},
            complete: () => {}
        });
    },

    //设置优惠券弹窗
    timer: function() {
        this.setData({
            couponStatus: true
        })
    },
    //取消优惠券弹窗
    couponCancle() {
        let that = this;
        this.setData({
            couponStatus: !that.data.couponStatus
        })
    },
    toSearch() {
        wx.navigateTo({
            url: '/pages/search/search'
        })
    }, //跳转搜索页面

    chooseSort(e) {
        var that = this
        let flag = e.currentTarget.dataset.flag;
        console.log(flag, "============")
        that.setData({
            sortNum: flag
        })
    }, //分类购买

    // 金刚区banner图跳转
    toAdv(e) {
        var that = this
        var url = e.currentTarget.dataset.url;
        wx.navigateTo({
            url: url
        })
    },
    //金刚区navigation跳转
    toNavigation(e) {
        var that = this
        var url = e.currentTarget.dataset.url;
        wx.navigateTo({
            url: url
        })
    },
    tosubPage(e) {
        var that = this
         var subjectId = e.currentTarget.dataset.subjectId;
      if (subjectId){
        wx.navigateTo({
          url: "/pages/subject-detail/subject-detail?subjectId=" + subjectId,
        })
      }
      // console.log("222",subjectId)
    },

    //购买方式分类
    changeSort(e) {
        var that = this
        var ele = "ele" + e.currentTarget.dataset.index
        let index = e.currentTarget.dataset.index;
        console.log(index, "============")
        that.setData({
            saleSort: index
        })
        that.getRect("#" + ele)
        console.log("scrollLeft", that.data.scrollLeft)
    },
    //滚动
    getRect(ele) {
        //获取点击元素的信息,ele为传入的id
        var that = this;
        //节点查询
        wx.createSelectorQuery().select(ele).boundingClientRect(function(rect) {
            console.log(rect)
            let moveParams = that.data.moveParams;
            moveParams.subLeft = rect.left;
            moveParams.subHalfWidth = rect.width / 2;
            that.moveTo();
        }).exec()
    },
    moveTo: function() {
        let subLeft = this.data.moveParams.subLeft;
        let screenHalfWidth = this.data.moveParams.screenHalfWidth;
        let subHalfWidth = this.data.moveParams.subHalfWidth;
        let scrollLeft = this.data.moveParams.scrollLeft;

        let distance = subLeft - screenHalfWidth + subHalfWidth;

        scrollLeft = scrollLeft + distance;

        this.setData({
            scrollLeft: scrollLeft
        })
    },
    scrollMove(e) {
        let moveParams = this.data.moveParams;
        moveParams.scrollLeft = e.detail.scrollLeft;
        this.setData({
            moveParams: moveParams
        })
    },

    //拼团倒计时计时方法=======
    timeFormat(param) { //小于10的格式化函数
        return param < 10 ? '0' + param : param;
    },
    countDown() { //倒计时函数
        // 获取当前时间，同时得到活动结束时间数组
        let newTime = new Date().getTime();
        let endTime = this.data.endTime

        // console.log("newtime++++", newTime)
        let obj = null;
        // 如果活动未结束，对时间进行处理
        if (endTime - newTime > 0) {
            let time = (endTime - newTime) / 1000;
            // console.log("time", time)
            // 获取天、时、分、秒
            let day = parseInt(time / (60 * 60 * 24));
            let hou = parseInt(time % (60 * 60 * 24) / 3600);
            let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
            let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
            obj = {
                    day: this.timeFormat(day),
                    hou: this.timeFormat(hou),
                    min: this.timeFormat(min),
                    sec: this.timeFormat(sec)
                }
                // console.log("obj", obj)
                // 渲染，然后每隔一秒执行一次倒计时函数
            settime = setTimeout(this.countDown, 1000);
        } else { //活动已结束，全部设置为'00'
            obj = {
                day: '00',
                hou: '00',
                min: '00',
                sec: '00'
            }
            clearTimeout(settime)
            this.setData({
                endstatus: true
            })
        }
        this.setData({
            dayTime: obj.day,
            houTime: obj.hou,
            minTime: obj.min,
            secTime: obj.sec
        })

    },

    toGoodsDetaile(e) {
        let that = this;
        var goodsId = e.currentTarget.dataset.goodsId;
        that.setData({
            goodsId: goodsId
        })
        wx.navigateTo({
            url: "/orders/pages/goodsDetail/goodsDetail?goodsId=" + goodsId
        })

    }, //跳转商品详情页
    //弹窗
    Onwindows(e) {
        var that = this
        var url = e.currentTarget.dataset.url
  
        wx.navigateTo({
            url: url,
            success: (result) => {
              that.setData({
                couponStatus: false
              })
            },
            fail: () => {},
            complete: () => {}
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        that.setData({
                imgurl: requestImageUrl
            })
            // 请求advList数据
        Http.requestByIgnoreLogin({
            method: 'get',
            // url: api.home.adv_list,
            url: _api_root + `adv`,
            success(res) {
                let data = res.data.data;
                // console.log("advList",res.data.data);
                that.setData({
                    advList: data
                })
                console.log("advList", that.data.advList)
            },
        })

        // 请求navigation数据
        Http.requestByIgnoreLogin({
            method: 'get',
            // url: api.home.adv_list,
            url: _api_root + "navigation",

            success(res) {
                let navigation = res.data.data;
                that.setData({
                    navigation: navigation
                })
                console.log("navigation", res.data.data)
            },
        })

        // 请求新闻广告数据
        Http.requestByIgnoreLogin({
            method: 'get',
            // url: api.home.adv_list,
            url: _api_root + "notice",
            success(res) {
                let content = res.data.data.content;
                that.setData({
                    content: content
                })
                console.log("content", that.data.content)
            },
        })

        // 获取专题数据
        Http.requestByIgnoreLogin({
            method: 'get',
            url: api.home.subject_list,
            // url:_api_root+`subject`,
            success(res) {
                // console.log(res)
                let data = res.data.data.content;
                console.log("subjectList", data);
                let subjectList0 = [];
                let subjectList1 = [];
                let subjectList2 = [];
                for (let i = 0; i < data.length; i++) {
                    if (i < 1) {
                        subjectList0.push(data[i])
                    } else if (1 <= i && i <= 4) {
                        subjectList1.push(data[i]);
                    } else {
                        subjectList2.push(data[i])
                    }
                }
                that.setData({
                    subjectList0: subjectList0,
                    subjectList1: subjectList1,
                    subjectList2: subjectList2
                })
            },
            fail(err) {
                console.log("err", err);
            }
        })

        //拼团倒计时计时开始
        this.countDown()

        // 请求拼团秒杀数据
        Http.requestByIgnoreLogin({
            method: 'get',
            url: api.seckill.goods,
            success(res) {
                // console.log(res,"goods")
                let seckill = res.data.data;
                that.setData({
                    seckill: seckill
                })
                console.log("seckill", seckill)
            },
        })

        // 请求楼层数据
        Http.requestByIgnoreLogin({
            method: 'get',
            url: api.home.floor_list,
            // url: api.seckill.goods,
            success(res) {
                console.log(res.data.data, "floordata")
                that.setData({
                    floordata: res.data.data,
                })
            },
        })

        // 请求橱窗数据
        Http.requestByIgnoreLogin({
            url: api.home.showcase_list,
            // url: api.seckill.goods,
            success(res) {
                let showcase = res.data.data

                that.setData({
                    showcase: showcase
                })
                console.log(showcase, "showcase")

            },
        })

        // 首页优惠券弹窗
        Http.requestByIgnoreLogin({
            method: 'get',
            url: _api_root + `suspensionWindow`,
            success(res) {
                let data = res.data.data.content[0];
                console.log("Window", res.data.data);
                that.setData({
                    Window: data
                })
                console.log("Window", that.data.Window)
            },
        })
        let index_toastStatus = app.globalData.index_toastStatus;
        if (index_toastStatus == 1) {
            setTimeout(that.timer, 2000)
        }


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
        app.globalData.index_toastStatus = 2
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