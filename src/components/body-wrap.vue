<template>
  <view class="main">
    <slot name="topBar"></slot>
    <slot name="content"></slot>
    <slot name="tabBar"></slot>
  </view>
</template>
<script>
export default {

}
</script>
<style lang="scss">
.main {
  display: flex;
  flex-direction: column;
}
</style>