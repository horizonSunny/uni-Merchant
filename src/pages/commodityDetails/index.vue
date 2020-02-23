<template>
  <view class="content">
    <!-- <view v-if="hasLogin" class="hello"> -->
    <view class="main">
      <view class="carousel">
        <view class="carouselContain">
          <swiper
            :indicator-dots="indicatorDots"
            :autoplay="autoplay"
            :interval="interval"
            :duration="duration"
          >
            <swiper-item>
              <view class="swiper-item uni-bg-red">
                <img src="static/img/home_banner@2x.png" alt class="merchantIcon" />
              </view>
            </swiper-item>
            <swiper-item>
              <view class="swiper-item uni-bg-green">
                <img src="static/img/home_banner@2x.png" alt class="merchantIcon" />
              </view>
            </swiper-item>
          </swiper>
        </view>
      </view>
      <view class="serviceInfo">
        <text>
          <img src="@/static/icon/commodityDetails/selected.svg" alt />24小时发货
        </text>
        <text>
          <img src="@/static/icon/commodityDetails/selected.svg" alt />品质保障
        </text>
        <text>
          <img src="@/static/icon/commodityDetails/selected.svg" alt />提供发票
        </text>
      </view>
      <view class="separate productIntr">
        <view class="productPrice">¥ 232.00</view>
        <view class="productName">商品品牌 通用名</view>
        <view class="productIntro">药品简介药品简介药品简介药品简介药品简介</view>
      </view>
      <view class="separate logisticsInfo">
        <view class="logistics">
          配送
          <text>福建厦门</text>至
          <text>上海浦东新区</text>
        </view>
        <view class="logistics">
          运费
          <text>8.00元起</text>
        </view>
        <view class="logistics">
          库存
          <text>
            1212
            <text class="limitation">(限购3件)</text>
          </text>有效期至
          <text>剩余有效期至>180</text>
        </view>
      </view>
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
  methods: {
    testTologin() {
      console.log("testTologin_");
      uni.navigateTo({
        // url: "../login/login"
        // url: "../merchantsIntr/merchantsIntr"
        url: "../search/search"
      });
    },
    goClassify() {
      console.log("goClassify_");
      uni.switchTab({
        // url: "../login/login"
        // url: "../merchantsIntr/merchantsIntr"
        url: "../classify/classify"
      });
    }
  },
  data() {
    return {
      indicatorDots: false,
      autoplay: false
    };
  }
};
</script>

<style lang="scss">
.main {
  display: flex;
  flex: 1;
  flex-direction: column;
  background: #fafafe;
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
    height: 200px;
    text-align: center;
    position: relative;
    .carouselContain {
      z-index: 1;
      display: inline-block;
      border-radius: 8px;
      width: 100%;
      height: 200px;
      img {
        width: 100%;
        height: 200px;
      }
    }
    .carouselAngel {
      position: absolute;
      width: 0;
      height: 0;
      bottom: 0px;
      border-style: solid;
    }
  }
  .serviceInfo {
    background: rgba(246, 246, 246, 1);
    width: 100%;
    height: 30px;
    line-height: 30px;
    text {
      margin-left: 20px;
      width: 75px;
      height: 17px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(105, 105, 105, 1);
      line-height: 17px;
    }
    img {
      position: relative;
      top: 4px;
      height: 17px;
      width: 17px;
    }
  }
  .separate {
    margin-bottom: 10px;
    padding: 13px 10px;
  }
  // 商品名
  .productIntr {
    background: #fff;
    .productPrice {
      height: 30px;
      font-size: 22px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(250, 73, 73, 1);
      line-height: 30px;
    }
    .productName {
      margin-top: 7px;
      height: 21px;
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(27, 27, 27, 1);
      line-height: 21px;
    }
    .productIntro {
      margin-top: 3px;
      height: 36px;
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(137, 137, 137, 1);
      line-height: 18px;
    }
  }
  // 配送
  .logisticsInfo {
    background: #fff;
    .logistics {
      height: 18px;
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(137, 137, 137, 1);
      line-height: 18px;
      margin-bottom: 5px;
      text {
        color: rgba(27, 27, 27, 1);
        margin: 0px 8px;
        .limitation {
          color: rgba(247, 109, 32, 1);
          margin-right: 21px;
        }
      }
    }
  }
  uni-swiper {
    display: block;
    height: 200px;
  }
}
</style>
