<template>
  <uni-page-head uni-page-head-type="default" style="position:relative;">
    <view class="uni-page-head" :style="styleInfo">
      <view class="uni-page-head-ft">
        <!-- <img src="static/main/home_scan.svg" alt class="reback" @cviewck="goBack" /> -->
        <view
          class="uni-page-head-btn"
          style="background-color: transparent; width: 29px;text-aviewgn: left;"
        >
          <img
            v-show="backInfo === '' ? false : true"
            :src="
              backInfo === 'white'
                ? '/static/main/fanhui.svg'
                : '/static/icon/commodityDetails/reback.svg'
            "
            class="reback"
            @click="goBack"
          />
          <slot name="leftIcon" class="reback"></slot>
        </view>
      </view>
      <view class="uni-page-head-bd">
        <view class="uni-page-head__title" style="font-size: 16px; opacity: 1;">
          <!---->
          <!-- 全部药品 -->
          <slot name="title"></slot>
        </view>
      </view>
      <!---->
      <view class="uni-page-head-ft">
        <view
          class="uni-page-head-btn"
          style="background-color: transparent; width: 29px; text-aviewgn: right;"
        >
          <slot name="rightIcon" class="reback"></slot>
          <img
            v-show="jumpButton === '' ? false : true"
            :src="jumpButton === 'white' ? '/static/icon/main/dian.svg' : ''"
            class="reback"
            @click="showPage"
          />
        </view>
      </view>
    </view>
    <view class="jumpPage" v-show="jumpPageShow">
      <view class="angle"></view>
      <view
        class="pageItem"
        v-for="(item, index) in page"
        :key="index"
        @click="goPage(item.url)"
      >
        <img :src="item.img" alt="" />
        <view>
          {{ item.name }}
        </view>
      </view>
    </view>
    <view class="uni-placeholder"></view>
  </uni-page-head>
</template>
<script>
export default {
  // created(){

  // },
  props: ['backInfo', 'styleInfo', 'jumpButton'],
  data () {
    return {
      // goBack: true
      page: [{
        url: '../main/main',
        name: '首页',
        img: '/static/icon/main/D_home.svg'
      }, {
        url: '../shoppingCart/index',
        name: '购物车',
        img: '/static/icon/main/D_Shopping Cart.svg'
      },
      {
        url: '../search/search',
        name: '搜索',
        img: '/static/icon/main/D_search.svg'
      },
      {
        url: '',
        name: '消息',
        img: '/static/icon/main/D_news.svg'
      },
      {
        url: '../mine/index',
        name: '我的',
        img: '/static/icon/main/D_my.svg'
      }],
      jumpPageShow: false
    }
  },
  methods: {
    goBack () {
      console.log('goback');
      uni.navigateBack({
        delta: 1
      });
    },
    goPage (url) {
      console.log(url);
      this.$navTo(url);
    },
    showPage () {
      this.jumpPageShow = !this.jumpPageShow
    }
  }
}
</script>
<style lang="scss">
.reback {
  width: 22px;
  height: 22px;
}
.jumpPage {
  z-index: 9999;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 5px;
  top: 38px;
  width: 130px;
  height: 214px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  .angle {
    width: 0;
    height: 0;
    position: absolute;
    top: -18px;
    right: 20px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent #fff transparent transparent;
    background: rgba(255, 255, 255, 0);
    transform: rotate(90deg); /*顺时针旋转90°*/
  }
  .pageItem {
    background: #fff;
    // padding-left: 50px;
    height: 42px;
    border-bottom: 1px solid #f2f2f2;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 13px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(27, 27, 27, 1);
    img {
      height: 18px;
      width: 18px;
      margin-left: 20px;
      margin-right: 9px;
    }
  }
}
uni-page-head .uni-page-head-bd {
  left: 60px;
  right: 60px;
}
</style>