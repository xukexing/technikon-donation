import { post } from '@/utils/http/index.js'

export const addProInfo = (params) => {
  return post('/loveDonation/addProInfo', params)
}

export const uploadFile = (file) => {
  const formData = new FormData()
  formData.append('file', file)
  return post('/loveDonation/upload', formData, { contentType: 'multipart/form-data' })
}