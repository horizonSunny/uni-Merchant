<template>
  <body-wrap>
    <tob-bar slot="topBar" :styleInfo="{ backgroundColor: '#fff' }" jumpButton>
      <text slot="title" style="color:#000">处方信息</text>
    </tob-bar>
    <view slot="content" class="content">
      <view class="contentInfo">
        <view class="title">
          <text>请选择用药人</text>
          <text></text>
        </view>
        <view class="contentWrap">
          <scroll-view scroll-x="true" class="scrollView">
            <view class="patient active">
              <view class="editor">
                <view>{{ prescribingInformation.fullName }}</view>
                <img src="static/myIndent/shopping cart-editdu-sel.svg" alt />
              </view>
              <view>{{
                prescribingInformation.sex === 1 ? "先生" : "女士"
              }}</view>
              <view>{{ prescribingInformation.phone }}</view>
            </view>
          </scroll-view>
        </view>
        <view class="reminder">
          <text>根据国家药监局规定，购买处方药需要实名认证</text>
        </view>
      </view>
      <view class="contentInfo">
        <view class="title">
          <text>上传处方信息</text>
        </view>
        <view class="contentWrap">
          <img
            v-for="(item, index) in prescribingImg"
            :key="index"
            :src="item"
            alt
            class="prescribImg"
          />
        </view>
        <view class="reminder">
          <text>药店药师审核，请上传正规处方（仅可上传3张）</text>
        </view>
      </view>
    </view>
  </body-wrap>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  onLoad (option) {
    console.log("option_", option);
    this.prescribingInformation = option;
    this.prescribingImg = this.prescribingInformation.prescribImg.split(",");
    console.log("prescribingImg_", this.prescribingImg);
  },
  data () {
    return {
      prescribingInformation: "",
      prescribingImg: []
    };
  },
  onShow () { }
};
</script>
<style lang="scss">
.content {
  position: relative;
  .contentInfo {
    border-top: 1px solid #d4d4d4;
    height: 155px;
    // width: 100%;
    padding: 13px 15px;
    .title {
      display: flex;
      justify-content: space-between;
      height: 21px;
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(39, 39, 39, 1);
      line-height: 21px;
      text:nth-child(2) {
        color: rgba(27, 27, 27, 1);
        // color: red
      }
    }
    .contentWrap {
      height: 116px;
      .scrollView {
        white-space: nowrap;
        width: 100%;
        height: 100%;
        .patient {
          margin-top: 20px;
          margin-right: 12px;
          display: inline-block;
          width: 116px;
          height: 78px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.08);
          border-radius: 4px;
          padding: 7px 10px;
          view {
            height: 27px;
            line-height: 27px;
          }
          .editor {
            display: flex;
            justify-content: space-between;
          }
        }
        .active {
          color: rgba(250, 73, 73, 1);
          background: rgba(255, 233, 236, 1);
        }
      }
      .prescribImg {
        width: 81px;
        height: 81px;
        margin-top: 18px;
        margin-right: 18px;
      }
    }
    .reminder {
      height: 17px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(137, 137, 137, 1);
      line-height: 17px;
    }
  }
  .confirm {
    button {
      width: 80%;
      left: 50%;
      margin-left: -40%;
      position: absolute;
      bottom: 20px;
    }
  }
  .contentInfo:nth-child(2) {
    border-bottom: 1px solid #d4d4d4;
  }
}
</style>