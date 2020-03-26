import http from '@/config/axios'
// 获取购地址
async function patientAddress() {
  return http.get('/patient/address')
}
// 删除地址
async function addressDelete(params) {
  return http.delete('/patient/address/' + params)
}
// 更新地址
async function updateAddress(params) {
  return http.put('/patient/address', params)
}
// 新增地址
async function newAddress(params) {
  return http.post('/patient/address', params)
}
// 校验地址信息
async function checkAddress(params) {
  return http.post('/patient/address/checkAddress', params)
}
export {
  patientAddress,
  addressDelete,
  updateAddress,
  newAddress,
  checkAddress
}
