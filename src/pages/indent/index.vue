<template>
  <body-wrap>
    <tob-bar slot="topBar" :styleInfo="{ backgroundColor: '#fff' }" jumpButton>
      <text slot="title" style="color:#000">订单结算</text>
    </tob-bar>
    <view slot="content" class="content">
      <view class="indent">
        <view class="userInfo">
          <view
            @click="gotoNextPage('../deliveryAddr/index', {activeAddressIds:addressIds})"
            v-if="getDefaultAddress(addressIds)"
          >
            <view class="user">
              <img src="static/icon/merchantsIntr/location.svg" alt />
              <view class="userName">{{ getDefaultAddress(addressIds).fullName }}</view>
              <view class="phone">{{ getDefaultAddress(addressIds).phone }}</view>
            </view>
            <view class="address">{{ getDefaultAddress(addressIds).address }}</view>
          </view>
          <view v-else @click="gotoNextPage('../deliveryAddr/newAddr', {})" class="noAddress">
            <img src="/static/myIndent/Add address.svg" alt />
            <view>添加收货地址</view>
          </view>
          <view class="pickUp" v-if="pickUp">
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
        <view class="prescription" @click="prescription" v-if="haveRx">
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
            v-for="(item, index) in newIndentClassification.activeIndent"
            :key="index"
          >
            <view class="productImg">
              <img :src="item.productImage" @error="imageError(item)" alt width="60" height="60" />
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
                  <text>{{ item.productName }}</text>
                </view>
                <view class="drugPrice">¥ {{ item.price }}</view>
              </view>
              <view class="drugSpec">
                <view>已选择：{{ item.productSpecif }}</view>
                <view>X{{ item.cartNum }}</view>
              </view>
            </view>
          </view>
        </view>
        <view class="separate logisticsInfo">
          <view class="logistics" @click="openModal">
            <view>
              运费
              <text class="marginLeft">8.00元起</text>
            </view>
            <view class="home_right">
              ¥12.00
              <img class="marginLeft" src="static/icon/main/home_right-2.svg" alt />
            </view>
          </view>
          <view class="logistics">
            优惠券
            <view class="home_right">
              ¥0.00
              <img class="marginLeft" src="static/icon/main/home_right-2.svg" alt />
            </view>
          </view>
          <view class="logistics">
            共{{caculateTotal.totalNum}}件商品 应付金额（含运费）
            <view class="home_right">¥{{caculateTotal.totalPrice+".00"}}</view>
          </view>
        </view>
        <view class="separate logisticsInfo">
          <view class="logistics">
            付款方式
            <view class="home_right">在线支付</view>
          </view>
          <view class="logistics" @click="showInvoice">
            <view>发票信息</view>
            <view class="home_right">
              请选择
              <img class="marginLeft" src="static/icon/main/home_right-2.svg" alt />
            </view>
          </view>
        </view>
        <view class="effectiveGoods" v-if="newIndentClassification.invalidIndent.length !== 0">
          <view class="title">失效商品</view>
          <view
            class="commidityInfo"
            v-for="(item, index) in newIndentClassification.invalidIndent"
            :key="index"
          >
            <view class="failure">失效</view>
            <view class="productImg">
              <img :src="item.productImage" @error="imageError(item)" alt width="60" height="60" />
            </view>
            <view class="drugsInfo">
              <view class="failureInfo">
                <text class="mark" v-show="item.isMp === 0">OTC</text>
                <text
                  class="mark"
                  v-show="item.isMp === 1"
                  style="color:red;border: 1px solid green;"
                >OTC</text>
                <text class="mark" v-show="item.isMp === 2">RX</text>
                <text class="mark" v-show="item.isMp === 3">其他</text>
                <text>{{ item.productName }}</text>
              </view>

              <view class="drugSpec">
                <view>已选择：{{ item.productSpecif }}</view>
                <view>X{{ item.cartNum }}</view>
              </view>
              <view class="drugSpec">{{ item.reasons }}</view>
            </view>
          </view>
        </view>
        <view style="width:100%;height:50px"></view>
      </view>
      <view class="payment">
        <view class="amount">
          合记
          <text>¥464</text>
        </view>
        <view class="operate">去支付</view>
      </view>
      <!-- <purchasefailed></purchasefailed> -->
      <distribution
        ref="distribution"
        :shipperType="shipperType"
        @shipperSelected="shipperChange"
        :hasSelected="shipperSelected"
      ></distribution>
      <invoice ref="invoice"></invoice>
    </view>
    <!-- <tab-bar slot="tabBar"></tab-bar> -->
  </body-wrap>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
