<template>
  <view class="content smsContent">
    <view class="input-row">
      <text class="title-info">请输入验证码</text>
    </view>
    <view class="sms-info">
      <view>
        <text class="sms-between">已发送至</text>
        <text class="sms-between" style="color:#141414">
          &nbsp;&nbsp; 139 9809 8058</text
        >
      </view>
      <view>
        <text class="sms-between " v-show="show" style="color:#389CFF">
          &nbsp;&nbsp; {{ count }}秒后重新获取</text
        >
        <button type="default" size="mini" v-show="!show" @click="getSms">
          获取验证码
        </button>
      </view>
    </view>
    <one-input ref="one" type="bottom" @finish="finishedOne"></one-input>
  </view>
</template>

<script>
import oneInput from "@/components/myp-one/components/myp-one/myp-one.vue";
export default {
  components: {
    oneInput
  },
  data() {
    return {
      show: true,
      count: 60,
      timer: null
    };
  },
  methods: {
    finishedOne(val) {
      // 这边获取验证码
      console.log(val);
    },
    // 计时器
    getCode() {
      console.log("in getCode");
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = true;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = false;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    // 重新获取验证码
    getSms() {
      this.getCode();
    }
  },
  created() {
    let _this = this;
    setTimeout(() => {
      _this.getCode();
    }, 1000);
  }
};
</script>
<style lang="scss">
.smsContent {
  padding: 0px 38px;
  .title-info {
    width: 120px;
    height: 28px;
    font-size: 20px;
    font-family: PingFang-SC-Heavy, PingFang-SC;
    font-weight: 500;
    color: rgba(20, 20, 20, 1);
    line-height: 28px;
    margin-top: 83px;
  }
  .sms-info {
    display: flex;
    justify-content: space-around;
    margin-top: 7px;
    width: 100%;
    height: 29px;
    font-size: 15px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(219, 219, 219, 1);
    line-height: 29px;
    margin-bottom: 32px;
    .sms-between {
      margin-right: 5px;
    }
  }
}
</style>
