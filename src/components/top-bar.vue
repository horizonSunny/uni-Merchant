<template>
  <uni-page-head uni-page-head-type="default" style="position:relative">
    <view
      class="uni-page-head"
      style="background-color: #fff; color: rgb(0, 0, 0);"
    >
      <view class="uni-page-head-ft">
        <!-- <img src="static/main/home_scan.svg" alt class="reback" @click="goBack" /> -->
        <view
          class="uni-page-head-btn"
          style="background-color: transparent; width: 29px;"
          v-show="backInfo === '' ? false : true"
          @click="goBack"
        >
          <img src="static/icon/commodityDetails/reback.svg" class="reback" />
        </view>
        <!-- <view
          class="uni-page-head-btn"
          style="background-color: transparent; width: 29px;"
        >
          <img src="static/main/home_scan.svg" class="reback" />
        </view> -->
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
          <!-- {{ backInfo }} -->
        </view>
        <!-- <view
          class="uni-page-head-btn"
          style="background-color: transparent; width: 29px;"
        >
          hello
        </view> -->
      </view>
    </view>
    <view class="uni-placeholder"></view>
  </uni-page-head>
</template>
<script>
export default {
  // created(){

  // },
  props: ['backInfo'],
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
</style>