<template>
  <view style="width:100%;height:47px;">
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
  created () {
    const currentPages = getCurrentPages()
    const currentPage = currentPages[currentPages.length - 1]['route']
    console.log('currentPage_', currentPage)
    switch (currentPage) {
      case 'pages/main/main':
        this.currentSelected = 0
        break
      case 'pages/classify/classify':
        this.currentSelected = 1
        break
      case 'pages/shoppingCart/index':
        this.currentSelected = 2
        break
      case 'pages/mine/index':
        this.currentSelected = 3
        break
      default:
        break
    }
  },
  data () {
    return {
      currentSelected: this.$store.state.currentTabBar
    }
  },
  methods: {
    // 因为重新渲染这个函数，所以药将this.currentSelected值保存到全局变量
    selectActive (index) {
      this.$store.commit('SET_CURRENT_BAR', index)
      console.log(this.currentSelected)
      switch (index) {
        case 0:
          uni.navigateTo({
            url: '../main/main'
          })
          break
        case 1:
          uni.navigateTo({
            url: '../classify/classify'
          })
          break
        case 2:
          uni.navigateTo({ url: '../shoppingCart/index' })
          break
        case 3:
          uni.navigateTo({ url: '../mine/index' })
          break
        default:
          break
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
