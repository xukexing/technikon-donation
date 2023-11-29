import { showFailToast } from 'vant'

const SUCCESS_CODE = '000000'

/**
 * 业务code检测
 * @returns {{success: boolean, resean}|{success: boolean, resean: string}}
 */
export const checkCode = ({ code, message }) => {
  if (code !== SUCCESS_CODE) {
    showFailToast({
      message: `请求失败：${message}`,
      position: 'top',
      duration: 2500
    });
    return { success: false, reason: message }
  }
  
  return { success: true, reason: '' }
}