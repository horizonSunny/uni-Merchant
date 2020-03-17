import http from '@/config/axios'
// 获取药品分类信息
async function shopCart(params) {
  return http.get('/order/shopCart/info')
}
export { shopCart }
