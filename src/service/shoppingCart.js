import http from '@/config/axios'
import qs from 'qs'
// 获取购物车信息
async function shopCart(params) {
  return http.get('/order/shopCart/info')
}
// 移入收藏夹
async function productCollect(params) {
  return http.post('/order/productCollect', params)
}
// 删除购物车
async function shopCartDelete(params) {
  return http.delete('/order/shopCart/delete', {
    params,
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  })
}
export { shopCart, productCollect, shopCartDelete }
