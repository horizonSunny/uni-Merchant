<template>
  <body-wrap>
    <tob-bar slot="topBar">
      <text slot="title">所打动</text>
    </tob-bar>
    <view slot="content" class="content loginContent">
      <view>
        <view class="input-row">
          <text class="title-info">请输入手机号</text>
        </view>
        <view class="input-row">
          <m-input
            class="uni-input phone-input"
            placeholder="请输入手机号码"
            maxlength="11"
            clearable
            v-model="account"
          />
        </view>
      </view>
      <view class="btn-row">
        <button type="primary" @tap="bindLogin">下一步</button>
      </view>
      <view class="action-row protocol-style">
        <view @click="protocolSelect">
          <img
            v-show="protocolSelected"
            src="static/icon/login/Checklist.svg"
            alt=""
          />
          <img
            v-show="!protocolSelected"
            src="static/icon/login/Unchecked.svg"
            alt=""
          />
        </view>
        <text class="protocol-info"
          >登录/注册并视为同意<a href="">《xxxxxx用户服务协议》</a></text
        >
      </view>
      <view
        class="oauth-row"
        v-if="hasProvider"
        v-bind:style="{ top: positionTop + 'px' }"
      >
        <view
          class="oauth-image"
          v-for="provider in providerList"
          :key="provider.value"
        >
          <image :src="provider.image" @tap="oauth(provider.value)"></image>
          <!-- #ifdef MP-WEIXIN -->
          <button
            v-if="!isDevtools"
            open-type="getUserInfo"
            @getuserinfo="getUserInfo"
          ></button>
          <!-- #endif -->
        </view>
      </view>
    </view>
  </body-wrap>
</template>

<script>
import {
  getSms
} from '@/service/index'
import service from "../../service.js";
import { mapState, mapMutations } from "vuex";
import mInput from "../../components/m-input.vue";
import { checkMobile } from "utils/validator";

export default {
  components: {
    mInput
  },
  onNavigationBarButtonTap (item) {
    // 这边绑定是该页面topBar上面的两个button事件
    console.log("index_", item.index);
    uni.navigateBack();
  },
  data () {
    return {
      providerList: [],
      hasProvider: false,
      account: "",
      password: "",
      positionTop: 0,
      isDevtools: false,
      protocolSelected: false
    };
  },
  computed: mapState(["forcedLogin"]),
  methods: {
    ...mapMutations(["login"]),
    initProvider () {
      const filters = ["weixin", "qq", "sinaweibo"];
      uni.getProvider({
        service: "oauth",
        success: res => {
          if (res.provider && res.provider.length) {
            for (let i = 0; i < res.provider.length; i++) {
              if (~filters.indexOf(res.provider[i])) {
                this.providerList.push({
                  value: res.provider[i],
                  image: "../../static/img/" + res.provider[i] + ".png"
                });
              }
            }
            this.hasProvider = true;
          }
        },
        fail: err => {
          console.error("获取服务供应商失败：" + JSON.stringify(err));
        }
      });
    },
    initPosition () {
      /**
       * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
       * 反向使用 top 进行定位，可以避免此问题。
       */
      this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
    },
    bindLogin () {
      /**
       * 客户端对账号信息进行一些必要的校验。
       * 实际开发中，根据业务需要进行处理，这里仅做示例。
       */
      const validate = checkMobile(this.account);
      if (!validate) {
        uni.showToast({
          icon: "none",
          title: "手机号校验失败，请重新输入"
        });
        return;
      }
      if (!this.protocolSelected) {
        uni.showToast({
          icon: "none",
          title: "请点击同意用户协议"
        });
        return;
      }
      getSms({ phone: this.account }).then(() => {
        console.log('in sms');
        this.$store.commit('SET_PHONE', {
          phone: this.account
        })
        setTimeout(() => {
          uni.navigateTo({
            url: "../smsValidte/smsValidte?phone=" + this.account
          });
        }, 0);
      })

    },
    oauth (value) {
      uni.login({
        provider: value,
        success: res => {
          uni.getUserInfo({
            provider: value,
            success: infoRes => {
              /**
               * 实际开发中，获取用户信息后，需要将信息上报至服务端。
               * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
               */
              this.toMain(infoRes.userInfo.nickName);
            },
            fail () {
              uni.showToast({
                icon: "none",
                title: "登陆失败"
              });
            }
          });
        },
        fail: err => {
          console.error("授权登录失败：" + JSON.stringify(err));
        }
      });
    },
    getUserInfo ({ detail }) {
      if (detail.userInfo) {
        this.toMain(detail.userInfo.nickName);
      } else {
        uni.showToast({
          icon: "none",
          title: "登陆失败"
        });
      }
    },
    toMain (userName) {
      this.login(userName);
      /**
       * 强制登录时使用reLaunch方式跳转过来
       * 返回首页也使用reLaunch方式
       */
      if (this.forcedLogin) {
        uni.reLaunch({
          url: "../main/main"
        });
      } else {
        uni.navigateBack();
      }
    },
    protocolSelect () {
      this.protocolSelected = !this.protocolSelected;
    }
  },
  onReady () {
    this.initPosition();
    this.initProvider();
    // #ifdef MP-WEIXIN
    this.isDevtools = uni.getSystemInfoSync().platform === "devtools";
    // #endif
  }
};
</script>
<style lang="scss">
.loginContent {
  padding: 0px 38px;
  .title-info {
    width: 120px;
    height: 28px;
    font-size: 20px;
    font-family: PingFang-SC-Heavy, PingFang-SC;
    font-weight: 800;
    color: rgba(20, 20, 20, 1);
    line-height: 28px;
    margin-top: 83px;
  }
  .phone-input {
    margin-top: 30px;
    height: 38px;
    width: 100%;
    border-bottom: #dbdbdb 1px solid;
  }
  .protocol-style {
    display: flex;
    justify-content: flex-start;
    padding: 10px 10px;
    width: 100%;
    height: 17px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(173, 173, 173, 1);
    line-height: 17px;
    .protocol-info {
      margin-left: 2px;
    }
  }
}
.action-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.action-row navigator {
  color: #007aff;
  padding: 0 10px;
}

.oauth-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.oauth-image {
  position: relative;
  width: 50px;
  height: 50px;
  border: 1px solid #dddddd;
  border-radius: 50px;
  margin: 0 20px;
  background-color: #ffffff;
}

.oauth-image image {
  width: 30px;
  height: 30px;
  margin: 10px;
}

.oauth-image button {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>
