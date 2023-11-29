import wx from 'weixin-js-sdk';
import { setCode, setToken, setUserInfo } from '../store/user.js';
import { getUserInfoByCode, getWeiXinSDKConfig } from '@/api/index.js'
import { showToast } from 'vant';

const appid = 'wx7fc81db41947d948';
const redirectUri = encodeURIComponent(location.href)

/**
 * 微信登录
 * 跳微信授权页面 授权成功后重定向回来并携带授权成功的code，获取code后传后端换取用户信息
 */
export const wxLogin = async () => {
  const code = getQueryParams('code')
  if (!code) {
    const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
    location.href = url
  } else {
    setCode(code)
    const res = await getUserInfoByCode(code)
    setToken(res?.userid)
    const config = await getWeiXinSDKConfig()
    initWxConfig(config)
  }
}

export const getQueryParams=(key)=>{
  let reg = new RegExp("(^|&)"+ key +"=([^&]*)(&|$)");
  let res = window.location.search.substr(1).match(reg)?.[2];
  return res
}

export const initWxConfig = ({ timestamp, nonceStr, signature }) => {
  wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: appid, // 必填，公众号的唯一标识
    timestamp, // 必填，生成签名的时间戳
    nonceStr, // 必填，生成签名的随机串
    signature,// 必填，签名
    jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'chooseWXPay'] // 必填，需要使用的JS接口列表
  });
}

export const initShare = (params) => {
  const { title = '', desc = '', link = '', imgUrl = '' } = params
  wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
    wx.updateAppMessageShareData({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      success: function () {
        showToast({
          message: '分享成功！',
          type: 'success'
        })
      },
      fail (err) {
        showToast({
          message: `分享失败！${err}`,
          type: 'success'
        })
      }
    })
    
    //需在用户可能点击分享按钮前就先调用
    wx.updateTimelineShareData({
      title, // 分享标题
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      success: function () {
        console.log('设置：updateTimelineShareData成功')
        showToast({
          message: '分享成功！',
          type: 'success'
        })
      },
      fail (err) {
        showToast({
          message: `分享失败！${err}`,
          type: 'success'
        })
      }
    })
  })
}

export const chooseWXPay = ({ timestamp, nonceStr, packageStr, signType, paySign, }) => {
  return new Promise((resolve, reject) => {
    wx.ready(function() {
      wx.chooseWXPay({
				timestamp, // 支付签名时间戳，注意微信 jssdk 中的所有使用 timestamp 字段均为小写。但最新版的支付后台生成签名使用的 timeStamp 字段名需大写其中的 S 字符
				nonceStr, // 支付签名随机串，不长于 32 位
				package: packageStr, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
				signType, // 微信支付V3的传入 RSA ,微信支付V2的传入格式与V2统一下单的签名格式保持一致
				paySign, // 支付签名
				success: function (res) {
					resolve(res);
				},
				fail(...args) {
          reject(...args)
        },
			});
    })
  })
}
