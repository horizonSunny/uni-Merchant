<template>
  <view class="content">
    <!-- <view v-if="hasLogin" class="hello"> -->
    <view class="main">
      <view class="merchantInfo">
        <view class="merchantMessage">
          <img src="static/img/位图@2x.png" alt="" class="merchantIcon" />
          <text>瑞康大药店</text>
        </view>
        <img src="static/icon/main/home_right-1.svg" alt="" />
      </view>
      <view class="carousel">
        <view class="carouselAngel angelLeft"> </view>
        <view class="carouselAngel angelRight"> </view>
        <view class="carouselContain">
          <swiper
            :indicator-dots="indicatorDots"
            :autoplay="autoplay"
            :interval="interval"
            :duration="duration"
          >
            <swiper-item>
              <view class="swiper-item uni-bg-red">
                <img
                  src="static/img/home_banner@2x.png"
                  alt=""
                  class="merchantIcon"
                />
              </view>
            </swiper-item>
            <swiper-item>
              <view class="swiper-item uni-bg-green">
                <img
                  src="static/img/home_banner@2x.png"
                  alt=""
                  class="merchantIcon"
              /></view>
            </swiper-item>
          </swiper>
        </view>
      </view>
      <view class="medicineClassify"> </view>
      <view class="recommend"></view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["forcedLogin", "hasLogin", "userName"]),
  onLoad() {},
  onNavigationBarButtonTap(item) {
    // 这边绑定是该页面topBar上面的两个button事件
    console.log("index_", item.index);
  },
  data() {
    return {
      indicatorDots: false,
      autoplay: false,
      interval: 2000,
      duration: 500
    };
  }
};
</script>

<style lang="scss">
.main {
  display: flex;
  flex: 1;
  flex-direction: column;
  .merchantInfo {
    background: #3a74f1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 22px;
    padding: 9px 15px 20px;
    .merchantMessage {
      display: flex;
      align-items: center;
      img {
        margin-right: 5px;
      }
      text {
        color: #fff;
      }
    }
    .merchantIcon {
      width: 64px;
      height: 22px;
    }
  }
  .carousel {
    height: 131px;
    background: #3a74f1;
    text-align: center;
    position: relative;
    .carouselContain {
      z-index: 1;
      display: inline-block;
      background: yellow;
      border-radius: 8px;
      border: 1px dashed #000;
      width: 355px;
      height: 130px;
      img {
        width: 355px;
        height: 130px;
      }
    }
    .carouselAngel {
      position: absolute;
      width: 0;
      height: 0;
      bottom: 0px;
      border-style: solid;
    }
    .angelLeft {
      border-left: 0px;
      border-color: transparent transparent #fff;
      border-width: 0px 150px 60px 0px;
    }
    .angelRight {
      right: 0px;
      border-right: 0px;
      border-color: transparent transparent #fff;
      border-width: 0px 0px 60px 150px;
    }
  }
}
</style>
