<template>
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
              :checked="item.checked"
              color="#FFCC33"
            />
            <view class="productImg">
              <img src="/static/img/home.png" alt="" width="60" height="60" />
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
</template>
<script>
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
import ypNumberBox from "@/components/yp-number-box/yp-number-box.vue"
export default {
  components: {
    uniSwipeAction,
    uniSwipeActionItem,
    ypNumberBox
  },
  created () {
    uni.getSystemInfo({
      success: function (res) {
        this.windowWidth = res.windowWidth
        this.windowHeight = res.windowHeight
        console.log('this.windowWidth_', this.windowWidth, this.windowHeight);

      }
    })
  },
  data () {
    return {
      items: [{
        value: 'USA',
        name: '美国'
      },
      {
        value: 'CHN',
        name: '中国',
        checked: 'true'
      }
      ],
      options: [
        {
          text: '移入收藏',
          style: {
            backgroundColor: '#F4AF02',
            width: '50px',
            textWidth: "30px",
            fontSize: '15px'
          }
        }, {
          text: '删除',
          style: {
            backgroundColor: '#E60B35',
            width: '50px',
            textWidth: "30px",
            fontSize: '15px'
          }
        }
      ]
    }
  },
  methods: {
    checkboxChange: function (e) {
      var items = this.items,
        values = e.detail.value;
      for (var i = 0, lenI = items.length; i < lenI; ++i) {
        const item = items[i]
        if (values.includes(item.value)) {
          this.$set(item, 'checked', true)
        } else {
          this.$set(item, 'checked', false)
        }
      }
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
<style lang="scss" scoped>
// 改变组件样式
/deep/ .uni-checkbox-input {
  border-radius: 11px;
}
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
.cont {
  height: 100px;
  width: 100%;
}
</style>