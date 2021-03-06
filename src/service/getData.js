import fetch from '../config/fetch'

/**
 * 查询首页数据
 */

export const homeIndex = () => fetch('/home/index', {});

/**
 * 添加到购物车
 * @param {商品id} productId
 * @param {数量} number
 */

export const addToCart = (productId, number) => fetch('/carts', {
    productId: productId,
    number: number
}, 'POST')

/**
 * 购物车中商品数量
 */

export const cartProductCount = () => fetch('/carts/stat', {})

/**
 * 获取首页热卖商品
 * @param {页数} page
 * @param {每页数量} size
 */

export const hotgoods = (page, size) => fetch('/wx/home/index', {
    'page': page,
    'size': size
});

/**
 * 获取首页热门城市
 */

export const hotcity = (page, size) => fetch('/wx/wx/photo/list', {
    page: page,
    size: size
});

/**
 * 查询商品列表
 * @param {品牌id} brandId
 */

export const productList = (page, size, brandId) => fetch('/products', {
    page: page,
    size: size,
    brandId: brandId,
});

/**
 * 查询热卖商品列表
 */

export const productHotList = (page, size) => fetch('/products/hot', {
    page: page,
    size: size
});

/**
 * 根据商品id查询商品详情
 * @param {商品id} proId
 */
export const getProductDetail = (proId) => fetch('/products/' + proId, {});


/**
 * 查询用户购物车
 */
export const findCart = (page, size) => fetch('/carts', {
    page: page,
    size: size
});

/**
 * 更新购物车
 * @param {购物车Id} cartId
 * @param {数量} number
 */
export const updateCart = (cartId, number) => fetch('/carts/' + cartId, {
    number: number
}, 'PUT');

/**
 * 删除购物车
 */
export const deleteCart = (cartId) => fetch('/carts/' + cartId, {}, 'DELETE');


/**
 * 添加购物车
 * @param {商品id} productId
 * @param {数量} number
 */
export const addCart = (youpinCar, productId, number) => fetch('/carts', {
    productId: productId,
    number: number
}, 'POST');

/**
 * 地址列表查询
 */
export const getDefaultAddress = () => fetch('/addresses/defaultAddress');


/**
 * 地址列表查询
 */
export const getAddressList = (page, pageSize) => fetch('/addresses', {
    page: page,
    pageSize: pageSize
});


/**
 * 地址详情
 */
export const getAddressDetail = (addressId) => fetch('/addresses/' + addressId);


/**
 * 添加收货地址
 */

export const addAddress = (name, provinceId, cityId, areaId, mobile, address, Default) => fetch('/addresses', {
    name,
    provinceId,
    cityId,
    areaId,
    mobile,
    address,
    isDefault: Default
}, 'POST');

/**
 * 更新收货地址
 */

export const updateAddress = (addressId, name, provinceId, cityId, areaId, mobile, address) => fetch('/addresses/' + addressId, {
    name,
    provinceId,
    cityId,
    areaId,
    mobile,
    address
}, 'PUT');


/**
 * 删除收货地址
 */

export const deleteAddress = (addressId) => fetch('/addresses/' + addressId, {}, 'DELETE')


/**
 * 微信授权登陆
 */

export const login_oa = () => fetch('/oa/login_oa');


/**
 * 提交订单
 */

export const submitOrder = (cartIds, addressId, couponId, message) => fetch('/orders', {
    cartIds: cartIds,
    addressId: addressId,
    couponId: couponId,
    message: message
}, 'POST');

/**
 * 提交拼团订单
 * @param suitId 拼团id
 * @param addressId 地址id
 * @param couponId 我的优惠卷id
 * @param message 备注
 * @param suitNum 套装数量
 * @param groupMyId 我的拼团id
 * @returns {Promise<*>}
 */
export const submitGroup = (suitId, addressId, couponId, message, suitNum, groupMyId,products) => fetch('/groups/' + suitId + '/groupMys/' + groupMyId + '/order', {
    suitId: suitId,
    addressId: addressId,
    couponId: couponId,
    message: message,
    suitNum: suitNum,
    groupMyId: groupMyId,
    products:products
}, 'POST');

/**
 * 确认收货
 */

export const confirmOrder = (orderId) => fetch('/orders/' + orderId + '/confirm', {}, 'POST');


