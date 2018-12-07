import wx from 'weixin-js-sdk'
import {Utils} from './Utils.js'
import {congigJsApi} from './getData'

let WechatShareUtils = {
    redirectToAuth: function (toPath) {
        let url = encodeURIComponent(process.env.DOMAIN + toPath);
        let redirect_uri = encodeURIComponent(process.env.REDIRECT + "?backUrl=" + url);
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?" +
            "appid=" + process.env.WECHAT_APPID +
            "&redirect_uri=" + redirect_uri +
            "&response_type=code&scope=snsapi_userinfo" +
            "&state=" + 0 +
            "&connect_redirect=1#wechat_redirect"
    },
    configJsApi: function (url) {
        var currentUrl = location.href.split('#')[0]
        if (Utils.isIos()) {
            currentUrl = url
        }
        congigJsApi(encodeURIComponent(currentUrl)).then(function (apiConfig) {
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
        let sessionUserInfo = sessionStorage.getItem("userInfo");
        if (sessionUserInfo) {
            if (shareLink.contains("?")) {
                shareLink = shareLink + "&inviter=" + JSON.parse(sessionUserInfo).vipId;
            } else {
                shareLink = shareLink + "?inviter=" + JSON.parse(sessionUserInfo).vipId;
            }
        }

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
