import http from '@/config/axios'
import qs from 'qs'
// 获取购物车信息
async function shopCart(params) {
  return http.get('/order/shopCart/info')
}
// 删除购物车
async function shopCartDelete(params) {
  return http.delete('/order/shopCart/delete', {
    data: params,
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  })
}
// 更新购物车
async function updateCart(params) {
  return http.put('/order/shopCart', params)
}
// 新增购物车
async function newCart(params) {
  return http.post('/order/shopCart', params)
}
export { shopCart, shopCartDelete, updateCart, newCart }
