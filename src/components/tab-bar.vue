<template>
  <uni-tabbar>
    <view class="uni-tabbar" style="background-color: rgb(255, 255, 255);">
      <view
        class="uni-tabbar-border"
        style="background-color: rgba(0, 0, 0, 0.33);"
      ></view>
      <view class="uni-tabbar__item" @click="test">
        <view class="uni-tabbar__bd">
          <view class="uni-tabbar__icon">
            <img src="/static/img/homeHL.png" /><!---->
          </view>
          <view
            class="uni-tabbar__label"
            style="color: rgb(15, 174, 255); font-size: 10px;"
          >
            首页
          </view>
        </view>
      </view>
      <view class="uni-tabbar__item">
        <view class="uni-tabbar__bd">
          <view class="uni-tabbar__icon">
            <img src="/static/img/user.png" /><!---->
          </view>
          <view
            class="uni-tabbar__label"
            style="color: rgb(122, 126, 131); font-size: 10px;"
          >
            找药
            <!---->
          </view>
        </view>
      </view>
    </view>
    <view class="uni-placeholder"></view>
  </uni-tabbar>
</template>
<script>
export default {
  methods: {
    test () {
      console.log(window);

    }
  }
}
</script>
<style lang="scss">
</style>