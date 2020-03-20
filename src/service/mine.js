import http from '@/config/axios'
// 获取用户信息
async function userDetails(params) {
  return http.get('/patient/patient')
}
// 获取用户统计记录
async function getStatisticData(params) {
  return http.get('/patient/patient/getStatisticData')
}

export { userDetails, getStatisticData }
