<template>
  <modal v-if="modal">
    <view class="distribution">
      <view class="title">
        <view class="titleInfo">填写发票信息</view>
        <view class="close" @click="closeModal">X</view>
      </view>
      <view class="content">
        发票类型
        <view class="contentSelect">
          <view
            class="invoiceInfo"
            v-for="(item, index) in ['无需发票', '电子发票']"
            :key="index"
            :class="currentIndex === index ? 'active' : ''"
            @click="chooseInvoice(index)"
          >{{ item }}</view>
        </view>
      </view>
      <view class="content" v-if="currentIndex === 1 ">
        发票抬头
        <view class="contentSelect">
          <view class="invoiceInfo active">个人</view>
        </view>
      </view>
      <!-- 收票人信息 -->
      <form class="form">
        <view class="content" v-if="currentIndex === 1 ">
          收票人信息
          <view class="userInfo">
            <view class="infoItem">
              <span>收票人姓名</span>
              <input type="text" v-model="userInfo['fullName']" />
            </view>
            <view class="infoItem">
              <span>身份证信息</span>
              <input type="text" v-model="userInfo['idCard']" maxlength="18" />
            </view>
          </view>
        </view>
        <view class="confirm">
          <button type="primary" @click="submit">完成</button>
        </view>
      </form>
    </view>
  </modal>
</template>
<script>
import modal from "@/components/modal.vue";
import validate from "@/utils/validate";
export default {
  components: {
    modal
  },
  data() {
    return {
      currentIndex: 0,
      modal: false,
      userInfo: {
        fullName: "",
        idCard: ""
      }
    };
  },
  methods: {
    radioChange: function(evt) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].value === evt.target.value) {
          this.current = i;
          break;
        }
      }
    },
    closeModal() {
      this.modal = false;
    },
    openModal() {
      this.modal = true;
    },
    chooseInvoice(index) {
      this.currentIndex = index;
    },
    submit() {
      console.log("this.userInfo_", this.userInfo);
      let formRules = [
        { name: "fullName", type: "required", errmsg: "请填写用户名" },
        {
          name: "idCard",
          required: true,
          type: "identityCard",
          errmsg: "请填写用户正确身份证号码"
        }
      ];
      let valLoginRes = validate.validate(this.userInfo, formRules);
      if (!valLoginRes.isOk && this.currentIndex === 1) {
        uni.showToast({
          icon: "none",
          title: valLoginRes.errmsg
        });
        return false;
      }
      this.$store.commit("ADD_INDENT", {
        invoice: {
          invoice: this.currentIndex, // 0 代表无需发票
          invoiceUserInfo: this.userInfo
        }
      });
      this.closeModal();
    }
  }
};
</script>
<style lang="scss" scoped>
.distribution {
  width: 100%;
  height: 435px;
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
    padding: 12px 15px;
    font-size: 14px;
    overflow: scroll;
    .contentSelect {
      height: 54px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #efefef;
      .invoiceInfo {
        width: 72px;
        height: 26px;
        line-height: 26px;
        color: rgba(137, 137, 137, 1);
        text-align: center;
        background: rgba(248, 248, 248, 1);
        border-radius: 4px;
        border: 1px solid rgba(209, 209, 209, 1);
        margin-left: 18px;
      }
      .active {
        width: 72px;
        height: 26px;
        color: rgba(58, 116, 241, 1);
        background: rgba(235, 241, 255, 1);
        border-radius: 4px;
        border: 1px solid rgba(58, 116, 241, 1);
      }
    }
    .userInfo {
      width: 100%;
      .infoItem {
        height: 50px;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: rgba(27, 27, 27, 1);
        /deep/ uni-input {
          flex: 1;
          border-bottom: 1px solid #efefef;
          margin-left: 10px;
          position: relative;
          top: 15px;
        }
      }
    }
  }
  .confirm {
    position: absolute;
    bottom: 20px;
    width: 80%;
    left: 50%;
    margin-left: -40%;
  }
}
</style>