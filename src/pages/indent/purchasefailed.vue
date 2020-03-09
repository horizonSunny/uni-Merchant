<template>
  <modal>
    <view class="purchasefailed">
      <view class="title">
        购买失败
      </view>
      <view class="content"></view>
      <view class="footer">
        <button type="primary">我知道了</button>
      </view>
    </view>
  </modal>
</template>
<script>
import modal from '@/components/modal.vue';
export default {
  components: {
    // commidityItem
    modal
  },
}
</script>
<style lang="scss" scoped>
.purchasefailed {
  height: 380px;
  width: 94%;
  position: absolute;
  left: 50%;
  margin-left: -47%;
  top: 50%;
  margin-top: -190px;
  background: #fff;
  opacity: 1;
  z-index: 999;
  border-radius: 10px;
  .title {
    height: 46px;
    line-height: 46px;
    text-align: center;
    border-bottom: 1px solid #f2f2f2;
  }
  .content {
    height: 264px;
    line-height: 88px;
  }
  .footer {
    height: 54px;
    /deep/ uni-button {
      width: 30%;
    }
  }
}
</style>