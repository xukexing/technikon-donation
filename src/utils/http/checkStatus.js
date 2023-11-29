import { showFailToast } from 'vant';
import { wxLogin } from '@/utils/wxAuth';

export const checkStatus = function (status) {
	let errMessage = '未知错误';
	switch (status) {
		case 400:
			errMessage = '错误的请求';
			break;
		case 401:
			errMessage = '未授权，请重新登录';
			showFailToast({
				message: errMessage,
				position: 'top',
				duration: 2500,
				onClose: () => {
					wxLogin();
				}
			});
			return;
		case 403:
			errMessage = '拒绝访问';
			break;
		case 404:
			errMessage = '请求错误,未找到该资源';
			break;
		case 405:
			errMessage = '请求方法未允许';
			break;
		case 408:
			errMessage = '请求超时';
			break;
		case 500:
			errMessage = '服务器端出错';
			break;
		case 501:
			errMessage = '网络未实现';
			break;
		case 502:
			errMessage = '网络错误';
			break;
		case 503:
			errMessage = '服务不可用';
			break;
		case 504:
			errMessage = '网络超时';
			break;
		case 505:
			errMessage = 'http版本不支持该请求';
			break;
		default:
			errMessage = `请求失败：${status}`;
	}

	showFailToast({
		message: errMessage,
		position: 'top',
		duration: 2500
	});
};