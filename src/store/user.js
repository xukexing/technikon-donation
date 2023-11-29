import { ref, unref } from 'vue';

const userInfo = ref({
  nickname: '',
  headimgurl: '',
  userid: '',
  openid: ''
});
export const getUserInfoByStore = () => {
  return unref(userInfo)
}
export const setUserInfo = (payload) => {
  userInfo.value = payload
}

const token = ref('')
export const getToken = () => {
  return unref(token) || localStorage.getItem('token') || ''
}
export const setToken = (payload) => {
  localStorage.setItem('token', payload)
  token.value = payload
}

const code = ref('')
export const getCode = () => {
  return unref(code) || sessionStorage.getItem('code') || ''
}
export const setCode = (payload) => {
  sessionStorage.setItem('code', payload)
  code.value = payload
}