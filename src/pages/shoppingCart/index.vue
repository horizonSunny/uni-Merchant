<template>
  <body-wrap>
    <tob-bar slot="topBar">
      <text slot="title">所打动</text>
    </tob-bar>
    <view slot="content" class="content">
      <view class="classify">
        <view class="classifyTitle">
          <text class="title">
            <img src="static/shoppingCart/shopping cart-business.svg" alt="" />
            商家名称
          </text>
          <view class="medicineOperate" @click="goClassify">
            <img src="static/shoppingCart/shopping cart-coupon.svg" alt="" />
          </view>
        </view>
        <view class="classifyDetails">
          <view class="uni-list">
            <commidityItem></commidityItem>
          </view>
        </view>
      </view>
    </view>
    <tab-bar slot="tabBar"></tab-bar>
  </body-wrap>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import commidityItem from "./commidityItem";
export default {
  components: {
    commidityItem
  },
  data () {
    return {

    }
  },
  onLoad () {

  },
  computed: {
    ...mapGetters(["classify"])
  },
  methods: {
    ...mapActions({
      getClassify: "GetClassify"
    })
  }
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  padding-top: 10px;
  width: 100%;
  flex-direction: row;
  flex: 1;
  background: #f4f1f4;
  overflow: hidden;
  .classify {
    width: 100%;
    background: #f4f1f4;
    .classifyTitle {
      padding: 0px 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 48px;
      line-height: 48px;
      background: #fff;
      .title {
        height: 21px;
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(27, 27, 27, 1);
        line-height: 21px;
        img {
          position: relative;
          top: 2px;
          margin-right: 5px;
        }
      }
      .medicineOperate {
        display: flex;
        align-items: center;
        .operate {
          font-size: 12px;
          font-weight: 500;
          color: rgba(137, 137, 137, 1);
          margin-right: 5px;
        }
      }
    }
    .classifyDetails {
      background: #fff;
      padding: 0 0 50px 0;
    }
  }
}
</style>
