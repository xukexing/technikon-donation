import { post } from '@/utils/http/index.js';

export const addRecordInfoAndWxPay = (params) => {
  return post('loveDonation/addRecordInfoAndWxPay', params);
};

export const getMyDonation = (params) => {
  return post('loveDonation/getMyDonation', params);
};