const getters = {
  //   sidebar: state => state.app.sidebar,
  // 药品分类处理
  classify: state => state.business.classifyInfo,
  // 首页信息
  tenant: state => state.business.tenant,
  banners: state => state.business.banners,
  quickCategorys: state => state.business.quickCategorys,
  products: state => state.business.products,
  // 获取搜索词库信息
  searchLibrary: state => state.business.searchKeyword
}
export default getters
