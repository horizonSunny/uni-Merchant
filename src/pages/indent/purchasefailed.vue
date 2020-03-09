<template>
  <modal>
    <view class="purchasefailed">
      <view class="title">
        购买失败
      </view>
      <view class="content">
        <view class="effectiveGoods">
          <view
            class="commidityInfo"
            v-for="(item, index) in [1, 2, 3, 4]"
            :key="index"
          >
            <view class="failure">失效</view>
            <view class="productImg">
              <img src="/static/img/home.png" alt="" width="60" height="60" />
              <view class="model">已下架</view>
            </view>
            <view class="drugsInfo">
              <view class="failureInfo">
                <text class="mark">OTC</text>
                <!-- <text class="mark" v-show="item.isMp === 0">OTC</text>
                <text class="mark" v-show="item.isMp === 1">双规</text>
                <text class="mark" v-show="item.isMp === 2">RX</text>
                <text class="mark" v-show="item.isMp === 3">其他</text> -->
                <text>爱康国宾 疾病 宾 疾病疾病 宾 疾病疾病 宾 疾病</text>
              </view>

              <view class="drugSpec">
                <view>
                  已选择：20mlX48支/盒
                </view>
                <view>
                  X1
                </view>
              </view>
              <view class="drugSpec">
                无法送货到当前收获地址
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="footer">
        <button type="primary">我知道了</button>
      </view>
    </view>
  </modal>
</template>
<script>
import modal from '@/components/modal.vue';
export default {
  components: {
    // commidityItem
    modal
  },
}
</script>
<style lang="scss" scoped>
.purchasefailed {
  height: 380px;
  width: 94%;
  position: absolute;
  left: 50%;
  margin-left: -47%;
  top: 50%;
  margin-top: -190px;
  background: #fff;
  opacity: 1;
  z-index: 999;
  border-radius: 10px;
  .title {
    height: 46px;
    line-height: 46px;
    text-align: center;
    border-bottom: 1px solid #f2f2f2;
  }
  .content {
    height: 264px;
    line-height: 88px;
    overflow: scroll;
    .effectiveGoods {
      padding: 13px 16px;
      background: rgba(255, 255, 255, 1);
      .commidityInfo {
        height: 89px;
        width: 100%;
        padding: 10px 0px;
        display: flex;
        // justify-content: center;
        align-items: center;
        .productImg {
          width: 60px;
          height: 60px;
          position: relative;
          .model {
            text-align: center;
            width: 60px;
            height: 60px;
            line-height: 60px;
            position: absolute;
            z-index: 99;
            opacity: 0.5;
            top: 0px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            background: #000;
          }
        }
        .drugsInfo {
          flex: 1;
          height: 75px;
          margin-top: 10px;
          margin-left: 11px;
          // display: flex;
          // flex-direction: column;
          // justify-content: space-between;
          .drugName {
            width: 100%;
            display: flex;
            justify-content: space-between;
            height: 36px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(27, 27, 27, 1);
            line-height: 18px;
            .mark {
              position: relative;
              display: inline-block;
              height: 12px;
              line-height: 12px;
              top: -1px;
              width: 30px;
              height: 12px;
              margin-right: 10px;
              line-height: 12px;
              border: 1px solid #d7242c;
              border-radius: 5px;
              text-align: center;
              font-size: 5px;
              color: #d7242c;
              font-weight: 800;
            }
          }
          .failureInfo {
            width: 200px;
            height: 18px;
            font-size: 13px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(137, 137, 137, 1);
            line-height: 18px;
            text-overflow: ellipsis; /*让截断的文字显示为点点。还有一个值是clip意截断不显示点点*/
            white-space: nowrap; /*让文字不换行*/
            overflow: hidden;
          }
          .drugSpec {
            margin-top: 10px;
            height: 18px;
            font-size: 13px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(137, 137, 137, 1);
            line-height: 18px;
            display: flex;
            justify-content: space-between;
          }
          .drugPrice {
            height: 25px;
            width: 60px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(250, 73, 73, 1);
            margin-left: 23px;
          }
          .failureInfo {
          }
        }
        .failure {
          width: 40px;
          height: 18px;
          line-height: 18px;
          border-radius: 9px;
          background: #a3a3a3;
          font-size: 10px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          text-align: center;
          margin-right: 2px;
        }
      }
    }
  }
  .footer {
    height: 54px;
    /deep/ uni-button {
      margin-top: 15px;
      width: 30%;
    }
  }
}
</style>