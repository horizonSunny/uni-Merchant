<template>
  <view class="content">
    <view class="contentShopping">
      <checkbox-group @change="checkboxChange">
        <label
          class="uni-list-cell uni-list-cell-pd"
          v-for="(item, index) in getShopCartList"
          :key="item.value"
        >
          <uni-swipe-action>
            <uni-swipe-action-item :options="options" @click="onClick($event, item)">
              <view class="commidityInfo" @click.stop>
                <checkbox
                  :value="item.value"
                  color="#FFCC33"
                  :checked="checkedArr.includes(String(item.value))"
                  :disabled="item.isShelf === 0"
                />
                <view class="productImg">
                  <img
                    :src="item.productImage"
                    @error="imageError(item)"
                    alt
                    width="60"
                    height="60"
                  />
                  <view v-show="item.isShelf === 0" class="model">已下架</view>
                </view>
                <view class="drugsInfo">
                  <view class="drugName">
                    <text class="mark" v-show="item.isMp === 0">OTC</text>
                    <text
                      class="mark"
                      v-show="item.isMp === 1"
                      style="color:red;border: 1px solid green;"
                    >OTC</text>
                    <text class="mark" v-show="item.isMp === 2">RX</text>
                    <text class="mark" v-show="item.isMp === 3">其他</text>
                    <text>{{ item.productName }}</text>
                    <view class="drugSpec">{{ item.productSpecif }}</view>
                  </view>
                  <!-- <view class="drugSpec">{{ item.productSpecif }}</view> -->
                  <view class="drugPrice">
                    <text>¥ {{ item.price }}</text>
                    <yp-number-box
                      :min="1"
                      :max="9"
                      :index="index"
                      :item="item"
                      @send-price="getCartNum"
                    ></yp-number-box>
                    <!-- {{ item.price }} -->
                  </view>
                </view>
              </view>
            </uni-swipe-action-item>
          </uni-swipe-action>
        </label>
      </checkbox-group>
      <view style="width:100%;height:50px"></view>
    </view>
    <view class="settleAccounts">
      <checkbox-group @change="allChoose">
        <label>
          <checkbox
            value="all"
            :class="{ checked: allChecked }"
            :checked="allChecked ? true : false"
          ></checkbox>全选
        </label>
      </checkbox-group>
      <!-- this.editorStatus 为编辑显示 -->
      <view class="price" v-show="this.editorStatus">
        <view class="priceInfo">¥ {{ calculateTotal }}</view>
        <view class="reminder">不包含运费</view>
      </view>
      <button
        type="primary"
        plain="true"
        class="button"
        v-show="this.editorStatus"
        @click="settlement"
      >
        <text v-if="totalNum === 0">结算</text>
        <text v-else-if="totalNum < 99 && totalNum > 0">结算({{ this.totalNum }})</text>
        <text v-else>结算(99)</text>
        <!--<text v-if="this.totalNum < 99 && this.totalNum > 0">
          结算(this.totalNum )</text
        >-->
        <!-- 结算({{ this.totalNum }}) -->
      </button>
      <!-- this.editorStatus为完成时候 -->
      <view v-show="!this.editorStatus" class="allOperate">
        <button @click="moveToFavorites">移入收藏夹</button>
        <button @click="cartDelete">删除</button>
      </view>
    </view>
  </view>
