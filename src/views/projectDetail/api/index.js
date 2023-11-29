import { post, get } from '@/utils/http/index.js'

export const getDoPerById = (params) => {
  return post('loveDonation/getDoPerById', params)
}

export const getProjDetail = (id) => {
  return get(`/loveDonation/getProjDetail/${id}`)
}