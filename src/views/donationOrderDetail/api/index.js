import { post } from '@/utils/http/index.js';

export const donationDetail = (params) => {
	return post('donationDetail/query', params);
};