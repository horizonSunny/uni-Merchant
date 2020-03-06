<template>
  <view>
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
    <view class="settleAccounts">
      <checkbox-group @change="allChoose">
        <label>
          <checkbox
            value="all"
            :class="{ checked: allChecked }"
            :checked="allChecked ? true : false"
          ></checkbox>
          全选
        </label>
      </checkbox-group>
      <!-- this.editorStatus 为编辑显示 -->
      <view class="price" v-show="this.editorStatus">
        <view class="priceInfo">¥ 232.00</view>
        <view class="reminder">不包含运费</view>
      </view>
      <button
        type="primary"
        plain="true"
        class="button"
        v-show="this.editorStatus"
      >
        结算(99)
      </button>
      <!-- this.editorStatus为完成时候 -->
      <view v-show="!this.editorStatus" class="allOperate">
        <button>移入收藏夹</button>
        <button>删除</button>
      </view>
    </view>
  </view>
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
  props: ["editorStatus"],
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
      ],
      checkedArr: [], //复选框选中的值
      allChecked: false //是否全选
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
      // var items = this.items,
      //   values = e.detail.value;
      // for (var i = 0, lenI = items.length; i < lenI; ++i) {
      //   const item = items[i]
      //   if (values.includes(item.value)) {
      //     this.$set(item, 'checked', true)
      //   } else {
      //     this.$set(item, 'checked', false)
      //   }
      // }
    },
    // 全选事件
    allChoose (e) {
      console.log('this.props.editorStatus_', this.editorStatus);

      let chooseItem = e.detail.value;
      // 全选
      if (chooseItem[0] == 'all') {
        this.allChecked = true;
        for (let item of this.items) {
          let itemVal = String(item.value);
          if (!this.checkedArr.includes(itemVal)) {
            this.checkedArr.push(itemVal);
          }
        }
      } else {
        // 取消全选
        console.log('取消全选');

        this.allChecked = false;
        this.checkedArr = [];
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
.settleAccounts {
  position: fixed;
  background: #fff;
  display: flex;
  padding-left: 15px;
  align-items: center;
  bottom: 48px;
  width: 100%;
  height: 50px;
  .price {
    margin-left: 9px;
    .priceInfo {
      width: 69px;
      height: 22px;
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(250, 73, 73, 1);
      line-height: 22px;
    }
    .reminder {
      width: 84px;
      height: 17px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(137, 137, 137, 1);
      line-height: 17px;
    }
  }
  .button {
    background: #3a74f1;
    float: right;
    width: 120px;
    height: 50px;
    border-radius: 0px;
    margin-right: 15px;
    color: #fff;
  }
  .allOperate {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    button {
      height: 28px;
      line-height: 28px;
      font-size: 13px;
      border-radius: 4px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      margin: 0px;
      margin-right: 20px;
    }
    button:nth-child(1) {
      border: 1px solid rgba(255, 180, 0, 1);
      color: rgba(246, 174, 0, 1);
    }
    button:nth-child(2) {
      border: 1px solid rgba(229, 11, 53, 1);
      color: #e50b35;
    }
  }
}
.cont {
  height: 100px;
  width: 100%;
}
</style>