/**
 * 预付款
 */

export const prepayOrder = (orderId) => fetch('/orders/' + orderId + '/prepay', {}, 'POST');


/**
 * 获取订单列表
 * showType 0:全部，1：待付款，2：待发货，3：待收货，4：待评价
 */

export const getOrderList = (page, size, showType) => fetch('/orders', {
    page: page,
    size: size,
    showType: showType
});


/**
 * 获取订单详情
 */

export const getOrderDetail = (orderId) => fetch('/orders/' + orderId);

/**
 * 取消订单
 */

export const cancelOrder = (orderId) => fetch('/orders/' + orderId, {}, 'DELETE');

/**
 * 申请退款
 */

export const refundOrder = (orderId, refund) => fetch('/orders/' + orderId + '/refund', {
    refund: refund
}, 'POST');


/**
 * 订单统计
 */

export const orderStat = () => fetch('/orders/stat', {});

/**
 * 查询区域
 */

export const getRegionsList = (parentId) => fetch('/regions', {
    pid: parentId
});


/**
 * 用户信息
 */

export const userInfo = () => fetch('/oa/users/info', {});

/**
 * 物流查询
 * @param expNo
 * @returns {Promise<*>}
 */
export const expresses = (expCode, expNo) => fetch('/expresses/' + expCode + '/' + expNo);

/**
 * 查询品牌资料详情
 * @param dataId
 * @returns {Promise<*>}
 */
export const brandsPics = (dataId) => fetch('/brands/' + dataId + "/pics", {});

/**
 * 查询品牌资料列表
 * @param brandId
 * @returns {Promise<*>}
 */
export const brands = (brandId) => fetch('/brands/' + brandId, {});

/**
 * 再来一单
 * @param orderId
 * @returns {Promise<*>}
 */
export const rebuy = (orderId) => fetch('/orders/' + orderId + "/rebuy", {}, 'POST');


// 赏金计划活动

/**
 * 获取我的分享码
 */
export const inviteCode = () => fetch('/act/bounty/home/inv', {});

/**
 * 赏金活动首页
 */
export const bountyHome = () => fetch('/act/bounty/home', {});

/**
 * 获取金条记录
 */
export const bullion = (page, size) => fetch('/act/bounty/home/bullion', {
    page: page,
    size: size
});

/**
 * 获取金钻记录
 */
export const goldDrill = (page, size) => fetch('/act/bounty/home/goldDrill', {
    page: page,
    size: size
});

/**
 * 捡金任务详情
 */
export const pickGoldDetail = (page, size, id) => fetch('/act/bounty/home/pick/' + id, {
    page: page,
    size: size
});

/**
 * 抢
 */
export const robGold = (id) => fetch('/act/bounty/home/pick/rob', {
    pickGoldRecordId: id
}, 'POST');


/**
 * 出价
 */
export const offer = (auctionId, bidPrice) => fetch('/auction/home/bid', {
    auctionId: auctionId,
    bidPrice: bidPrice
}, 'POST');

/**
 * 分享助力
 */
export const helpDetail = (id) => fetch('/auction/home/helpDetail/' + id);

/**
 * 分享后用户助力
 */
export const help = (auctionId, vipId) => fetch('/auction/home/' + auctionId + '/help', {
    vipId: vipId
}, 'POST')

/**
 * 出价记录
 */

export const bidRecord = (id) => fetch('/auction/home/bidRecord/' + id);

/**
 * 我的出价记录
 */

export const myBidRecords = (page, pageSize) => fetch('/auction/home/myBidRecords', {
    page: page,
    pageSize: pageSize
});


/**
 * 竞拍首页
 */
export const auction = () => fetch('/auction/home', {});

/**
 * 抽奖详情
 */
export const luckDrawDetail = (auctionId, luckDrawId) => fetch('/auction/home/luckDrawDetail/' + auctionId + '/' + luckDrawId, {});

/**
 * 抽奖GO
 */
export const luckDraw = (auctionId, luckDrawId) => fetch('/auction/home/luckDraw', {
    auctionId: auctionId,
    luckDrawId: luckDrawId
}, 'POST');


export const congigJsApi = (url) => fetch('/oa/jsapiSignature', {
    url: url
})

