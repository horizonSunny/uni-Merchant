import http from '@/config/axios'
// // 确认订单信息
// async function patientAddress() {
//   return http.get('/patient/address')
// }
// // 删除地址
// async function addressDelete(params) {
//   return http.delete('/patient/address/' + params)
// }
//  取消订单
async function cancelOrder(params) {
  return http.put('/order/order/cancel/' + params)
}
// 确认订单信息
async function confirmOrder(params) {
  return http.post('/order/order/confirmOrder', params)
}
// 生成订单
async function generateOrder(params) {
  return http.post('/order/order/generateOrder', params)
}
export { confirmOrder, cancelOrder, generateOrder }
