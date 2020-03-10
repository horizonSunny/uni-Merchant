<template>
  <body-wrap>
    <tob-bar slot="topBar">
      <text slot="title">个人中心</text>
    </tob-bar>
    <view slot="content" class="content">
      <view class="head"> </view>
    </view>
    <tab-bar slot="tabBar"></tab-bar>
  </body-wrap>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import tabBar from "@/components/tab-bar";
import tobBar from "@/components/top-bar";
export default {
  // computed: mapState(["forcedLogin", "hasLogin", "userName"]),
  components: {
    tabBar,
    tobBar
  },
  computed: {
    ...mapGetters(["tenant", "banners", "quickCategorys", "products"])
  },
  onLoad () {
    this.getMainInfo()
    // this.getKeyWord()
  },
  onNavigationBarButtonTap (item) {
    // 这边绑定是该页面topBar上面的两个button事件
    console.log("index_", item.index);
  },
  // 输入框点击事件
  onNavigationBarSearchInputClicked (e) {
    // this.$api.msg('点击了搜索框');
    uni.navigateTo({
      url: "../search/search"
    });
  },
  methods: {
    ...mapActions({
      getMainInfo: "GetMainInfo",
      getKeyWord: "GetKeyWord",
      // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    }),
    // 跳转药品简介页面
    toDrugIntr () {
      console.log("toDrugIntr_");
      uni.navigateTo({
        url: "../merchantsIntr/merchantsIntr"
      });
    },
    goClassify () {
      console.log("goClassify_");
      this.$navTo("../classify/classify");
    },
    // 跳转快速分类页面
    toClassify (item) {
      console.log('item_', item);
      uni.navigateTo({
        url: "../classify/classifyDetails?quickCategoryId=" + item.quickCategoryId
      });
    },
    // 跳转商品详情页面
    toProductDetails (item) {
      console.log(item.tenantPriceId);
      uni.navigateTo({
        url: "../commodityDetails/index?tenantPriceId=" + item.tenantPriceId
      });
    }
  },
  data () {
    return {
      indicatorDots: false,
      autoplay: false,
      interval: 2000,
      duration: 500
    };
  }
};
</script>

<style lang="scss">
.main {
  display: flex;
  flex: 1;
  flex-direction: column;
  background: #fafafe;
  .content {
    .head {
      width: 100%;
      height: 138px;
      background: #477efb;
    }
  }
}
</style>
