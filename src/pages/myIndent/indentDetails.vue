<template>
  <body-wrap>
    <tob-bar slot="topBar">
      <text slot="title">订单详情</text>
    </tob-bar>
    <view slot="content" class="content">
      <view class="indent">
          <view class="titleInfo">
            <view class="remindInfo">
              <view class="status">等待审核</view>
              <view class="statusDetails">耐性等待，商家正在审核中哦～</view>
            </view>
            <img src="static/myIndent/my order-To examine.svg" alt="">
          </view>
          <view class="userInfo">
            <view @click="toDeliveryAddr">
              <view class="user">
                <img src="static/icon/merchantsIntr/location.svg" alt="" />
                <view class="userName">王慧</view>
                <view class="phone">13890876778</view>
              </view>
              <view class="address">
                长泰广场E座 长泰广场E座 长泰广场E座
              </view>
            </view>
            <view class="pickUp" v-show="true">
              <view class="user">
                <img
                  src="static/shoppingCart/shopping cart-business.svg"
                  alt=""
                />
                <view class="userName">门店自提点：xxx大药房</view>
              </view>
              <view class="address">
                地址：上海市 浦东新区 海科路100号 23号楼
                </br>
                营业时间：每个公族日 9:00-22:00
              </view>
            </view>
            <!-- <view class="pickUp"> </view> -->
          </view>
          <view class="prescription" @click="prescription">
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
                <!-- <view class="model">已下架</view> -->
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
          <view class="separate logisticsInfo indentInfo">
            <view class="logistics">
              发票信息
              <view class="home_right">
                无需发票
              </view>
            </view>
            <view class="logistics">
              商品总价
              <view class="home_right">
                ¥464.00
              </view>
            </view>
            <view class="logistics" @click="openModal">
              <view>
                配送方式
                <text class="marginLeft home_right"> 普通快递</text>
              </view>
              <view class="home_right">
                ¥12.00
              </view>
            </view>
          </view>
          <view class="separate logisticsInfo indentInfo">
            <view class="indentTotal">
              <text>订单总价</text>
              <text>¥464</text>
            </view>
          </view>
          <view class="separate logisticsInfo">
            <view class="logistics">
              订单编号
              <view class="home_right">
                092373273278783
              </view>
            </view>
            <view class="logistics">
              下单时间
              <view class="home_right">
              2020-01-08 12:09:35
              </view>
            </view>
          </view>
          <view class="separate logisticsInfo">
            <view class="logistics" style="display:block">
              请按照<text style="color:#4473E5;">《商品验收标准》</text>对货品进行验收
            </view>
          </view>
           <view class="separate logisticsInfo">
               <view class="logistics">
                  <view class="indentOperate" @click.stop>
                    <view class="pray">删除订单</view>
                    <!-- <view class="pray">取消订单</view> -->
                    <view class="active">重新购买</view>
                    <view class="active" @click="toComment">评价</view>
                    <!-- <view class="active">查看物流</view>
                    
                    <view class="active">付款</view> -->
                  </view>
               </view>
          </view>
        </view> 
      <!-- <purchasefailed></purchasefailed> -->
      <!-- <distribution ref="distribution"></distribution>
      <invoice ref="invoice"></invoice> -->
     </view>
    <!-- <tab-bar slot="tabBar"></tab-bar> -->
  </body-wrap>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
// import commidityItem from "./commidityItem";
// import purchasefailed from './purchasefailed';
// import distribution from './distribution';
// import invoice from './invoice';
export default {
  components: {
    // commidityItem
    // purchasefailed,
    // distribution,
    // invoice
  },
  data () {
    return {
      editor: true,
      // 选择自提时候，改变为true
      pickUp: false
    }
  },
  onLoad () {
    console.log('saSsa');

  },
  computed: {
    ...mapGetters(["classify"])
  },
  methods: {
    ...mapActions({

    }),
    // 改变当前是编辑状态还是完成状态
    reverseEditor () {
      this.editor = !this.editor
    },
    // 获取当前页面位置
    prescription () {
      this.$navTo("../prescription/index");
    },
    // 打开快递配送
    openModal () {
      this.$refs.distribution.openModal()
    },
    // 去收货地址
    toDeliveryAddr () {
      this.$navTo("../deliveryAddr/index");
      // this.$navTo("../deliveryAddr/newAddr");
    },
    // 打开发票弹窗
    showInvoice () {
      this.$refs.invoice.openModal()
    },
    // toComment去评论页面
    toComment () {
      this.$navTo("../myIndent/comment");
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
    height: auto;
    background: #f4f1f4;
    .titleInfo {
      height: 101px;
      background: linear-gradient(
        270deg,
        rgba(58, 116, 241, 1) 0%,
        rgba(80, 136, 255, 1) 100%
      );
      padding: 25px 37px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
      }
      .remindInfo {
        color: #fff;
        .status {
          height: 22px;
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 22px;
        }
        .statusDetails {
          height: 16px;
          font-size: 11px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 16px;
        }
      }
    }
    .userInfo {
      margin-top: 5px;
      height: auto;
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
      .pickUp {
        border-top: 1px dashed rgba(219, 219, 219, 1);
        margin-top: 17px;
        padding: 13px 0px;
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
      margin-bottom: 1px;
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
        padding: 5px 0px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(27, 27, 27, 1);
        line-height: 20px;
        display: flex;
        justify-content: space-between;
        .home_right {
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
        .indentOperate {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          view {
            width: 90px;
            height: 28px;
            line-height: 28px;
            border-radius: 14px;
            text-align: center;
            margin-left: 10px;
            font-size: 13px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
          }
          .pray {
            border: 1px solid rgba(137, 137, 137, 1);
            color: rgba(137, 137, 137, 1);
          }
          .active {
            color: rgba(58, 116, 241, 1);
            border: 1px solid #3a74f1;
          }
        }
      }
    }
    .indentInfo {
      margin-top: 1px;
      .indentTotal {
        height: 21px;
        line-height: 21px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        text {
          margin-left: 5px;
        }
        text:nth-child(1) {
          height: 18px;
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(27, 27, 27, 1);
          line-height: 18px;
        }
        text:nth-child(2) {
          height: 21px;
          font-size: 15px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(250, 73, 73, 1);
          line-height: 21px;
        }
      }
    }
  }
}
</style>
