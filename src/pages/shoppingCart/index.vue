<template>
  <body-wrap>
    <tob-bar slot="topBar" :styleInfo="{ backgroundColor: '#fff' }" jumpButton>
      <text slot="title" style="color:#000">购物车</text>
    </tob-bar>
    <view slot="content" class="content">
      <!-- 假如购物车有东西 -->
      <view v-show="true" class="classify">
        <view class="classifyTitle">
          <text class="title">
            <img src="static/shoppingCart/shopping cart-business.svg" alt />
            商家名称
          </text>
          <view class="medicineOperate">
            <img src="static/shoppingCart/shopping cart-coupon.svg" alt />
            <text @click="reverseEditor">{{ editor ? "编辑" : "完成" }}</text>
          </view>
        </view>
        <view class="classifyDetails">
          <commidityItem :editorStatus="editor" :selectedArr="selectArr"></commidityItem>
        </view>
      </view>
      <!-- 假如购物车没东西 -->
      <view v-show="false" class="noGoods">
        <view class="imgInfo">
          <img src="/static/shoppingCart/shopping cart-bitmap_sc.svg" alt />
        </view>
        <view class="reminInfo">购物车里空空如也～</view>
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
  data() {
    return {
      editor: true,
      selectArr: []
    };
  },
  onLoad(option) {
    if (option.productIds) {
      const selectArr = option.productIds.split(",");
      console.log("selectArr_", selectArr);
      this.selectArr = selectArr;
    }
  },
  onShow() {
    // console.log("ONSHOW");
    this.getShopCartInfo();
  },
  computed: {
    ...mapGetters(["getShopCartList"])
  },
  methods: {
    ...mapActions({
      getShopCartInfo: "GetShopCartInfo"
    }),
    // 改变当前是编辑状态还是完成状态
    reverseEditor() {
      this.editor = !this.editor;
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  width: 100%;
  flex-direction: row;
  flex: 1;
  background: #f4f1f4;
  overflow: hidden;
  .classify {
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
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
        text {
          margin-left: 15px;
        }
        .operate {
          font-size: 12px;
          font-weight: 500;
          color: rgba(137, 137, 137, 1);
          margin-right: 5px;
        }
      }
    }
    .classifyDetails {
      background: #efecf0;
      display: flex;
      flex: 1;
      flex-direction: column;
      position: relative;
      overflow: hidden;
    }
  }
}
.noGoods {
  width: 100%;
  height: 100%;
  display: flex;
  background: #fff;
  flex-direction: column;
  align-items: center;
  padding: 36px 0px;
  .imgInfo {
    height: 100px;
    width: 132px;
    img {
      height: 100px;
      width: 132px;
    }
  }
  .reminInfo {
    width: 117px;
    height: 18px;
    font-size: 13px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(190, 190, 190, 1);
    line-height: 18px;
  }
}
</style>
