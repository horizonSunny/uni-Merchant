import http from '@/config/axios'
import qs from 'qs'
// 获取订单列表信息
async function getOrderList(params) {
  return http.get('/order/order/getOrderList', { params })
}
// 获取支付宝接口支付
async function alipay(params) {
  return http.get('/order/v1/pay', { params })
}
//删除
async function deleteOrder(params) {
  return http.delete('/order/order/delete', {
    params,
  })
}
// 取消订单
async function cancelOrder(params) {
  return http.put('/order/order/cancel', params)
}
// 确认订单信息
async function confirmOrder(params) {
  return http.post('/order/order/confirmOrder', params)
}
// 生成订单信息
async function generateOrder(params) {
  return http.post('/order/order/generateOrder', params)
}
// 运费模版计算
async function calculateFreight(params) {
  return http.post('/order/order/calculateFreight', params)
}
// 获取物流公司接口
async function shipper() {
  return http.get('/admin/v1/shipper')
}
// 依据快递单号查询物流轨迹
async function traces() {
  return http.get('/admin/v1/shipper/traces')
}
export {
  getOrderList,
  alipay,
  cancelOrder,
  confirmOrder,
  generateOrder,
  deleteOrder,
  calculateFreight,
  shipper,
  traces,
}
