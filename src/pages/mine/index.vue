<template>
  <body-wrap>
    <tob-bar slot="topBar">
      <text slot="title">个人中心</text>
    </tob-bar>
    <view slot="content" class="content">
      <view class="head">
        <view class="headPortrait">
          <img src="/static/mine/mine_default head.svg" alt="" />
          <text>136****9087</text>
        </view>
        <view class="classify">
          <view class="classifyItem">
            <view>128</view>
            <view>浏览记录</view>
          </view>
          <view class="separator"></view>
          <view class="classifyItem">
            <view>39</view>
            <view>收藏</view>
          </view>
          <view class="separator"></view>
          <view class="classifyItem">
            <view>104</view>
            <view>药店关注</view>
          </view>
        </view>
      </view>
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
      padding: 27px 0px 0px 0px;
      background: url("../../static/mine/mine_background.svg");
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      .headPortrait {
        height: 44px;
        display: flex;
        margin-left: 14px;
        align-items: center;
        img {
          height: 44px;
          width: 44px;
        }
        text {
          height: 22px;
          line-height: 22px;
          margin-left: 10px;
        }
      }
      .classify {
        margin-top: 25px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        .classifyItem {
          width: 97px;
          height: 40px;
          text-align: center;
        }
        .separator {
          height: 12px;
          background: rgba(255, 255, 255, 1);
          width: 2px;
        }
      }
    }
  }
}
</style>