/**
 * 兑换奖励
 */
export const exchange = (bidId, wxNum, phoneNum) => fetch('/auction/home/myBidRecords/' + bidId, {
    bidId: bidId,
    wxNum: wxNum,
    phoneNum: phoneNum
}, 'PUT');

/**
 * 竞拍图片获取
 */
export const goodsPic = (auctionId) => fetch('/auction/home/goodsPic/' + auctionId, {});

/**
 * 溯源
 */
export const source = () => fetch('/source', {});

/**
 * 拼团
 * @param page
 * @param size
 * @returns {Promise<*>}
 */
export const groupList = (page, size) => fetch('/groups', {
    page: page,
    size: size
});

/**
 * 根据拼团id查询商品详情
 * @param {拼团id} suitId
 */
export const groupSuit = (suitId) => fetch('/groups/' + suitId, {});

/**
 * 拼团商品套装商品详情(新)

 * @param {拼团id} suitId
 */
export const groupDet = (suitId) => fetch('/groups/' + suitId + '/pro', {});


/**
 * 查询套装内商品详情
 * @param suitId
 * @returns {Promise<*>}
 */
export const groupPro = (suitId) => fetch('/groups/' + suitId+'/pro', {});

/**
 * 我的拼团详情
 * @param groupMyId
 * @returns {Promise<*>}
 */
export const groupMy = (groupMyId) => fetch('/groups/my/' + groupMyId, {});

/**
 * 我的拼团数据查询
 */
export const myGroupOrder = () => fetch('/group/myOrder', {});

/**
 * 我的优惠卷查询
 */
export const couponList = (page, size) => fetch('/coupon', {
    page: page,
    size: size
});

/**
 * 我的账户信息
 */
export const accountsInfo = () => fetch('/accounts/0', {});

/**
 * 我的邀请记录
 */
export const userInvites = (page, pageSize) => fetch('/accounts/0/userInvites', {
    page: page,
    pageSize: pageSize
})

/**
 * 我的段位
 */
export const rewardGrade = () => fetch('/accounts/0/rewardGrade', {})

/**
 * 申请提现
 */
export const withdraws = (amount) => fetch('/accounts/0/withdraws', {
    amount: amount
}, 'POST')

/**
 * 提成奖励段位信息
 */
export const rewardGrades = () => fetch('/rewardGrades', {})

/**
 * 拼团提交订单
 */
export const groupMyOrder = (suitId, groupMyId) => fetch('/groups/' + suitId + '/groupMys/' + groupMyId + '/order', {})

/**
 * 团长地址信息
 */
export const groupMyAddress = (suitId, groupMyId) => fetch('/groups/' + suitId + '/groupMys/' + groupMyId, {})

/**
 * 拼团商品详情
 */
export const groupsDetail = (suitId, groupMyId) => fetch('/groups/' + suitId, {
    suitId: suitId,
    groupMyId: groupMyId
})

/**
 * 我的今日收益
 */
export const todayProfit = () => fetch('/accounts/0/todayProfit', {})

/**
 * 我的收益明细
 */
export const incomeDeals = (page, pageSize) => fetch('/accounts/0/deals', {
    page: page,
    pageSize: pageSize
})

/**
 * 开团 / 参团(新)
 */
export const openGroup = (suitId, isAloneBuy, groupSuitType, suitNum, groupMyId) => fetch('/groups/' + suitId + '/groupMys', {
    suitId: suitId,
    isAloneBuy: isAloneBuy,
    groupSuitType: groupSuitType,
    suitNum: suitNum,
    groupMyId: groupMyId
}, 'POST')

/**
 * 获取系统时间
 */
export const systemTime = () => fetch('/system/time', {})

/**
 * 参团人员信息
 */
export const groupMembers = (suitId, groupMyId, page, pageSize) => fetch('/groups/' + suitId + '/groupMys/' + groupMyId + '/members', {
    page: page,
    pageSize: pageSize
})

/**
 * 运费查询
 */
export const expressCost = (expressCostId) => fetch('/express/' + expressCostId, {})

/**
 * 根据套装id获取brandId
 * @param suitId
 * @returns {Promise<*>}
 */
export const getBrandId = (suitId) => fetch('/groups/' + suitId + '/getBrandId', {});
