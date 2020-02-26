import http from '@/config/axios'
// 获取药品分类信息
async function getClassify(params) {
  console.log('in getClassify')
  // return http.get('/admin/v1/category/getCategorys', {
  //   params: params
  // })
  return http.get('/admin/v1/category/getCategorys?status=')
}

// 获取主页的各类信息
async function getMainInfo(params) {
  console.log('in getMainInfo')
  return http.get('/admin/v1/initPage?tenantId=')
}

// 获取词库信息
async function searchKeyword(params) {
  console.log('in getMainInfo')
  return http.get('/admin/v1/searchKeyword')
}
export { getClassify, getMainInfo, searchKeyword }
