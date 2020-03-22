<template>
  <body-wrap>
    <tob-bar slot="topBar" :styleInfo="{ backgroundColor: '#fff' }" jumpButton="black">
      <text slot="title" style="color:#000">订单详情</text>
    </tob-bar>
    <view slot="content" class="content">
      <view class="indent">
        <view class="titleInfo">
          <view class="remindInfo">
            <view class="status">{{orderStatus(getOrderDetails.orderStatus).title}}</view>
            <view class="statusDetails">{{orderStatus(getOrderDetails.orderStatus).msg}}</view>
          </view>
          <img :src="orderStatus(getOrderDetails.orderStatus).iconPath" alt />
        </view>
        <view class="userInfo">
          <view>
            <view class="user">
              <img src="static/icon/merchantsIntr/location.svg" alt />
              <view class="userName">{{getOrderDetails.deliveryAddress.fullName}}</view>
              <view class="phone">{{getOrderDetails.deliveryAddress.phone}}</view>
            </view>
            <view class="address">{{getOrderDetails.deliveryAddress.address}}</view>
          </view>
          <view class="pickUp" v-show="true">
            <view class="user">
              <img src="static/shoppingCart/shopping cart-business.svg" alt />
              <view class="userName">门店自提点：xxx大药房</view>
            </view>
            <view class="address">
              地址：上海市 浦东新区 海科路100号 23号楼
              <br />营业时间：每个公族日 9:00-22:00
            </view>
          </view>
          <!-- <view class="pickUp"> </view> -->
        </view>
        <view class="prescription" @click="prescription">
          <view class="title">
            <img src="static/shoppingCart/shopping cart-prescription.svg" alt />
            处方信息
          </view>
          <view class="home_right">
            <img src="static/icon/main/home_right-2.svg" alt />
          </view>
        </view>
        <view class="effectiveGoods">
          <view class="title">商家名称</view>
          <view
            class="commidityInfo"
            v-for="(item, index) in getOrderDetails.orderItems"
            :key="index"
          >
            <view class="productImg">
              <img :src="item.productImage[0]" alt width="60" height="60" />
              <!-- <view class="model">已下架</view> -->
            </view>
            <view class="drugsInfo">
              <view class="drugName">
                <view>
                  <text class="mark" v-show="item.isMp === 0">OTC</text>
                  <text
                    class="mark"
                    v-show="item.isMp === 1"
                    style="color:red;border: 1px solid green;"
                  >OTC</text>
                  <text class="mark" v-show="item.isMp === 2">RX</text>
                  <text class="mark" v-show="item.isMp === 3">其他</text>
                  <text>{{item.productName}}</text>
                </view>
                <view class="drugPrice">¥ {{item.price}}</view>
              </view>
              <view class="drugSpec">
                <view>已选择：{{item.productSpecif}}</view>
                <view>X{{item.cartNum}}</view>
              </view>
            </view>
          </view>
        </view>
        <view class="separate logisticsInfo indentInfo">
          <view class="logistics">
            发票信息
            <view
              class="home_right"
            >{{getOrderDetails.invoice&& getOrderDetails.invoice.invoiceType=== 2 ? '个人发票 ':'无需发票'}}</view>
          </view>
          <view class="logistics">
            商品总价
            <view class="home_right">¥{{getOrderDetails.totalPrice}}</view>
          </view>
          <view class="logistics">
            <view>
              配送方式
              <text class="marginLeft home_right">普通快递</text>
            </view>
            <view class="home_right">¥12.00</view>
          </view>
        </view>
        <view class="separate logisticsInfo indentInfo">
          <view class="indentTotal">
            <text>订单总价</text>
            <text>¥{{getOrderDetails.totalPrice}}</text>
          </view>
        </view>
        <view class="separate logisticsInfo">
          <view class="logistics">
            订单编号
            <view class="home_right">{{getOrderDetails.orderNo}}</view>
          </view>
          <view class="logistics">
            下单时间
            <view class="home_right">{{getOrderDetails.createTime}}</view>
          </view>
        </view>
        <view class="separate logisticsInfo">
          <view class="logistics" style="display:block">
            请按照
            <text style="color:#4473E5;">《商品验收标准》</text>对货品进行验收
          </view>
        </view>
        <view class="separate logisticsInfo">
          <view class="logistics">
            <view class="indentOperate" @click.stop>
              <view
                class="pray"
                @click="deleteOrder(getOrderDetails)"
                v-if="
                        getOrderDetails.orderStatus === 5 ||
                          getOrderDetails.orderStatus === 4
                      "
              >删除订单</view>
              <view
                class="pray"
                v-if="getOrderDetails.orderStatus === 0"
                @click="openModal(indentItem)"
              >取消订单</view>
              <view
                class="active"
                v-if="getOrderDetails.orderStatus === 5"
                @click="repurchase()"
              >重新购买</view>
              <view class="active" v-if="getOrderDetails.orderStatus === 3">查看物流</view>
              <view
                class="active"
                v-if="getOrderDetails.orderStatus === 4"
                @click="jumpInfo(getOrderDetails, getOrderDetails.orderStatus)"
              >评价</view>
              <view class="active" v-if="getOrderDetails.orderStatus === 0">付款</view>
            </view>
          </view>
        </view>
      </view>
      <cancelOrder ref="cancelOrder" :currentOpeateOrder="currentOpeateOrder"></cancelOrder>
    </view>
  </body-wrap>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { buyAgain, deleteOrder } from "@/service/index";
