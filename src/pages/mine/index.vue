<template>
  <body-wrap>
    <tob-bar
      slot="topBar"
      backInfo="white"
      jumpButton
      :styleInfo="{ backgroundColor: '#3E79F5' }"
    >
      <text slot="title">个人中心</text>
      <img src="static/main/home_messages.svg" alt slot="rightIcon" />
    </tob-bar>
    <view slot="content" class="content">
      <view class="head">
        <view class="headPortrait">
          <img
            :src="getUserDetails.avatar ? getUserDetails.avatar : correctUrl"
            @error="imageError(item)"
            alt
          />
          <text>{{ getUserDetails.phone ? getUserDetails.phone : 0 }}</text>
        </view>
        <view class="classify">
          <view class="classifyItem" @click="goNextPage('浏览记录')">
            <view>
              {{
                getStatisticData.visitCount ? getStatisticData.visitCount : 0
              }}
            </view>
            <view>浏览记录</view>
          </view>
          <view class="separator"></view>
          <view class="classifyItem" @click="goNextPage('收藏')">
            <view>
              {{
                getStatisticData.collectCount
                  ? getStatisticData.collectCount
                  : 0
              }}
            </view>
            <view>收藏</view>
          </view>
          <view class="separator"></view>
          <view class="classifyItem">
            <view>{{
              getStatisticData.waitGoodsCount
                ? getStatisticData.waitGoodsCount
                : 0
            }}</view>
            <view>药店关注</view>
          </view>
        </view>
      </view>
      <view class="function">
        <view class="classifyTitle">
          <text class="title">我的订单</text>
          <view class="medicineOperate" @click="goMyIndent(0)">
            <text class="operate">全部订单</text>
            <img src="static/icon/main/home_right-2.svg" alt />
          </view>
        </view>
        <view class="classifyDetails">
          <view class="detailsInfo" @click="goMyIndent(1)">
            <img src="/static/mine/mine_pending payment.svg" alt />
            <view>待付款</view>
          </view>
          <view class="detailsInfo" @click="goMyIndent(2)">
            <img src="/static/mine/mine_to be shipped.svg" alt />
            <view>待发货</view>
          </view>
          <view class="detailsInfo" @click="goMyIndent(3)">
            <img src="/static/mine/mine_goods to be received.svg" alt />
            <view>待收货</view>
          </view>

          <view class="detailsInfo" @click="goMyIndent(4)">
            <img src="/static/mine/mine_to be evaluated.svg" alt />
            <view>待评价</view>
          </view>
        </view>
      </view>
      <view class="function">
        <view class="classifyTitle">
          <text class="title">我的服务</text>
        </view>
        <view class="classifyDetails">
          <view class="detailsInfo" @click="goNextPage('收货地址')">
            <img src="/static/mine/mine_address.svg" alt />
            <view>收货地址</view>
          </view>
          <view class="detailsInfo" @click="goNextPage('用药人')">
            <img src="/static/mine/mine_drug users.svg" alt />
            <view>用药人</view>
          </view>
        </view>
      </view>
    </view>
    <tab-bar slot="tabBar"></tab-bar>
  </body-wrap>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import tabBar from '@/components/tab-bar'
import tobBar from '@/components/top-bar'
export default {
  // computed: mapState(["forcedLogin", "hasLogin", "userName"]),
  components: {
    tabBar,
    tobBar
  },
  computed: {
    ...mapGetters(['getUserDetails', 'getStatisticData'])
  },
  onShow () {
    this.userDetails()
    this.statisticData()
  },
  methods: {
    ...mapActions({
      userDetails: 'GetUserDetails',
      statisticData: 'GetStatisticData'
    }),
    // 跳转药品简介页面
    toDrugIntr () {
      console.log('toDrugIntr_')
      uni.navigateTo({
        url: '../merchantsIntr/merchantsIntr'
      })
    },
    goMyIndent (info) {
      console.log('goMyIndent_')
      this.$navTo('../myIndent/index', { orderStatus: info })
    },
    // 跳转下一个页面，依据判断
    goNextPage (info) {
      switch (info) {
        case '浏览记录':
          this.$navTo('../mine/browsingHistory')
          break
        case '收藏':
          this.$navTo('../mine/collect')
          break
        case '用药人':
          this.$navTo('../mine/medicineMan')
          break
        case '收货地址':
          this.$navTo('../deliveryAddr/index')
          break
        default:
          break
      }
    },
    // 图片加载失败
    imageError (item) {
      console.log('imageError_', item)
      item.productImage = this.correctUrl
    }
  },
  data () {
    return {
      // indicatorDots: false,
      // autoplay: false,
      // interval: 2000,
      // duration: 500,
      correctUrl: '/static/mine/mine_default head.svg'
    }
  }
}
</script>

<style lang="scss">
.main {
  display: flex;
  flex: 1;
  flex-direction: column;
  background: #f4f1f4;
  .content {
    background: #f4f1f4;
    .head {
      width: 100%;
      height: 138px;
      padding: 27px 0px 0px 0px;
      background: url("../../static/mine/mine_background.svg");
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      .headPortrait {
        height: 44px;
        display: flex;
        margin-left: 14px;
        align-items: center;
        img {
          height: 44px;
          width: 44px;
        }
        text {
          height: 22px;
          line-height: 22px;
          margin-left: 10px;
        }
      }
      .classify {
        margin-top: 25px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        .classifyItem {
          width: 97px;
          height: 40px;
          text-align: center;
        }
        .separator {
          height: 12px;
          background: rgba(255, 255, 255, 1);
          width: 2px;
        }
      }
    }
    .function {
      margin: 10px 8px;
      padding: 10px 8px;
      width: auto;
      background: #fff;
      height: 112px;
      border-radius: 4px;
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
        height: 89px;
        display: flex;
        align-items: center;
        width: 100%;
        .detailsInfo {
          width: 25%;
          display: flex;
          flex-direction: column;
          align-items: center;
          img {
            margin-bottom: 13px;
          }
        }
      }
    }
  }
}
</style>
