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
  getCustAddress: state => state.user.custAddress,

  /**
   * 二期购物车订单我的功能
   */
  // 获取购物车列表
  getShopCartList: state => {
    console.log('cartList_', state.shopCart.shopCartInfo)
    let cartList = state.shopCart.shopCartInfo.map(item => {
      item.checked = false
      // value就是购物车id
      item.value = item.cartId + ''
      return item
    })
    console.log('cartList_', cartList)
    return cartList
  },
  getNewIndent: state => state.shopCart.newIndent,
  // 获取患者地址信息 和获取默认地址
  getAddress: state => state.patientAddress.addressInfo,
  getDefaultAddress: (state, getters) => {
    let item = getters.getAddress.find(item => {
      return item.isDefault === 1
    })
    if (item === undefined) {
      return getters.getAddress[0]
    }
    return item
  }
}
export default getters
