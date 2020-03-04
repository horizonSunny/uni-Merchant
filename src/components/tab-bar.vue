<template>
  <view>
    <uni-tabbar style="z-index:999;">
      <view
        class="uni-tabbar"
        style="background-color: rgb(255, 255, 255);bottom: -2px;"
      >
        <view
          class="uni-tabbar-border"
          style="background-color: rgba(0, 0, 0, 0.33);"
        ></view>
        <view class="uni-tabbar__item" @click="selectActive(0)">
          <view class="uni-tabbar__bd">
            <view class="uni-tabbar__icon">
              <img
                src="/static/tabBar/home_sel_home.svg"
                v-show="currentSelected === 0"
              />
              <img
                src="/static/tabBar/home_nl_home.svg"
                v-show="currentSelected !== 0"
              />
              <!-- <img src="/static/img/user.png" /> -->
            </view>
            <view
              class="uni-tabbar__label"
              :class="currentSelected === 0 ? 'active' : 'unactive'"
            >
              首页
            </view>
          </view>
        </view>
        <view class="uni-tabbar__item" @click="selectActive(1)">
          <view class="uni-tabbar__bd">
            <view class="uni-tabbar__icon">
              <img
                src="/static/tabBar/home_sel_drug.svg"
                v-show="currentSelected === 1"
              />
              <img
                src="/static/tabBar/home_nl_drug.svg"
                v-show="currentSelected !== 1"
              />
            </view>
            <view
              class="uni-tabbar__label"
              :class="currentSelected === 1 ? 'active' : 'unactive'"
            >
              找药
              <!---->
            </view>
          </view>
        </view>
        <view class="uni-tabbar__item" @click="selectActive(2)">
          <view class="uni-tabbar__bd">
            <view class="uni-tabbar__icon">
              <img
                src="/static/tabBar/home_sel_shopping cart.svg"
                v-show="currentSelected === 2"
              />
              <img
                src="/static/tabBar/home_nl_shopping cart.svg"
                v-show="currentSelected !== 2"
              />
            </view>
            <view
              class="uni-tabbar__label"
              :class="currentSelected === 2 ? 'active' : 'unactive'"
            >
              购物车
              <!---->
            </view>
          </view>
        </view>
        <view class="uni-tabbar__item" @click="selectActive(3)">
          <view class="uni-tabbar__bd">
            <view class="uni-tabbar__icon">
              <img
                src="/static/tabBar/home_sel_my.svg"
                v-show="currentSelected === 3"
              />
              <img
                src="/static/tabBar/home_nl_my.svg"
                v-show="currentSelected !== 3"
              />
            </view>
            <view
              class="uni-tabbar__label"
              :class="currentSelected === 3 ? 'active' : 'unactive'"
            >
              我的
              <!---->
            </view>
          </view>
        </view>
      </view>
      <view class="uni-placeholder"></view>
    </uni-tabbar>
  </view>
</template>
<script>
export default {
  data () {
    return {
      currentSelected: 3
    }
  },
  methods: {
    selectActive (index) {
      this.currentSelected = index;
      console.log(window);
      switch (index) {
        case 0:
          uni.reLaunch({
            url: "../main/main"
          });
          break;
        case 1:
          uni.reLaunch({
            url: "../classify/classify"
          });
          break;
        case 2:
          uni.reLaunch({ url: '../classify/classify' })
          break;
        case 3:
          uni.reLaunch({ url: '../classify/classify' })
          break;
        default:
          break;
      }
    }
  }
}
</script>
<style lang="scss">
.active {
  color: #1791ff;
  font-size: 10px;
}
.unactive {
  color: #1b1b1b;
  font-size: 10px;
}
</style>