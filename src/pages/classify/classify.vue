<template>
  <view class="content">
    <view class="siderBar">
      <scroll-view class="scroll-view" scroll-y>
        <view
          class="firstClassify"
          v-for="(item, index) in classify"
          :class="{ active: index === tabCurrentIndex }"
          :key="index"
          @click="selectBar(index)"
          >{{ item.cateName }}</view
        >
      </scroll-view>
    </view>
    <view class="classifyContent">
      <scroll-view class="scroll-view" scroll-y>
        <view style="height:200px;background:green">1级分类</view>
        <view style="height:200px;background:green">1级分了</view>
        <view style="height:200px;background:green">1级分了</view>
        <view style="height:200px;background:green">1级分了</view>
        <view style="height:200px;background:green">1级分了</view>
      </scroll-view>
    </view>
  </view>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    // menuModal
  },
  data() {
    return {
      tabCurrentIndex: 0
    };
  },
  onLoad() {
    // this.getClassify();
    console.log("this.$store_", this.$store);
    this.getClassify().then(() => {
      console.log("this.$store.getters");
    });
  },
  computed: {
    ...mapGetters(["classify"])
  },
  methods: {
    ...mapActions({
      getClassify: "GetClassify" // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    }),
    change(e) {
      this.current = e.detail.current;
    },
    selectBar(index) {
      this.tabCurrentIndex = index;
    }
  }
};
</script>
<style lang="scss">
uni-page-body {
  height: 100%;
}
.content {
  display: flex;
  flex-direction: row;
  border-top: 1px solid #d4d4d4;
  height: 100%;
  width: 100%;
  background: #fff;
  .siderBar {
    width: 25%;
    text-align: center;
    .firstClassify {
      margin-top: 26px;
      display: inline-block;
      text-align: center;
      width: 85%;
      border-radius: 13px;
      height: 26px;
      line-height: 26px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
    }
    .active {
      background: #3a74f1;
      color: #fff;
    }
  }
  .classifyContent {
    flex: 1;
  }
  .scroll-view {
    height: 100%;
  }
}
</style>
