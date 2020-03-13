<template>
  <body-wrap>
    <tob-bar
      slot="topBar"
      :backInfo="''"
      :styleInfo="{ backgroundColor: '#3E79F5' }"
    >
      <img
        src="static/main/home_scan.svg"
        alt=""
        slot="leftIcon"
        @click="gotoNextPage('../login/login', {})"
      />
      <div
        class="uni-page-head-search"
        style="border-radius: 17px; background-color: #89AEFF;height:30px;line-height:30px;"
        slot="title"
        @click="gotoNextPage('../search/search', {})"
      >
        <div
          class="uni-page-head-search-placeholder uni-page-head-search-placeholder-center searchClass"
        >
          请输入商品名、通用名、批准文号
        </div>
        <uni-input
          class="uni-page-head-search-input"
          style="color: rgb(0, 0, 0);"
          ><div class="uni-input-wrapper">
            <div
              class="uni-input-placeholder"
              style="color: rgb(204, 204, 204);"
            ></div>
            <form action="" class="uni-input-form">
              <input
                disabled="disabled"
                maxlength="140"
                step=""
                autocomplete="off"
                type="search"
                class="uni-input-input"
              />
            </form></div
        ></uni-input>
      </div>
      <img src="static/main/home_messages.svg" alt="" slot="rightIcon" />
    </tob-bar>
    <view slot="content" class="content">
      <view class="main">
        <view class="merchantInfo">
          <view class="merchantMessage">
            <img :src="tenant.tenantLogo" alt="" class="merchantIcon" />
            <text>{{ tenant.tenantName }}</text>
          </view>
          <view
            class="merchantSkip"
            @click="gotoNextPage('../merchantsIntr/merchantsIntr', {})"
          >
            <img src="static/icon/main/home_right-1.svg" alt="" />
          </view>
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
              <swiper-item v-for="(item, index) in banners" :key="index">
                <view class="swiper-item uni-bg-green">
                  <img :src="item" alt="" class="merchantIcon"
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
            <view
              class="medicineOperate"
              @click="gotoNextPage('../classify/classify', {})"
            >
              <text class="operate">
                全部药品
              </text>
              <img src="static/icon/main/home_right-2.svg" alt="" />
            </view>
          </view>
          <view class="classifyDetails">
            <view
              class="classifyItem"
              v-for="(item, index) in quickCategorys"
              :key="index"
              @click="
                gotoNextPage('../classify/classifyDetails', {
                  quickCategoryId: item.quickCategoryId
                })
              "
            >
              <img :src="item.image" alt="" />
              <text>{{ item.categoryName }}</text>
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
              v-for="(item, index) in products"
              :key="index"
              @click="
                gotoNextPage('../commodityDetails/index', {
                  productId: item.productId
                })
              "
            >
              <img :src="item.productImage[0]" alt="" />
              <view class="productDetails">
                <text class="mark" v-show="item.isMp === 0">OTC</text>
                <text class="mark" v-show="item.isMp === 1">双规</text>
                <text class="mark" v-show="item.isMp === 2">RX</text>
                <text class="mark" v-show="item.isMp === 3">其他</text>
                <text>{{ item.productName }}</text>
              </view>
              <view class="specification">
                {{ item.productSpecif }}
              </view>
              <view class="price">
                {{ item.price }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <tab-bar slot="tabBar"></tab-bar>
  </body-wrap>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import tabBar from "@/components/tab-bar";
import tobBar from "@/components/top-bar";
export default {
  components: {
    tabBar,
    tobBar
  },
  computed: {
    ...mapGetters(["tenant", "banners", "quickCategorys", "products"])
  },
  onLoad () {
    this.getMainInfo()
    // this.getKeyWord()
  },
  methods: {
    ...mapActions({
      getMainInfo: "GetMainInfo",
      getKeyWord: "GetKeyWord",
    }),
    // 跳转页面
    gotoNextPage (url, parameters) {
      this.$navTo(url, parameters);
    },
  },
  data () {
    return {
      indicatorDots: false,
      autoplay: true,
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
      border-radius: 4px;
    }
    .merchantSkip {
      width: 15%;
      img {
        float: right;
      }
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
      background: #fff;
      border-radius: 8px;
      border: 1px dashed #000;
      width: 355px;
      height: 130px;
      img {
        width: 355px;
        height: 130px;
        border-radius: 8px;
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
      margin-bottom: 8px;
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
        margin-bottom: 10px;
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
          // width: 130px;
          padding: 0xp 10px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(27, 27, 27, 1);
          line-height: 20px;
          text {
            width: 120px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .mark {
            position: relative;
            top: 2px;
            left: 8px;
            width: 38px;
            height: 14px;
            margin-right: 10px;
            line-height: 14px;
            border: 1px solid #d7242c;
            border-radius: 5px;
            text-align: center;
            font-size: 5px;
            color: #d7242c;
            font-weight: 800;
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
.search {
  width: 100%;
  height: 30px;
  background: rgba(137, 174, 255, 1);
  border-radius: 17px;
}
.searchClass {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.uni-page-head-search-placeholder:before {
  position: absolute;
  top: 0;
  left: 2px;
  width: 30px;
  content: "\ea0e";
  display: block;
  font-size: 20px;
  font-family: uni;
  text-align: center;
  font-size: 15px;
}
</style>
