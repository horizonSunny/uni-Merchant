import http from '@/config/axios'
import qs from 'qs'
// 获取历史浏览信息
async function productVisit(params) {
  return http.get('/patient/productVisit', { data: params })
}
// 保存商品浏览记录
async function setProductVisit(params) {
  return http.post('/patient/productVisit', params)
}
// 删除历史浏览信息
async function deleteProductVisit(params) {
  return http.delete('/patient/productVisit', {
    params,
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  })
}
// 清空历史浏览信息
async function deleteProductVisitAll(params) {
  return http.delete('/patient/productVisit/deleteAll')
}
export {
  productVisit,
  setProductVisit,
  deleteProductVisit,
  deleteProductVisitAll
}
