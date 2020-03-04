<template>
  <uni-page-head uni-page-head-type="default" class="topBar">
    <view
      class="uni-page-head"
      style="background-color: #3a74f1;; color: rgb(0, 0, 0);"
    >
      <view class="uni-page-head-hd">
        <view class="uni-page-head-btn" style="display: none;">
          <i class="uni-btn-icon" style="color: rgb(0, 0, 0); font-size: 27px;"
            ></i
          >
        </view>
        <!---->
      </view>
      <view class="uni-page-head-bd">
        <view class="uni-page-head__title" style="font-size: 16px; opacity: 1;">
          <!---->
          <!-- 全部药品 -->
          <slot name="title"></slot>
        </view>
      </view>
      <!---->
      <view class="uni-page-head-ft">
        <view
          class="uni-page-head-btn"
          style="background-color: transparent; width: 29px;"
        >
          <i
            class="uni-btn-icon"
            style="color: rgb(27, 27, 27); font-size: 22px; font-weight: normal; font-family: font1583301982308;"
            ></i
          >
        </view>
      </view>
    </view>
    <view class="uni-placeholder"></view
  ></uni-page-head>
</template>
<script>
export default {

}
</script>
<style lang="scss">
.topBar {
  background: #3a74f1;
}
</style>