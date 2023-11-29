import { post } from '@/utils/http/index.js'

export const queryAll = (params) => {
  return post('workState/queryAll', params)
}