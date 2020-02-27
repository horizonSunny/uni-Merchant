import http from '@/config/axios'
// 获取药品分类信息
async function getClassify(params) {
  console.log('in getClassify')
  // return http.get('/admin/v1/category/getCategorys', {
  //   params: params
  // })
  return http.get('/admin/v1/category/getCategorys?status=1')
}

// 获取主页的各类信息
async function getMainInfo(params) {
  console.log('in getMainInfo')
  return http.get('/admin/v1/initPage?tenantId=1')
}

// 获取词库信息
async function searchKeyword(params) {
  console.log('in getMainInfo')
  return http.get('/admin/v1/searchKeyword')
}

// 搜索获取药品信息
async function searchProductList(params) {
  console.log('in getMainInfo')
  return http.get('/admin/v1/tenantProduct/searchProductList', {
    params: params
  })
}
// 根据分类信息获取产品数据
async function getCategoryProducts(params) {
  console.log('in getCategoryProducts')
  return http.get('/admin/v1/tenantProduct/getCategoryProducts', {
    params: params
  })
}
// 根据快速分类找药
async function getQuickCategoryProducts(params) {
  console.log('in getQuickCategoryProducts')
  return http.get('/admin/v1/tenantProduct/getQuickCategoryProducts', {
    params: params
  })
}
// 查看商品详情页面
async function getProductDetails(params) {
  console.log('in getProductDetails')
  return http.get('/admin/v1/tenantProduct/getProductDetails', {
    params: params
  })
}
export {
  getClassify,
  getMainInfo,
  searchKeyword,
  searchProductList,
  getCategoryProducts,
  getQuickCategoryProducts,
  getProductDetails
}
