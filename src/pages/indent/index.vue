<template>
  <body-wrap>
    <tob-bar slot="topBar">
      <text slot="title">订单结算</text>
    </tob-bar>
    <view slot="content" class="content">
      <view class="indent">
        <view class="userInfo">
          <view class="user">
            <img src="static/icon/merchantsIntr/location.svg" alt="" />
            <view class="userName">王慧</view>
            <view class="phone">13890876778</view>
          </view>
          <view class="address">
            长泰广场E座 长泰广场E座 长泰广场E座
          </view>
        </view>
        <view class="prescription">
          <view class="title">
            <img
              src="static/shoppingCart/shopping cart-prescription.svg"
              alt=""
            />
            处方信息
          </view>
          <view class="home_right">
            <img src="static/icon/main/home_right-2.svg" alt="" />
          </view>
        </view>
        <view class="effectiveGoods">
          <view class="title">
            商家名称
          </view>
          <view
            class="commidityInfo"
            v-for="(item, index) in [1, 2]"
            :key="index"
          >
            <view class="productImg">
              <img src="/static/img/home.png" alt="" width="60" height="60" />
              <view class="model">已下架</view>
            </view>
            <view class="drugsInfo">
              <view class="drugName">
                <view>
                  <text class="mark">OTC</text>
                  <!-- <text class="mark" v-show="item.isMp === 0">OTC</text>
                <text class="mark" v-show="item.isMp === 1">双规</text>
                <text class="mark" v-show="item.isMp === 2">RX</text>
                <text class="mark" v-show="item.isMp === 3">其他</text> -->
                  <text>爱康国宾 疾病 宾 疾病疾病 宾 疾病疾病 宾 疾病</text>
                </view>
                <view class="drugPrice">
                  ¥ 123
                </view>
              </view>
              <view class="drugSpec">
                <view>
                  已选择：20mlX48支/盒
                </view>
                <view>
                  X1
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="separate logisticsInfo">
          <view class="logistics">
            <view>
              运费
              <text class="marginLeft"> 8.00元起</text>
            </view>
            <view class="home_right">
              ¥12.00
              <img
                class="marginLeft"
                src="static/icon/main/home_right-2.svg"
                alt=""
              />
            </view>
          </view>
          <view class="logistics">
            优惠券
            <view class="home_right">
              ¥12.00
              <img
                class="marginLeft"
                src="static/icon/main/home_right-2.svg"
                alt=""
              />
            </view>
          </view>
          <view class="logistics">
            共x件商品 应付金额（含运费）
            <view class="home_right">
              ¥464.00
            </view>
          </view>
        </view>
        <view class="separate logisticsInfo">
          <view class="logistics">
            付款方式
            <view class="home_right">
              在线支付
            </view>
          </view>
          <view class="logistics">
            <view>
              发票信息
            </view>
            <view class="home_right">
              请选择
              <img
                class="marginLeft"
                src="static/icon/main/home_right-2.svg"
                alt=""
              />
            </view>
          </view>
        </view>
        <view class="effectiveGoods">
          <view class="title">
            失效商品
          </view>
          <view
            class="commidityInfo"
            v-for="(item, index) in [1, 2]"
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
    </view>
    <!-- <tab-bar slot="tabBar"></tab-bar> -->
  </body-wrap>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
// import commidityItem from "./commidityItem";
export default {
  components: {
    // commidityItem
  },
  data () {
    return {
      editor: true
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
    }),
    // 改变当前是编辑状态还是完成状态
    reverseEditor () {
      this.editor = !this.editor
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
  overflow-x: hidden;
  overflow-y: scroll;
  .indent {
    width: 100%;
    height: 100%;
    background: #f4f1f4;
    .userInfo {
      margin-top: 5px;
      width: 375px;
      height: 44px;
      background: rgba(255, 255, 255, 1);
      padding: 18px 16px;
      .user {
        display: flex;
        justify-content: flex-start;
        height: 21px;
        font-size: 15px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(27, 27, 27, 1);
        line-height: 21px;
        .userName {
          margin: 0px 15px 0px 8px;
        }
      }
      .address {
        margin: 4px 0px 0px 21px;
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(137, 137, 137, 1);
        line-height: 20px;
      }
    }
    .prescription {
      margin-top: 10px;
      padding: 13px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 24px;
      line-height: 24px;
      background: rgba(255, 255, 255, 1);
      .title {
        img {
          position: relative;
          top: 5px;
          margin-right: 11px;
        }
      }
      .home_right {
        img {
          position: relative;
          top: 1px;
        }
      }
    }
    .effectiveGoods {
      margin-top: 10px;
      padding: 13px 16px;
      background: rgba(255, 255, 255, 1);
      .title {
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(27, 27, 27, 1);
        line-height: 20px;
      }
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
            z-index: 999;
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
    .separate {
      margin-top: 10px;
      padding: 13px 16px;
      background: rgba(255, 255, 255, 1);
    }
    .logisticsInfo {
      background: #fff;
      .logistics {
        height: 20px;
        padding: 12px 0px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(27, 27, 27, 1);
        line-height: 20px;
        display: flex;
        justify-content: space-between;
        text {
          height: 20px;
          font-size: 14px;
          font-family: PingFang-SC-Medium, PingFang-SC;
          font-weight: 500;
          color: rgba(137, 137, 137, 1);
          line-height: 20px;
        }
        .marginLeft {
          margin-left: 14px;
        }
      }
    }
  }
}
</style>
