<template>
  <body-wrap>
    <tob-bar slot="topBar">
      <text slot="title">浏览记录</text>
    </tob-bar>
    <view slot="content" class="content">
      <view class="clearBoth" @click="clearBoth">清空</view>
      <view
        class="contentInfo"
        v-for="(item, index) in productInfo"
        :key="index"
      >
        <view class="timeShow">{{ item.time }}</view>
        <view
          v-for="(itemInfo, indexInfo) in item.product"
          :key="indexInfo"
          class="productInfo"
        >
          <uni-swipe-action>
            <uni-swipe-action-item
              :options="options"
              @click="onClick"
              @change="change"
              @click.stop
            >
              <view class="commidityInfo" @click.stop>
                <view class="productImg">
                  <img
                    src="/static/img/home.png"
                    alt=""
                    width="60"
                    height="60"
                  />
                  <view class="model">已下架</view>
                </view>
                <view class="drugsInfo">
                  <view class="drugName">
                    <text class="mark">OTC</text>
                    <!-- <text class="mark" v-show="item.isMp === 0">OTC</text>
                <text class="mark" v-show="item.isMp === 1">双规</text>
                <text class="mark" v-show="item.isMp === 2">RX</text>
                <text class="mark" v-show="item.isMp === 3">其他</text> -->
                    <text>爱康国宾 疾病 宾 疾病</text>
                    <view class="drugSpec">乳腺癌检测 1次</view>
                    <!-- <text>{{ item.productName }}</text> -->
                  </view>
                  <!-- <view class="drugSpec">{{ item.productSpecif }}</view> -->
                </view>
              </view>
            </uni-swipe-action-item>
          </uni-swipe-action>
        </view>
      </view>
    </view>
  </body-wrap>
</template>
<script>
import { browsingHistory } from '@/config/test'
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
export default {
  // computed: mapState(["forcedLogin", "hasLogin", "userName"]),
  components: {
    uniSwipeAction,
    uniSwipeActionItem
  },
  data () {
    return {
      productInfo: browsingHistory,
      options: [
        {
          text: '删除',
          style: {
            backgroundColor: '#E60B35',
            width: '50px',
            textWidth: "30px",
            fontSize: '15px'
          }
        }
      ],
    }
  },
  methods: {
    clearBoth () {
      console.log('清空');
    },
    onClick (e) {
      console.log('当前点击的是第' + e.index + '个按钮，点击内容是' + e.content.text)
    },
    change (open) {
      console.log('当前开启状态：' + open)
    }
  }
}
</script>
<style lang="scss">
.content {
  background: #f2f2f2;
  .clearBoth {
    height: 35px;
    line-height: 35px;
    text-align: right;
    font-size: 15px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(27, 27, 27, 1);
    padding: 0px 14px;
    border-bottom: 1px solid #e2e2e2;
  }
  .contentInfo {
    .timeShow {
      height: 34px;
      line-height: 34px;
      padding: 0px 15px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(137, 137, 137, 1);
    }
    .productInfo {
      .commidityInfo {
        height: 89px;
        width: 100%;
        padding: 12px 14px 15px;
        display: flex;
        align-items: center;
        .productImg {
          width: 60px;
          height: 60px;
          margin-left: 10px;
          position: relative;
          .model {
            text-align: center;
            width: 60px;
            height: 60px;
            line-height: 60px;
            position: absolute;
            z-index: 999;
            opacity: 0.5;
            top: 0px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            background: #000;
          }
        }
        .drugsInfo {
          flex: 1;
          height: 75px;
          margin-top: 10px;
          margin-left: 11px;
          // display: flex;
          // flex-direction: column;
          // justify-content: space-between;
          .drugName {
            width: 100%;
            height: 66px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(27, 27, 27, 1);
            line-height: 20px;
            .mark {
              position: relative;
              display: inline-block;
              height: 12px;
              line-height: 12px;
              top: -1px;
              width: 30px;
              height: 12px;
              margin-right: 10px;
              line-height: 12px;
              border: 1px solid #d7242c;
              border-radius: 5px;
              text-align: center;
              font-size: 5px;
              color: #d7242c;
              font-weight: 800;
            }
          }
          .drugSpec {
            height: 18px;
            margin-top: 7px;
            font-size: 13px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(137, 137, 137, 1);
            line-height: 18px;
          }
        }
      }
    }
  }
}
</style>