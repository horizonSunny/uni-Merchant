<template>
  <body-wrap>
    <tob-bar
      slot="topBar"
      backInfo="white"
      jumpButton="white"
      :styleInfo="{ backgroundColor: '#3E79F5' }"
    >
      <text slot="title">店铺简介</text>
    </tob-bar>
    <view class="content" slot="content">
      <!-- <view v-if="hasLogin" class="hello"> -->
      <view class="main">
        <view class="merchantInfo">
          <view class="merchantMessage">
            <img :src="tenant.tenantLogo" alt="" class="merchantIcon" />
            <view class="merchantDetails">
              <view>{{ tenant.tenantName }}</view>
              <view class="merchantLocation">
                <img src="static/icon/merchantsIntr/location.svg" alt="" />
                {{ tenant.address }}</view
              >
            </view>
          </view>
        </view>
        <view class="classify">
          <view class="classifyTitle">
            <text class="title">
              商家资质
            </text>
          </view>
          <view class="classifyContent">
            <view
              class="contentItem"
              v-for="(item, index) in tenant.enterpriseQualification"
              :key="index"
            >
              <img :src="item.url" alt="" />
              <text>{{ item.name }} </text>
            </view>
          </view>
        </view>
        <view class="classify">
          <view class="classifyTitle">
            <text class="title">
              商家实景
            </text>
          </view>
          <view class="merchantLive">
            <swiper>
              <swiper-item
                v-for="(item, index) in tenant.storeLive"
                :key="index"
              >
                <view class="swiper-item uni-bg-green">
                  <img :src="item" alt="" class="merchantIcon"
                /></view>
              </swiper-item>
            </swiper>
          </view>
        </view>
      </view>
    </view>
  </body-wrap>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["tenant", "banners", "quickCategorys", "products"])
  },
  onLoad () { },
  onNavigationBarButtonTap (item) {
    // 这边绑定是该页面topBar上面的两个button事件
    console.log("index_", item.index);
  },
  data () {
    return {
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
    background: #fff;
    height: 43px;
    padding: 21px 15px 16px;
    .merchantMessage {
      display: flex;
      align-items: flex-start;
      .merchantIcon {
        width: 64px;
        height: 22px;
      }
      .merchantDetails {
        margin-left: 5px;
        width: 70%;
        .merchantLocation {
          height: 18px;
          margin-top: 2px;
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(27, 27, 27, 1);
          line-height: 18px;
          img {
            position: relative;
            top: 3px;
            width: 15px;
            height: 15px;
          }
        }
      }
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
    .classifyContent {
      display: flex;
      flex-wrap: wrap;
      padding: 0px 10px;
      justify-content: space-between;
      .contentItem {
        margin-bottom: 10px;
        background: #fff;
        display: flex;
        width: 47%;
        border-radius: 4px;
        height: 180px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img {
          width: 80%;
          height: 115px;
        }
        text {
          margin-top: 10px;
        }
      }
    }
    .merchantLive {
      width: 100%;
      height: 172px;
      background: #fff;
      img {
        width: 100%;
      }
    }
  }
}
</style>
