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
      <view class="classify">
        <view class="classifyTitle">
          <text class="title">
            快速找药
          </text>
          <view class="medicineOperate">
            <text class="operate">
              全部药品
            </text>
            <img src="static/icon/main/home_right-2.svg" alt="" />
          </view>
        </view>
        <view class="classifyDetails">
          <view
            class="classifyItem"
            v-for="(item, index) in medicineClassify"
            :key="index"
          >
            <img :src="item.url" alt="" />
            <text>{{ item.name }}</text>
          </view>
        </view>
      </view>
      <view class="classify">
        <view class="classifyTitle">
          <text class="title">
            商家推荐
          </text>
        </view>
        <view class="classifyContent">
          <view
            class="contentItem"
            v-for="(item, index) in recommend"
            :key="index"
          >
            <img :src="item.url" alt="" />
            <view class="productDetails">
              <img v-if="item.otc" src="static/icon/main/OTC.svg" alt="" />
              <text>{{ item.brand }}</text>
              <text>{{ item.commandName }}</text>
            </view>
            <view class="specification">
              {{ item.specification }}
            </view>
            <view class="price">
              {{ item.price }}
            </view>
          </view>
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
  data() {
    return {
      indicatorDots: false,
      autoplay: false,
      interval: 2000,
      duration: 500,
      medicineClassify: [
        {
          url: "static/icon/main/home_Cold@2x.png",
          name: "感冒发烧"
        },
        {
          url: "static/icon/main/home_cough@2x.png",
          name: "咳嗽用药"
        },
        {
          url: "static/icon/main/home_Cold@2x.png",
          name: "感冒发烧"
        },
        {
          url: "static/icon/main/home_cough@2x.png",
          name: "咳嗽用药"
        },
        {
          url: "static/icon/main/home_Cold@2x.png",
          name: "感冒发烧"
        },
        {
          url: "static/icon/main/home_cough@2x.png",
          name: "咳嗽用药"
        }
      ],
      recommend: [
        {
          url: "static/icon/main/Product-Bitmap@2x.png",
          otc: true,
          brand: "23312",
          commandName: "sdsd",
          specification: "100ml",
          price: 123
        },
        {
          url: "static/icon/main/Product-Bitmap@2x.png",
          otc: true,
          brand: "23312",
          commandName: "sdsd",
          specification: "100ml",
          price: 123
        },
        {
          url: "static/icon/main/Product-Bitmap@2x.png",
          otc: false,
          brand: "23312",
          specification: "100ml",
          commandName: "sdsd",
          price: 123
        }
      ]
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
  .classify {
    padding: 12px 10px 15px;
    .classifyTitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-size: 16px;
        font-weight: 500;
        color: rgba(27, 27, 27, 1);
      }
      .medicineOperate {
        display: flex;
        align-items: center;
        .operate {
          font-size: 12px;
          font-weight: 500;
          color: rgba(137, 137, 137, 1);
          margin-right: 5px;
        }
      }
    }
    .classifyDetails {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      .classifyItem {
        margin-top: 16px;
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 44px;
          height: 44px;
        }
        text {
          margin-top: 7px;
          font-size: 13px;
          font-weight: 400;
          width: 52px;
          height: 18px;
          line-height: 18px;
        }
      }
    }
    .classifyContent {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .contentItem {
        background: #fff;
        display: flex;
        width: 49%;
        align-items: center;
        border-radius: 4px;
        height: 200px;
        flex-direction: column;
        img {
          width: 100px;
          height: 100px;
          margin-top: 9px;
        }
        .productDetails {
          margin-top: 7px;
          width: 130px;
          padding-right: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(27, 27, 27, 1);
          line-height: 20px;
          img {
            width: 32px;
            height: 14px;
          }
        }
        .specification {
          margin-top: 3px;
          width: 150px;
          height: 18px;
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(137, 137, 137, 1);
          line-height: 18px;
        }
        .price {
          margin-top: 3px;
          width: 150px;
          height: 22px;
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(250, 73, 73, 1);
          line-height: 22px;
        }
      }
    }
  }
}
</style>
