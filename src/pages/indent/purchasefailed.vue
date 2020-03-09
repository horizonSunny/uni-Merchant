<template>
  <modal>
    <view class="purchasefailed"> </view>
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
}
</style>