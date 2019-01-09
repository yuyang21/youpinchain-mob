import Vue from 'vue'
import Router from 'vue-router'

import home from '../page/home/home.vue'
import traceability from '../page/home/traceability.vue'
import origins from '../page/home/origins.vue'
import introduce from '../page/home/introduce/introduce.vue'
import introduceHome from '../page/home/introduce/introduceHome.vue'
import growth from '../page/home/introduce/growth.vue'
import feeding from '../page/home/introduce/feeding.vue'
import goods from '../page/goods/goods.vue'
import credentials from '../page/goods/credentials.vue'
import cart from '../page/cart/cart.vue'
import group from '../page/group/group.vue'
import groupDet from '../page/group/groupDet.vue'
import groupMy from '../page/group/groupMy.vue'
import confirmGroup from '../page/group/confirmGroup.vue'
import current from '../page/group/children/current.vue'
import preview from '../page/group/children/preview.vue'
import profile from '../page/profile/profile.vue'
import myProfile from '../page/profile/children/myProfile.vue'
import order from '../page/order/order.vue'
import allOrder from '../page/order/children/all.vue'
import unpaid from '../page/order/children/unpaid.vue'
import undelivery from '../page/order/children/undelivery.vue'
import delivered from '../page/order/children/delivered.vue'
import completed from '../page/order/children/completed.vue'
import orderDetail from '../page/order/children/orderDetail.vue'
import orderTrack from '../page/order/children/orderTrack.vue'
import confirmOrder from '../page/confirmOrder/confirmOrder.vue'
import address from '../page/profile/children/address.vue'
import add from '../page/profile/children/add.vue'
import coupon from '../page/profile/children/coupon.vue'
import income from '../page/profile/children/income.vue'
import inviteList from '../page/profile/children/inviteList.vue'
import incomeDetails from '../page/profile/children/incomeDetails.vue'
import aboutUs from '../page/home/aboutUs.vue'
import BountyPlan from '../page/activity/bounty/bountyPlan.vue'
import BountyHome from '../page/activity/bounty/children/home.vue'
import BountyUserCenter from '../page/activity/bounty/children/userCenter.vue'
import userCenterHome from '../page/activity/bounty/children/userCenterHome.vue'
import GoldRecord from '../page/activity/bounty/children/record.vue'
import Invite from '../page/activity/bounty/children/invite.vue'
import Waiter from '../page/activity/bounty/children/waiter.vue'
import BountyTask from '../page/activity/bounty/children/bountyTask.vue'
import PickGoldTask from '../page/activity/bounty/children/pickGoldTask.vue'
import Auction from '../page/activity/auction/auction.vue'
import AuctionHome from '../page/activity/auction/children/home.vue'
import Record from '../page/activity/auction/children/record.vue'
import MyAuction from '../page/activity/auction/children/myAuction.vue'
import Sharing from '../page/activity/auction/children/sharing.vue'
import SharingLanding from '../page/activity/auction/children/sharingLanding.vue'
import RewardExchange from '../page/activity/auction/children/rewardExchange.vue'
import Lottery from '../page/activity/auction/children/lottery.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/group'
    },
    {
      path: '/group',
      component: current
    },
    //首页
    {
      path: '/home',
      component: current, //拼团进行中
      name: 'current'
    },
    //黑猪溯源
    {
      path: '/traceability',
      component: traceability
    },
    //黑猪溯源
    {
      path: '/tracing/suhuaipig/001',
      component: origins
    },
    //生产环境、饲养情况、健康指标、商品介绍
    {
      path: '/introduce/:brandId',
      component: introduce,
      name: 'introduce',
      children: [
        {
          path: 'introduceHome',
          name: 'introduceHome',
          component: introduceHome,
          meta: {title: '黑猪界的贵族，舌尖上的美味！'}
        },
        {
          path: 'growth',
          name: 'growth',
          component: growth,
          meta: {title: '黑猪界的贵族，舌尖上的美味！'}
        },
        {
          path: 'feeding',
          name: 'feeding',
          component: feeding,
          meta: {title: '黑猪界的贵族，舌尖上的美味！'}
        }
      ]
    },
    //商品详情
    {
      path: '/goods/:goodsid',
      component: goods
    },
    //拼团详情
    {
      path: '/groupDet/:suitId',
      component: groupDet
    },
    //我的拼团
    {
      path: '/groupMy/:groupMyId',
      component: groupMy,
      meta: {
        title: '拼团详情'
      }
    },
    // 证件资质
    {
      path: '/credentials',
      component: credentials,
      meta: {title: '证件资质'}
    },
    //购物车
    {
      path: '/cart',
      component: cart
    },
    //秒拼
    {
      path: '/group',
      component: group,
      children: [
        {
          path: '',
          component: current, //拼团进行中
          name: 'current'
        }, 
        {
          path: 'preview',
          component: preview, //拼团预告
          name: 'preview'
        }
      ]
    },
    //确认订单页
    {
      path: '/confirmOrder',
      component: confirmOrder
    },
    //拼团确认
    {
      path: '/confirmGroup',
      component: confirmGroup,
      meta: {title: '订单确认'}
    },
    //个人信息页
    {
      path: '/profile',
      component: profile,
      children: [
        {
          path: '',
          component: myProfile,
        },
        {
          path: 'income',
          component: income,
          name: 'income',
          meta: {
            title: '我的'
          }
        },
        {
          path: 'incomeDetails',
          component: incomeDetails,
          name: 'incomeDetails',
          meta: {
            title: '我的'
          }
        },
        {
          path: 'inviteList',
          component: inviteList,
          name: 'inviteList',
          meta: {
            title: '我的'
          }
        }
      ]
    },
    {
      path: '/address',
      component: address,  //地址管理
      name: 'addressList'
    },
    {
      path: '/add',
      component: add,     //编辑地址
      name: 'editAddress'
    },
    // 关于我们
    {
      path: '/aboutUs',
      component: aboutUs
    },
    //订单列表页
    {
      path: '/orderTrack/:expNo/:expCode',
      component: orderTrack
    },
    {
      path: '/orderDetail/:orderId', //订单详情页
      component: orderDetail
    },
    {
      path: '/order',
      component: order,
      children: [
        {
          path: '',
          component: allOrder, //全部订单
          name: 'all'
        }, 
        {
          path: 'unpaid',
          component: unpaid, //待支付订单
          name: 'unpaid'
        }, 
        {
          path: 'undelivery',
          component: undelivery, //未发货
          name: 'undelivery'
        }, 
        {
          path: 'delivered',
          component: delivered, // 已发货
          name: 'delivered'
        }, 
        {
          path: 'completed',
          component: completed, //已完成
          name: 'completed'
        }
      ]
    },
    {
      path: '/coupon',
      component: coupon,
      name: 'couponList'
    },
    {
      path: '/bountyPlan',
      component: BountyPlan,
      meta: {title: '赏金计划'},
      children: [
        {
          path: '',
          component: BountyHome,
          name: 'BountyHome',
          meta: {title: '赏金计划'}
        }, 
        {
          path: 'task',
          component: BountyTask,
          name: 'BountyTask',
          meta: {title: '淘金任务'}
        },
        {
          path: 'PickGoldTask/:id',
          component: PickGoldTask,
          name: 'PickGoldTask',
          meta: {title: '拣金任务'}
        },
        {
          path: 'invite/:invitationsSum',
          component: Invite,
          name: 'Invite',
          meta: {title: '邀请好友'}
        },
        {
          path: 'waiter',
          component: Waiter,
          name: 'Waiter',
          meta: {title: '添加客服'}
        },
        {
          path: 'userCenter',
          component: BountyUserCenter,
          name: 'BountyUserCenter',
          meta: {title: '个人中心'},
          children: [
            {
              path: '',
              component: userCenterHome,
              name: 'userCenterHome'
            }, 
            {
              path: 'goldRecord/:type',
              component: GoldRecord,
              name: 'GoldRecord'
            }
          ]
        }
      ]
    },
    {
      path: '/auction',
      component: Auction,
      children: [
          {
            path: '',
            component: AuctionHome,
            meta: {title: '限时拍卖'}
          },
          {
            path: 'record/:type',
            component: Record
          },
          {
            path: 'sharing/:auctionId',
            component: Sharing,
            meta: {title: '分享助力'}
          },
          {
            path: 'sharingLanding/:auctionId/:vipId',
            component: SharingLanding
          },
          {
            path: 'rewardExchange/:auctionId/:bidId',
            component: RewardExchange,
            meta: {title: '奖励兑换'}
          },
          {
            path: 'lottery/:auctionId/:luckDrawId',
            component: Lottery,
            meta: {title: '限时抽奖'}
          }
        ]
    }
  ]
})