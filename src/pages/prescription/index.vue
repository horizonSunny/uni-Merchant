<template>
  <body-wrap>
    <tob-bar slot="topBar">
      <text slot="title">处方信息</text>
    </tob-bar>
    <view slot="content" class="content">
      <view class="contentInfo">
        <view class="title">
          <text>
            请选择用药
          </text>
          <text>
            添加
          </text>
        </view>
        <view class="contentWrap"></view>
        <view class="reminder">
          <text>
            根据国家药监局规定，购买处方药需要实名认证
          </text>
        </view>
      </view>
      <view class="contentInfo">
        <view class="title">
          <text>
            上传处方信息
          </text>
        </view>
        <view class="contentWrap"></view>
        <view class="reminder">
          <text>
            药店药师审核，请上传正规处方（仅可上传3张）
          </text>
        </view>
      </view>
    </view>
  </body-wrap>
</template>
<script>
export default {

}
</script>
<style lang="scss">
.content {
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
  .contentInfo:nth-child(2) {
    border-bottom: 1px solid #d4d4d4;
  }
}
</style>