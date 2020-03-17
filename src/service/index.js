import http from '@/config/axios'
import {
  shopCart,
  productCollect,
  shopCartDelete,
  updateCart,
  newCart
} from './shoppingCart'
// 获取药品分类信息
async function getClassify(params) {
  return http.get('/admin/v1/category/getCategorys', {
    params: { status: 1 }
  })
}

// 获取主页的各类信息
async function getMainInfo(params) {
  console.log('in getMainInfo')
  return http.get('/admin/v1/initPage')
}

// 获取词库信息
async function searchKeyword(params) {
  console.log('in getMainInfo')
  return http.get('/admin/v1/searchKeyword')
}

// 搜索获取药品信息
async function searchProductList(params) {
  console.log('in getMainInfo')
  return http.get('/admin/v1/searchProductList', {
    params: params
  })
}
// 根据分类信息获取产品数据
async function getCategoryProducts(params) {
  console.log('in getCategoryProducts')
  return http.get('/admin/v1/getCategoryProducts', {
    params: params
  })
}
// 根据快速分类找药
async function getQuickCategoryProducts(params) {
  console.log('in getQuickCategoryProducts')
  return http.get('/admin/v1/getQuickCategoryProducts', {
    params: params
  })
}
// 查看商品详情页面
async function getProductDetails(params) {
  return http.get('/admin/v1/getProductDetails', {
    params: params
  })
}
// 获取手机验证码
async function getSms(params) {
  console.log('in getSms')
  return http.get('/patient/sms/' + params.phone)
}
// 获取用户登陆信息
async function getUserInfo(params) {
  console.log('in getProductDetails')
  return http.post('/auth/oauth/token', params)
}
export {
  getClassify,
  getMainInfo,
  searchKeyword,
  searchProductList,
  getCategoryProducts,
  getQuickCategoryProducts,
  getProductDetails,
  getSms,
  getUserInfo
}
// 导出购物车接口
export { shopCart, productCollect, shopCartDelete, updateCart, newCart }
