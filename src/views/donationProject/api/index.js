import { post, get } from '@/utils/http/index.js'

export const getDonationTAmount = (params) => {
  return get('loveDonation/getDonationTAmount', params)
}

export const getAllProject = (params) => {
  return post('loveDonation/getAllProject', params)
}