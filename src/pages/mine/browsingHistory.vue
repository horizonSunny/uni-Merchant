<template>
  <body-wrap>
    <tob-bar slot="topBar">
      <text slot="title">浏览记录</text>
    </tob-bar>
    <view slot="content" class="content">
      <view class="clearBoth" @click="clearBoth">清空</view>
    </view>
  </body-wrap>
</template>
<script>
export default {
  // computed: mapState(["forcedLogin", "hasLogin", "userName"]),
  methods: {
    clearBoth () {
      console.log('清空');
    }
  }
}
</script>
<style lang="scss">
.content {
  background: #f2f2f2;
  .clearBoth {
    height: 35px;
    line-height: 35px;
    text-align: right;
    font-size: 15px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(27, 27, 27, 1);
    padding: 0px 14px;
    border-bottom: 1px solid #e2e2e2;
  }
}
</style>