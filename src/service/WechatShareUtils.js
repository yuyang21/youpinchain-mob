import wx from 'weixin-js-sdk'
import {Utils} from './Utils.js'
import { congigJsApi } from './getData'
import { domainUrl, appid, redirect } from '../config/env'
let WechatShareUtils = {
  redirectToAuth: function(toPath) {
    let url = encodeURIComponent(domainUrl + toPath);
    let redirect_uri = encodeURIComponent(redirect);
    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?" +
        "appid=" + appid +
        "&redirect_uri=" + redirect_uri +
        "&response_type=code&scope=snsapi_userinfo" +
        "&state=" + url +
        "&connect_redirect=1#wechat_redirect"
  },
  configJsApi: function (url) {
    var currentUrl = location.href.split('#')[0]
    if (Utils.isIos()) {
      currentUrl = url
    }
    congigJsApi(encodeURIComponent(currentUrl)).then(function(apiConfig) {
      //console.log('apiConfig: ' + apiConfig.appId)
      wx.config({
        debug: false,
        appId: apiConfig.appId, // 必填，公众号的唯一标识
        timestamp: apiConfig.timestamp, // 必填，生成签名的时间戳
        nonceStr: apiConfig.nonceStr, // 必填，生成签名的随机串
        signature: apiConfig.signature, // 必填，签名，见附录1
        jsApiList: [
          'onMenuShareAppMessage',
          'hideMenuItems',
          'onMenuShareTimeline'
        ]
      })
    })
  },
  onMenuShareAppMessage: function (title, subTitle, shareLink, imgUrl) {
    wx.onMenuShareAppMessage({
      title: title,
      desc: subTitle,
      link: shareLink,
      imgUrl: imgUrl,
      trigger: function (res) {
      },
      success: function (res) {
        window.location.reload()
      },
      cancel: function (res) {
      },
      fail: function (res) {
      }
    })
    wx.onMenuShareTimeline({
      title: title,
      link: shareLink,
      imgUrl: imgUrl,
      trigger: function (res) {
      },
      success: function (res) {
      },
      cancel: function (res) {
      },
      fail: function (res) {
      }
    })
  }
}
export {WechatShareUtils}
