<template>
  <view class="content">
    <view class="siderBar">
      <scroll-view class="scroll-view" scroll-y>
        <view style="height:300px;background:yellow">1级分了</view>
        <view style="height:300px;background:yellow">1级分了</view>
        <view style="height:300px;background:yellow">1级分了</view>
        <view style="height:300px;background:yellow">1级分了</view>
        <view style="height:300px;background:yellow">1级分了</view>
        <view style="height:300px;background:yellow">1级分了</view>
      </scroll-view>
    </view>
    <view class="classifyContent">
      <scroll-view class="scroll-view" scroll-y>
        <view style="height:200px;background:green">1级分了</view>
        <view style="height:200px;background:green">1级分了</view>
        <view style="height:200px;background:green">1级分了</view>
        <view style="height:200px;background:green">1级分了</view>
        <view style="height:200px;background:green">1级分了</view>
      </scroll-view>
    </view>
  </view>
</template>
<script>
import { mapActions } from "vuex";
export default {
  components: {
    // menuModal
  },
  data() {
    return {
      categoryList: [],
      menuList: []
    };
  },
  onLoad() {
    // this.getClassify();
    console.log("this.$store_", this.$store);

    this.$store.dispatch("GetClassify").then(() => {
      console.log(
        "this.$store.getters.classify_",
        this.$store.getters.classify
      );
    });
  },

  methods: {
    ...mapActions({
      getClassify: "GetClassify" // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    }),
    change(e) {
      this.current = e.detail.current;
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
    width: 20%;
    .scroll-view {
      height: 100%;
    }
  }
  .classifyContent {
    flex: 1;
    .scroll-view {
      height: 100%;
    }
  }
}
</style>
