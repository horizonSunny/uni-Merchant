<template>
  <modal v-if="modal">
    <view class="distribution">
      <view class="title">
        <view class="titleInfo">{{
          operate === 0 ? "加入购物车" : "立即购买"
        }}</view>
        <view class="close" @click="closeModal">X</view>
      </view>
      <view class="commidityInfo" @click.stop>
        <view class="productImg">
          <img
            :src="item.productImage[0]"
            @error="imageError(item)"
            alt="暂无图片"
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
              >OTC</text
            >
            <text class="mark" v-show="item.isMp === 2">RX</text>
            <text class="mark" v-show="item.isMp === 3">其他</text>
            <text>{{ item.productName }}</text>
            <view class="drugSpec">批准文号:{{ item.approvalNumber }}</view>
            <view class="drugPrice">
              <text>¥ {{ item.price }}</text>
            </view>
            <view class="drugSpec">{{ item.productSpecif }}</view>
          </view>
          <!-- <view class="drugSpec">{{ item.productSpecif }}</view> -->
        </view>
      </view>
      <view class="content">
        请选择单品
        <view class="contentSelect">
          <view class="invoiceInfo">
            0.23给*200片／瓶
          </view>
        </view>
      </view>
      <view class="content">
        <view class="caculate">
          <text>数量</text>
          <yp-number-box
            :min="1"
            :max="item.stock"
            @change="numChange"
          ></yp-number-box>
        </view>
        <view
          ><text style="color:#898989;margin-right:10px">库存</text>
          {{ item.stock }}</view
        >
      </view>
      <button type="warn" @click="submit" class="confirm">
        {{ operate === 0 ? "加入购物车" : "立即购买" }}
      </button>
    </view>
  </modal>
</template>
<script>
import modal from "@/components/modal.vue";
import validate from "@/utils/validate";
import ypNumberBox from '@/components/yp-number-box1.1/yp-number-box.vue'
import { getProductDetails, newCart, setProductVisit } from '@/service/index'
export default {
  //operate 0是加入购物车，1是立即购买
  props: ['item', 'operate'],
  components: {
    modal,
    ypNumberBox
  },
  data () {
    return {
      modal: false,
      cartNum: 1,
    };
  },
  methods: {
    closeModal () {
      this.modal = false;
    },
    openModal () {
      this.modal = true;
    },
    submit () {
      if (this.operate === 0) {
        this.addShoppingCart()
      } else {
        let product = this.item
        product.cartNum = this.cartNum
        console.log('product_', product);
        this.$store.commit('NEW_INDENT', {
          selectedCart: [product]
        })
        this.$navTo('../indent/index', { isFromCart: true })
        this.closeModal();
      }
    },
    // 加入购物车,判断一下，如果
    addShoppingCart (cartNum) {
      newCart({
        productId: this.item.productId,
        cartNum: this.cartNum
      }).then(res => {
        this.closeModal();
      })
    },
    numChange (val) {
      this.cartNum = val
      console.log('this.cartNum _', this.cartNum);
    }
  },
  created () {
    console.log('this.item_', this.item);

  }
};
</script>
<style lang="scss" scoped>
.distribution {
  width: 100%;
  height: 405px;
  position: fixed;
  bottom: 0px;
  background: rgba(255, 255, 255, 1);
  .title {
    height: 40px;
    width: 100%;
    // padding: 0px 15px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(27, 27, 27, 1);
    line-height: 40px;
    text-align: center;
    position: relative;
    border-bottom: 1px solid #efefef;
    .close {
      font-size: 18px;
      font-weight: 30;
      position: absolute;
      top: 0px;
      right: 0px;
      width: 50px;
      padding-right: 15px;
      text-align: right;
    }
  }
  .content {
    padding: 12px 15px;
    font-size: 14px;
    overflow: scroll;
    .contentSelect {
      height: 54px;
      margin-top: 17px;
      display: flex;
      align-items: center;
      .invoiceInfo {
        width: auto;
        padding: 7px 17px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        background: rgba(255, 240, 240, 1);
        border-radius: 4px;
        border: 1px solid rgba(250, 73, 73, 1);
        margin-left: 18px;
        font-size: 14px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(250, 73, 73, 1);
      }
    }
    .caculate {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 2px;
    }
  }
  .confirm {
    position: absolute;
    bottom: 0px;
    width: 100%;
  }
  .commidityInfo {
    height: 89px;
    width: 100%;
    padding: 12px 14px 15px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #efefef;
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
      height: 85px;
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
}
</style>