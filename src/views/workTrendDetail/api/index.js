import { get } from '@/utils/http/index.js'

export const queryDetail = (id) => {
  return get(`/workState/queryDetail/${id}`)
}