// import commidityItem from "./commidityItem";
import purchasefailed from "./purchasefailed";
import distribution from "./distribution";
import invoice from "./invoice";
import { confirmOrder } from "@/service/index";
export default {
  components: {
    // commidityItem
    purchasefailed,
    distribution,
    invoice
  },
  data() {
    return {
      editor: true,
      // 选择自提时候，改变为true
      pickUp: false,
      haveRx: false,
      correctUrl: "/static/shoppingCart/shopping cart-bitmap2.svg",
      // 可配送地址id
      addressIds: [],
      shipperType: [],
      shipperSelected: 1
    };
  },
  onLoad(option) {},
  onShow() {
    console.log("getDefaultAddress_", this.getDefaultAddress);
    console.log("newIndentClassification_", this.newIndentClassification);
    this.haveRx = this.newIndentClassification.activeIndent.some(item => {
      return item.isMp === 2;
    });
    let shopCartId = this.newIndentClassification.activeIndent.map(item => {
      return item.cartId;
    });
    console.log("shopCartId_", shopCartId);
    // 依据购物车信息确认可配送订单信息
    confirmOrder({ shopCartIds: shopCartId }).then(res => {
      // console.log("res_", res.data);
      console.log("confirmOrder_", res.data);
      // 配送模版
      this.shipperType = res.data.shipperType;
      this.addressIds = res.data.addressIds;
    });
  },
  computed: {
    ...mapGetters(["getDefaultAddress", "newIndentClassification"]),
    caculateTotal() {
      let totalNum = 0,
        totalPrice = 0;
      this.newIndentClassification.activeIndent.forEach(element => {
        console.log("element_", element);
        totalNum += element.cartNum;
        totalPrice += element.cartNum * element.price;
      });
      console.log("totalNum_", totalNum, "_totalPrice_", totalPrice);
      return {
        totalNum,
        totalPrice
      };
    }
  },
  methods: {
    ...mapActions({}),
    // 改变当前是编辑状态还是完成状态
    reverseEditor() {
      this.editor = !this.editor;
    },
    // 获取当前页面位置
    prescription() {
      this.$navTo("../prescription/index");
    },
    // 打开快递配送
    openModal() {
      this.$refs.distribution.openModal();
    },
    // 跳转页面
    gotoNextPage(url, parameters) {
      this.$navTo(url, parameters);
    },
    // 打开发票弹窗
    showInvoice() {
      this.$refs.invoice.openModal();
    },
    // 图片加载失败
    imageError(item) {
      console.log("imageError_", item);
      item.productImage = this.correctUrl;
    },
    // 运费模版选择
    shipperChange(e) {
      console.log("shipperSelected_", e);
      const shipper = e;
      this.shipperSelected = e;
      const select = this.shipperType.find(item => {
        return item.shipperTypeId == e;
      });
      console.log("select_", select);
      if (select.shipperName === "到店自提") {
        this.pickUp = true;
      } else {
        this.pickUp = false;
      }
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
      .noAddress {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(58, 116, 241, 1);
        justify-content: center;
        view {
          margin-left: 7px;
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
            text-align: right;
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
  .payment {
    display: flex;
    position: fixed;
    border-top: 2px solid #ededed;
    bottom: 0px;
    z-index: 99;
    background: #ededed;
    height: 50px;
    width: 100%;
    align-items: center;
    .amount {
      height: 50px;
      line-height: 50px;
      width: 65%;
      padding-left: 7%;
      background: #fff;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(27, 27, 27, 1);
      text {
        margin-left: 5px;
        width: 77px;
        height: 25px;
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(250, 73, 73, 1);
        line-height: 25px;
      }
    }
    .operate {
      flex: 1;
      height: 50px;
      line-height: 50px;
      background: #3a74f1;
      border: 0px;
      text-align: center;
      border-radius: 0px;
      font-size: 15px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
