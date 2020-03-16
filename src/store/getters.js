const getters = {
  //   sidebar: state => state.app.sidebar,
  // 药品分类处理
  classify: state => state.business.classifyInfo,
  // 首页信息
  tenant: state => state.business.tenant,
  banners: state => state.business.banners,
  quickCategorys: state => state.business.quickCategorys,
  products: state => state.business.products,
  // 获取搜索词库信息，返回函数，传参过滤
  // searchLibrary: state => state.business.searchKeyword
  searchLibrary: state => keyWord => {
    console.log('state.business.searchKeyword_', state.business.searchKeyword)
    const keyInfo = state.business.searchKeyword.filter(item => {
      return item.keyword.indexOf(keyWord) != -1
    })
    console.log('keyInfo_', keyInfo)
    return keyInfo
  },
  // 获取用户地址的列表信息
  getCustAddress: state => state.user.custAddress
}
export default getters