</template>
<script>
import uniSwipeAction from "@/components/uni-swipe-action/uni-swipe-action.vue";
import uniSwipeActionItem from "@/components/uni-swipe-action-item/uni-swipe-action-item.vue";
import ypNumberBox from "@/components/yp-number-box/yp-number-box.vue";
import { mapActions, mapGetters } from "vuex";
import { setProductCollect, shopCartDelete } from "@/service/index";
export default {
  components: {
    uniSwipeAction,
    uniSwipeActionItem,
    ypNumberBox
  },
  props: ["editorStatus", "selectedArr"],
  computed: {
    ...mapGetters(["getShopCartList"]),
    calculateTotal() {
      const selectCart = this.getShopCartList.filter(cartItem => {
        return this.checkedArr.indexOf(cartItem.value) > -1;
      });
      if (selectCart.length === 0) {
        this.totalNum = 0;
        return 0;
      } else {
        let totalPrice = 0;
        this.totalNum = 0;
        this.selectedCart = selectCart;
        selectCart.forEach(element => {
          this.totalNum += element.cartNum;
          totalPrice += element.price * element.cartNum;
        });
        return totalPrice;
      }
    }
  },
  created() {
    console.log("this.selectedArr_", this.selectedArr);

    // this.checkedArr = this.selectedArr;
    // const shopCart = this.getShopCartList.map(item => {
    //   if (this.selectedArr.indexOf(item.productId + "") !== -1) {
    //     // return item.value;
    //     console.log("item_", item.value);
    //     return item.value;
    //   }
    // });
    // this.checkedArr.push(...shopCart);
    // console.log("this.checkedArr_", this.checkedArr);

    // console.log("shopCart_", shopCart);
    // console.log("getShopCartList_", this.getShopCartList);
  },
  mounted() {
    // this.allChecked = false;
    // this.checkedArr = [];
    // console.log("mounted", this.getShopCartList);
  },
  data() {
    return {
      correctUrl: "/static/shoppingCart/shopping cart-bitmap2.svg",
      options: [
        {
          text: "移入收藏",
          style: {
            backgroundColor: "#F4AF02",
            width: "50px",
            textWidth: "30px",
            fontSize: "15px"
          }
        },
        {
          text: "删除",
          style: {
            backgroundColor: "#E60B35",
            width: "50px",
            textWidth: "30px",
            fontSize: "15px"
          }
        }
      ],
      checkedArr: [], //复选框选中的值
      allChecked: false, //是否全选
      totalNum: 0,
      selectedCart: ""
    };
  },
  methods: {
    ...mapActions({
      getShopCartInfo: "GetShopCartInfo"
    }),
    checkboxChange: function(e) {
      this.checkedArr = e.detail.value;
      console.log("this.checkedArr_", this.checkedArr);

      // 如果选择的数组中有值，并且长度等于列表的长度，就是全选
      if (
        this.checkedArr.length > 0 &&
        this.checkedArr.length == this.getShopCartList.length
      ) {
        this.allChecked = true;
      } else {
        this.allChecked = false;
      }
    },
    // 全选事件
    allChoose(e) {
      console.log("this.props.editorStatus_", this.editorStatus);

      let chooseItem = e.detail.value;
      // 全选
      if (chooseItem[0] == "all") {
        this.allChecked = true;
        for (let item of this.getShopCartList) {
          let itemVal = String(item.value);
          if (!this.checkedArr.includes(itemVal)) {
            this.checkedArr.push(itemVal);
          }
        }
      } else {
        // 取消全选
        console.log("取消全选");

        this.allChecked = false;
        this.checkedArr = [];
      }
    },
    onClick(e, cart) {
      console.log("cart_", cart);
      switch (e.index) {
        case 0:
          this.moveToFavorites(cart);
          break;
        case 1:
          this.cartDelete([cart.cartId]);
          break;
        default:
          break;
      }
      // console.log('cart_', cart)
    },
    // 结算
    settlement() {
      if (this.checkedArr.length === 0) {
        uni.showToast({
          icon: "none",
          title: "请选择需要结算的商品"
        });
      } else {
        console.log(this.selectedCart);
        this.$store.commit("NEW_INDENT", {
          selectedCart: this.selectedCart
        });
        this.$navTo("../indent/index");
      }
    },
    // 图片加载失败
    imageError(item) {
      console.log("imageError_", item);
      item.productImage = this.correctUrl;
    },
    // 获取每一个购物车加减的参数
    getCartNum(info) {
      console.log("num_", info);
      const { index, value } = info;
      this.getShopCartList[index].cartNum = value;
    },
    // 移入收藏夹
    moveToFavorites(itemInfo) {
      console.log("itemInfo_", itemInfo);
      console.log("this.getShopCartList_", this.getShopCartList);
      console.log("this.collectArr_", this.checkedArr);
      const collectArr = this.getShopCartList.map(item => {
        const id = item.cartId + "";
        if (this.checkedArr.indexOf(id) !== -1) {
          return item.productId;
        }
      });
      console.log("collectArr_", collectArr);
      const params = {
        productIds: itemInfo.productId ? [itemInfo.productId] : collectArr
      };
      setProductCollect(params).then(res => {
        shopCartDelete({
          cartIds: itemInfo.cartId ? [itemInfo.cartId] : this.checkedArr
        }).then(res => {
          this.getShopCartInfo();
        });
      });
    },
    // 删除购物车
    cartDelete(itemInfo) {
      console.log("this.checkedArr_", this.checkedArr);
      console.log("itemInfo_", itemInfo);
      const params = {
        cartIds: Array.isArray(itemInfo) ? itemInfo : this.checkedArr
      };
      shopCartDelete(params).then(res => {
        this.getShopCartInfo();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
// 改变组件样式
/deep/ .uni-checkbox-input {
  border-radius: 11px;
}
.content {
  display: flex;
  flex-direction: column;
  position: relative;
  .contentShopping {
    flex: 1;
    overflow: scroll;
  }
  .settleAccounts {
    border-top: 1px solid #f4f1f4;
    position: absolute;
    background: #fff;
    display: flex;
    padding-left: 15px;
    align-items: center;
    bottom: 0px;
    width: 100%;
    height: 50px;
    .price {
      margin-left: 9px;
      .priceInfo {
        width: 69px;
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(250, 73, 73, 1);
        line-height: 22px;
      }
      .reminder {
        width: 84px;
        height: 17px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(137, 137, 137, 1);
        line-height: 17px;
      }
    }
    .button {
      background: #3a74f1;
      float: right;
      width: 120px;
      height: 50px;
      border-radius: 0px;
      margin-right: 15px;
      color: #fff;
    }
    .allOperate {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      button {
        height: 28px;
        line-height: 28px;
        font-size: 13px;
        border-radius: 4px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        margin: 0px;
        margin-right: 20px;
      }
      button:nth-child(1) {
        border: 1px solid rgba(255, 180, 0, 1);
        color: rgba(246, 174, 0, 1);
      }
      button:nth-child(2) {
        border: 1px solid rgba(229, 11, 53, 1);
        color: #e50b35;
      }
    }
  }
}
.commidityInfo {
  height: 89px;
  width: 100%;
  padding: 12px 14px 15px;
  display: flex;
  margin-bottom: 15px;
  // justify-content: center;
  align-items: center;
  .productImg {
    width: 60px;
    height: 60px;
    margin-left: 10px;
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
      height: 66px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(27, 27, 27, 1);
      line-height: 20px;
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
      height: 18px;
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(137, 137, 137, 1);
      line-height: 18px;
    }
    .drugPrice {
      margin-top: 11px;
      height: 25px;
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(250, 73, 73, 1);
      line-height: 25px;
      display: flex;
      justify-content: space-between;
    }
  }
}
.cont {
  height: 100px;
  width: 100%;
}
</style>