import cancelOrder from "./cancelOrder";
export default {
  components: { cancelOrder },
  data() {
    return {
      editor: true,
      // 选择自提时候，改变为true
      pickUp: false
    };
  },
  onLoad(option) {
    console.log("indentDetails_", option);
  },
  onShow() {
    console.log("indentDetails_", this.getOrderDetails);
  },
  computed: {
    ...mapGetters(["getOrderDetails"]),
    orderStatus() {
      return function(status) {
        switch (status) {
          case -1:
            return {
              title: "退款中",
              msg: "商家正在处理",
              iconPath: "/static/order/my order_refund.svg"
            };
            break;
          // case -2:
          //   return "已退款";
          //   break;
          case -2:
            return {
              title: "交易失败",
              msg: "",
              iconPath: "/static/order/my order_transaction failure.svg"
            };
            break;
          case 0:
            return {
              title: "等待付款",
              msg: "请及时付款哦～",
              iconPath: "/static/order/my order_pending payment.svg"
            };
            break;
          case 1:
            return {
              title: "等待审核",
              msg: "耐心等待，商家正在审核中哦～",
              iconPath: "/static/order/my order-To examine.svg"
            };
            break;
          case 2:
            return {
              title: "等待发货",
              msg: "商家承诺24小时内发货～",
              iconPath: "/static/order/my order_to be shipped.svg"
            };
            break;
          case 3:
            return {
              title: "等待收货",
              msg: "",
              iconPath: "/static/order/my order_goods to be received.svg"
            };
            break;
          case 4:
            return {
              title: "交易成功",
              msg: "",
              iconPath: "/static/order/my order_successful trade.svg"
            };
            break;
          case 5:
            return {
              title: "交易取消",
              msg: "",
              iconPath: "/static/order/my order_Cancel transaction.svg"
            };
            break;
          default:
            break;
        }
      };
    }
  },
  methods: {
    ...mapActions({}),
    // 获取当前页面位置
    prescription() {
      this.$navTo(
        "../myIndent/prescribingInformation",
        this.getOrderDetails.prescribInfo
      );
    },
    // toComment去评论页面
    toComment() {
      this.$navTo("../myIndent/comment");
    },
    // 重新购买
    repurchase() {
      buyAgain({
        orderNo: this.getOrderDetails.orderNo
      }).then(res => {
        this.$navTo("../shoppingCart/index", {
          productIds: res.data.productIds
        });
      });
    },
    jumpInfo(info, key) {
      // console.log('info_', info);
      this.$store.commit("SET_INDENT_INFO", info);
      switch (key) {
        case 4:
          this.$navTo("../myIndent/comment", {});
          break;

        default:
          break;
      }
    },
    //删除订单
    deleteOrder(indentItem) {
      deleteOrder({ orderNo: indentItem.orderNo }).then(res => {
        uni.navigateBack();
        // console.log("res_", res);
        // tabItem.splice(index, 1);
      });
    },
    // 取消订单
    openModal(openModal) {
      this.currentOpeateOrder = openModal;
      this.$refs.cancelOrder.openModal();
      // uni.navigateBack();
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
      justify-content: space-between;
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
            text-align: right;
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
