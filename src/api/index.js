import { get } from '@/utils/http/index.js'

export const getUserInfoByCode = (code) => {
  return get(`/getUserInfo${code}`)
}

export const getUserInfoById = (id) => {
  return get(`/getUserById?userid=${id}`)
}

export const getWeiXinSDKConfig = (params) => {
  return get(`/JSSDKSign`, params)
}