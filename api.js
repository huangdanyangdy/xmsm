var shopId = 1
var _api_root = 'https://api.xmsmoo.com/'
    // var _api_root = 'http://meiilimaco.natapp1.cc/api/'
    // var _api_root = 'http://localhost:8080/api/'

var requestImageUrl = 'https://img.xmsmoo.com/upload/' + shopId + '/';
var api = {
    root: _api_root,
    video: _api_root + "advVideo",
    shopId: shopId,
    requestImageUrl: requestImageUrl,
    uploadUrl: _api_root + 'upload/img/',
    login: _api_root + "login",
    repaire: {
        online: _api_root + 'feedback/add'
    },
    myorders: {
        myorders: _api_root + "myOrders"
    },
    coupon: {
        list: _api_root + "coupon",
        member: _api_root + "coupon/member",
        cartMemberCoupon: _api_root + "coupon/cartMemberCoupon",
        goodsMemberCoupon: _api_root + "coupon/goodsMemberCoupon/",
        goodsCoupon: _api_root + "goods/",
        payPromotion: _api_root + "payPromotion",
        memberCoupon: _api_root + "memberCoupon",
    },
    seckill: {
      seckill: _api_root+"seckillRecommend",
    },
    article: {
        list: _api_root + "article",
        get: _api_root + "article/",
        getDetail: _api_root + "article/detail/",
        classList: _api_root + "articleClass"
    },
    search: {
        hot: _api_root + "searchHot",
        default: _api_root + "searchDefault",
        history: _api_root + "searchHistory",
        addHistory: _api_root + "searchHistory/add"
    },
    home: {
        adv_list: _api_root + 'adv',
        nav_list: _api_root + 'navigation',
        floor_list: _api_root + 'floor',
        showcase_list: _api_root + "showcase",
        subject_list: _api_root + "subject",
        notice_list: _api_root + "notice"
    },
    notice: {
        detail: _api_root + "notice/"
    },
    subject: {
        detail: _api_root + "subject/"
    },
    goods: {
        goods_list: _api_root + "goods/list/",
        goodsClass_list: _api_root + "goodsClass",
        goods: _api_root + "goods/",
        goods_evaluate: _api_root + "goods/goodsEvaluate/",
        search: _api_root + "goods/search",
        goodsDetail: _api_root + "goodsDetail/",
        goods_eva_statistics: _api_root + "goodsEvaStatistics/list",
        goodsEvaStatistics: _api_root + "goodsEvaStatistics/"
    },
    class: {
        getById: _api_root + "goodsClass/"
    },
    goodsRecommend: {
        list: _api_root + "goodsRecommend/list",
        add: _api_root + "goodsRecommend/add",
        delete: _api_root + "goodsRecommend/delete",
        goodsRecommend: _api_root + "goodsRecommend"
    },
    address: {
        address: _api_root + "address",
        list: _api_root + "address/listMemberAddress",
        set_default: _api_root + "address/setDefaultAddress",
        detail: _api_root + "address/addressDetail/",
        get_default: _api_root + "address/defaultAddress",
        add: _api_root + "address/add",
        update: _api_root + "address/update",
        delete: _api_root + "address/delete"
    },
    order: {
        confirm: _api_root + 'orders/confirm',
        create: _api_root + 'orders/create',
        orderList: _api_root + 'myOrders'
    },
    ordersGoods: {
        get: _api_root + "ordersGoods/get",
        listByOrders: _api_root + "ordersGoods/listByOrders"
    },
    member: {
        default: _api_root + "member",
        info: _api_root + 'member/info'
    },
    goodsSku: {
        goodsSku: _api_root + "goodsSku/"
    },
    goodsFavorites: {
        goodsFavorites: _api_root + "goodsFavorites"
    },
    cart: {
        addCart: _api_root + "cart",
        list: _api_root + "cart",
        updatePrice: _api_root + "cart/updatePrice",
        getSpecList: _api_root + 'cart/getSpecList',
        delete: _api_root + "cart",
        setCartNum: _api_root + "cart/setCartNum",
        calculate: {
            add: _api_root + "cart/addCart",
            sub: _api_root + "cart/subCart"
        },
        calculatePrice: _api_root + "cart/calculatePrice",
        updateCarts: _api_root + "cart/updateCarts",
        queryByIds: _api_root + "cart/listByIds"
    },
    memberAttention: {
        list: _api_root + "memberAttention/list",
        attention: _api_root + "memberAttention"
    },
    eva: {
        list: _api_root + "goodsEvaluate/list/",
        add: _api_root + "goodsEvaluate/add"
    },
    pay: {
        pay: _api_root + "pay/pay",
        refund: _api_root + "pay/refund",
        applyRefund: _api_root + "pay/applyRefund",
        seckillPay: _api_root + "pay/seckillPay"
    },
    refund: {
        list: _api_root + "ordersRefund/list",
        detail: _api_root + "ordersRefund/detail",
        cancel: _api_root + "ordersRefund/cancel",
        applyRefund: _api_root + "ordersRefund/applyRefund",
        applyRefundAndReturn: _api_root + "ordersRefund/applyRefundAndReturn",
        ordersRefund: _api_root + "ordersRefund",
    },
    return: {
        list: _api_root + "ordersReturn/list",
        detail: _api_root + "ordersReturn/detail",
        cancel: _api_root + "ordersReturn/cancel"
    },
    payment: {
        list: _api_root + "payment/list"
    },
    community: {
        apply_leader: _api_root + "communityBuyLeader/apply",
        query: _api_root + "communityBuyLeader/query"
    },
    memberCard: {
        list: _api_root + "memberMemberCard"
    }
}
export {
    requestImageUrl,
    _api_root,
    api,
    shopId,
}