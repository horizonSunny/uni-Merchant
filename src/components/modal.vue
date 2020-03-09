<template>
  <view class="modal">
    <slot></slot>
  </view>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.modal {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 998;
  background: rgba($color: #000000, $alpha: 0.7);
}
</style>