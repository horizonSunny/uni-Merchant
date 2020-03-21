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
    console.log("state.business.searchKeyword_", state.business.searchKeyword);
    const keyInfo = state.business.searchKeyword.filter(item => {
      return item.keyword.indexOf(keyWord) != -1;
    });
    console.log("keyInfo_", keyInfo);
    return keyInfo;
  },
  /**
   * 二期购物车订单我的功能
   */
  // 获取购物车列表
  getShopCartList: state => {
    console.log("cartList_", state.shopCart.shopCartInfo);
    let cartList = state.shopCart.shopCartInfo.map(item => {
      item.checked = false;
      // value就是购物车id
      item.value = item.cartId + "";
      return item;
    });
    console.log("cartList_", cartList);
    return cartList;
  },
  getNewIndent: state => state.shopCart.newIndent,
  // 对订单做一个区分
  newIndentClassification: (state, getters) => {
    let activeIndent = [],
      invalidIndent = [];
    getters.getNewIndent.selectedCart.forEach(element => {
      if (element.isShelf === 1) {
        activeIndent.push(element);
      } else {
        invalidIndent.push(element);
      }
    });
    return { activeIndent, invalidIndent };
  },
  // 获取患者地址信息 和获取默认地址
  getAddress: state => state.patientAddress.addressInfo,
  getDefaultAddress: (state, getters) => {
    console.log("getters_", getters);

    let item =
      getters.getAddress.length !== 0 &&
      getters.getAddress.find(item => {
        return item.isDefault === 1;
      });
    if (item === undefined) {
      return getters.getAddress[0];
    }
    console.log("item_", item);
    return item;
  },
  // 获取浏览记录等
  getProductVisit: state => state.user.productVisit,
  // 获取模版信息 state获取模版,如果修改的话，修改变动用药人疾病信息。这边state会获取用药人信息和模版信息
  medicineTemplate: state => state.business.getMedicineTemplate,
  // 获取用药人信息
  getMedicineMan: state => state.user.medicineMan,
  // 获取当前编辑用药人
  getCurrentMedicineMan: state => state.user.currentMedicineMan,
  // 获取用户信息详情和用户统计数据
  getUserDetails: state => state.user.userDetails,
  getStatisticData: state => state.user.statisticData,
  // 获取收藏信息
  getCollectInfo: state => state.user.collect,
  // 拉取保存的订单信息
  getIndentInfo: state => {
    return state.business.myIndentInfo;
  }
};
export default getters;
