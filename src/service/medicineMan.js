import http from '@/config/axios'
// 获取用药人信息
async function medicineMan(params) {
  return http.get('/patient/medicine')
}
// 获取获取病史模板
async function getMedicineTemplate(params) {
  return http.get('/patient/medicine/getMedicineTemplate')
}
// 删除用药人信息
async function medicineManDelete(params) {
  return http.delete('/patient/medicine/' + params)
}
// 更新用药人信息
async function updateMedicineMan(params) {
  return http.put('/patient/medicine', params)
}
// 新增用药人信息
async function newMedicineMan(params) {
  return http.post('/patient/medicine', params)
}
export {
  medicineMan,
  getMedicineTemplate,
  medicineManDelete,
  updateMedicineMan,
  newMedicineMan
}
