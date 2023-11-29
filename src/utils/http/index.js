import axios from 'axios'
import { getToken } from '@/store/user.js';
import { checkStatus } from './checkStatus.js';
import { checkCode } from '@/utils/http/checkCode.js';

const baseURL = import.meta.env.VITE_BASE_URL;
const http = axios.create({
  baseURL,
  timeout: 8000
})

// 请求拦截器
http.interceptors.request.use(config => {
  config.headers.userid = getToken();
  return config
})

// 响应拦截器
http.interceptors.response.use(res => {
  return Promise.resolve(res.data)
}, (err) => {
  checkStatus(err.response.status)
  return Promise.reject(err)
})

export const get = (url, params, config) => {
  return new Promise((resolve, reject) => {
    http.get(url, {
      params,
      ...config
    })
    .then(res => {
      const { success, reason } = checkCode(res)
      if (success) resolve(res.data)
      else {
        reject(reason)
      }
    })
    .catch(err => {
      reject(err)
    })
  })
}

export const post = (url, params, config) => {
  return new Promise((resolve, reject) => {
    http.post(url, params, config)
    .then(res => {
      const { success, reason } = checkCode(res)
      if (success) resolve(res.data)
      else {
        reject(reason)
      }
    })
    .catch((err) => {
      reject(err)
    })
  })
}


export default http