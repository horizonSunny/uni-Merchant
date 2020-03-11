<template>
  <body-wrap>
    <tob-bar slot="topBar">
      <text slot="title">收藏</text>
    </tob-bar>
    <view slot="content" class="content">
      <view class="clearBoth" @click="clearBoth">编辑</view>
      <checkbox-group @change="checkboxChange">
        <label
          class="uni-list-cell uni-list-cell-pd"
          v-for="item in items"
          :key="item.value"
        >
          <uni-swipe-action>
            <uni-swipe-action-item
              :options="options"
              @click="onClick"
              @change="change"
              @click.stop
            >
              <view class="commidityInfo" @click.stop>
                <checkbox
                  :value="item.value"
                  color="#FFCC33"
                  :checked="checkedArr.includes(String(item.value))"
                />
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
                  <view class="drugPrice">
                    <text>
                      ¥ 123
                    </text>
                    <yp-number-box :min="0" :max="9"></yp-number-box>
                    <!-- {{ item.price }} -->
                  </view>
                </view>
              </view>
            </uni-swipe-action-item>
          </uni-swipe-action>
        </label>
      </checkbox-group>
      <view v-show="false" class="noHistory">
        <img src="static/mine/Search_Bitmap2.svg" alt="" />
        <view class="noInfo">抱歉，暂无浏览记录哦～</view>
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
          text: '取消收藏',
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
    checkboxChange: function (e) {
      this.checkedArr = e.detail.value;
      // 如果选择的数组中有值，并且长度等于列表的长度，就是全选
      if (this.checkedArr.length > 0 && this.checkedArr.length == this.items.length) {
        this.allChecked = true;
      } else {
        this.allChecked = false;
      }
    },
    editor () {
      console.log('编辑');
    },
    onClick (e, itemInfo, time) {
      console.log('当前点击的是第' + e.index + '个按钮，点击内容是' + e.content.text)
      console.log(itemInfo, '_itemInfo_', time);
    },
    // 滚动到底部
    scrolltolower () {
      console.log('scrolltolower');
      this.productInfo = this.productInfo.concat(browsingHistory)
    }
  }
}
</script>
<style lang="scss">
.content {
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
  .scrollView {
    flex: 1;
    overflow: scroll;
    .commidityInfo {
      height: 89px;
      width: 100%;
      padding: 12px 14px 15px;
      display: flex;
      margin-bottom: 15px;
      // justify-content: center;
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
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(137, 137, 137, 1);
          line-height: 18px;
        }
        .drugPrice {
          margin-top: 11px;
          height: 25px;
          font-size: 18px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(250, 73, 73, 1);
          line-height: 25px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
  .noHistory {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    background: #fff;
    img {
      width: 132px;
      height: 101px;
      margin-top: 37px;
    }
    .noInfo {
      width: 143px;
      height: 18px;
      font-size: 13px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: rgba(190, 190, 190, 1);
      line-height: 18px;
    }
  }
}
</style>