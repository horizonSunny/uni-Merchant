<template>
  <uni-page-head uni-page-head-type="default" style="position:relative;">
    <view class="uni-page-head" :style="styleInfo">
      <view class="uni-page-head-ft">
        <!-- <img src="static/main/home_scan.svg" alt class="reback" @click="goBack" /> -->
        <view
          class="uni-page-head-btn"
          style="background-color: transparent; width: 29px;text-align: left;"
          @click="goBack"
        >
          <img
            v-show="backInfo === '' ? false : true"
            src="static/icon/commodityDetails/reback.svg"
            class="reback"
          />
          <slot name="leftIcon" class="reback"></slot>
        </view>
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
          style="background-color: transparent; width: 29px; text-align: right;"
        >
          <slot name="rightIcon" class="reback"></slot>
        </view>
      </view>
    </view>
    <view class="uni-placeholder"></view>
  </uni-page-head>
</template>
<script>
export default {
  // created(){

  // },
  props: ['backInfo', 'styleInfo'],
  data () {
    return {
      // goBack: true
    }
  },
  methods: {
    goBack () {
      console.log('goback');
      uni.navigateBack({
        delta: 1
      });
    },
  }
}
</script>
<style lang="scss">
.reback {
  width: 22px;
  height: 22px;
}
uni-page-head .uni-page-head-bd {
  left: 60px;
  right: 60px;
}
</style>