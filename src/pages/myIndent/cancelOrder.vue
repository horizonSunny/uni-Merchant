<template>
  <modal v-if="modal">
    <view class="distribution">
      <view class="title">
        <view class="titleInfo">取消订单</view>
        <view class="close" @click="closeModal">X</view>
      </view>
      <view class="content">
        选择取消订单原因
        <view class="contentSelect uni-list">
          <radio-group @change="radioChange">
            <label
              class="uni-list-cell uni-list-cell-pd"
              v-for="(item, index) in cancelReason"
              :key="index"
            >
              <view class="selectInfo" :class="index == current ? 'active' : ''">
                <view>{{item}}</view>
                <view>
                  <radio :value="item" :checked="index == current" />
                </view>
              </view>
            </label>
          </radio-group>
        </view>
      </view>
      <view class="operate">
        <button type="default" @click="noCancel">暂不取消</button>
        <button type="primary" @click="confirm">确定取消</button>
      </view>
    </view>
  </modal>
</template>
<script>
import modal from "@/components/modal.vue";
import { cancelOrder } from "@/service/index";
export default {
  props: ["currentOpeateOrder", "goBack"],
  components: {
    modal
  },
  data() {
    return {
      current: 0,
      modal: false,
      cancelReason: [
        "我不想买了",
        "信息填写错误，重新拍",
        "卖家缺货",
        "其他原因"
      ],
      reason: "我不想买了"
    };
  },
  methods: {
    radioChange: function(evt) {
      this.reason = evt.detail.value;
      console.log(evt.detail.value);
      console.log(this.currentOpeateOrder);
    },
    closeModal() {
      this.modal = false;
    },
    openModal() {
      this.modal = true;
    },
    noCancel() {
      this.closeModal();
    },
    confirm() {
      console.log(this.reason, this.currentOpeateOrder.orderNo);

      cancelOrder({
        cancelReason: this.reason,
        orderNo: this.currentOpeateOrder.orderNo
      }).then(res => {
        console.log("res_", res);
        this.closeModal();
        if (this.goBack) {
          uni.navigateBack();
        }
      });
    }
  }
  // created() {
  //   console.log("this.hasSelected_", this.hasSelected);
  // }
};
</script>
<style lang="scss" scoped>
.distribution {
  width: 100%;
  height: 400px;
  position: fixed;
  bottom: 0px;
  background: rgba(255, 255, 255, 1);
  .title {
    height: 40px;
    width: 100%;
    // padding: 0px 15px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(27, 27, 27, 1);
    line-height: 40px;
    text-align: center;
    position: relative;
    .titleInfo {
      display: inline-block;
    }
    .close {
      font-size: 18px;
      font-weight: 30;
      position: absolute;
      top: 0px;
      right: 0px;
      width: 50px;
      padding-right: 15px;
      text-align: right;
    }
  }
  .content {
    padding: 0px 15px;
    font-size: 14px;
    overflow: scroll;
    .contentSelect {
      height: auto;
      .selectInfo {
        display: flex;
        border-radius: 4px;
        justify-content: space-between;
        border-radius: 4px;
        padding: 10px 14px;
        margin: 20px;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(58, 116, 241, 1);
        /deep/ uni-radio {
          margin-left: 13px;
          position: relative;
          top: -2px;
        }
      }
      .active {
        // background: rgba(235, 241, 255, 1);
      }
    }
  }
  .operate {
    display: flex;
    justify-content: space-around;
    button {
      width: 40%;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      border-radius: 20px;
    }
  }
}
</style>