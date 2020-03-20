import http from '@/config/axios'
import qs from 'qs'
// 获取收藏列表信息
async function productCollect(params) {
  return http.get('/order/productCollect', { data: params })
}
// 收藏
async function setProductCollect(params) {
  return http.post('/order/productCollect', params)
}
//  取消关注
async function deleteProductCollect(params) {
  return http.delete('/order/productCollect', {
    data: params
  })
}
export { productCollect, setProductCollect, deleteProductCollect }
