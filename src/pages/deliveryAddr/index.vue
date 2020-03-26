<template>
  <body-wrap>
    <tob-bar slot="topBar" :styleInfo="{ backgroundColor: '#fff' }" jumpButton>
      <text slot="title" style="color:#000">收货地址</text>
    </tob-bar>
    <view slot="content" class="content">
      <scroll-view scroll-y class="scrollView">
        <view
          class="addressItem"
          :class="item.disabled ? 'disabledAddress' : ''"
          v-for="(item, index) in addressInfo(
            availableAddress,
            getAddress,
            getAddressClassify
          )"
          :key="index"
          @click="selectAddress(item)"
        >
          <view class="userInfo">
            <view class="userAddress">
              <img
                :src="labelInfo(item['isDefault'], item['addressLabel'])"
                alt
              />
              <text>{{ item["address"] }}</text>
            </view>
            <view class="userInfoItem">
              <text>{{ item["fullName"] }}</text>
              <text>{{ item["sex"] === 1 ? "男士" : "女士" }}</text>
              <text>{{ item["phone"] }}</text>
            </view>
          </view>
          <view
            v-if="!item.disabled"
            class="editor"
            @click.stop="gotoDetail('edit', item.addressId)"
          >
            <img src="static/deliveryAddr/shopping cart-edit address.svg" alt />
          </view>
          <view v-if="item.disabled" class="editor">
            <text style="font-size:4px">不可配送</text>
          </view>
        </view>
      </scroll-view>
      <view class="newAddress">
        <button type="primary" @click.stop="gotoDetail('new')">
          新增收货地址
        </button>
      </view>
    </view>
  </body-wrap>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data () {
    return {
      availableAddress: []
    };
  },
  computed: {
    ...mapGetters(["getAddress", "getAddressClassify"]),
    addressInfo: () => {
      return (availableAddress, getAddress, getAddressClassify) => {
        if (availableAddress !== undefined) {
          return getAddressClassify;
        } else {
          return getAddress;
        }
      };
    }
  },
  methods: {
    ...mapActions({
      getAddressInfo: "GetAddressInfo"
    }),
    gotoDetail (operate, addressInfo = null) {
      if (!addressInfo) {
        this.$navTo("../deliveryAddr/newAddr");
      } else {
        this.$navTo("../deliveryAddr/newAddr", {
          addressId: addressInfo
        });
      }
    },
    selectAddress (item) {
      if (this.availableAddress !== undefined && item.disabled !== true) {
        console.log("上一个页面是订单可点击,这时候就要回返带选中地址而不是默认地址");
        console.log('item_', item);
        let pages = getCurrentPages(); //获取所有页面栈实例列表
        let prevPage = pages[pages.length - 2]; //上一页页面实例 订单详情页面
        prevPage.$vm.selectAddressInfo = item; //修改上一页data里面的searchVal参数值为1211
        uni.navigateBack({
          delta: 1
        });
      }
    },
    labelInfo (isDefault, addressLabel) {
      if (isDefault === 1) {
        return "static/deliveryAddr/address_company.svg";
      }
      switch (addressLabel) {
        case "家":
          return "static/deliveryAddr/address_home.svg";
          break;
        case "公司":
          return "static/deliveryAddr/address_company.svg";
          break;
        case "学校":
          return "static/deliveryAddr/address_school.svg";
          break;
        default:
          break;
      }
    },
    onLoad (option) {
      // 假如options有传参，说明是从订单页面过来的
      if (option.availableAddress !== undefined) {
        this.availableAddress = option.availableAddress;
      } else {
        this.availableAddress = undefined;
      }
      this.getAddressInfo()
    }
  }
};
</script>
<style lang="scss">
.content {
  flex: 1;
  border-top: 1px solid #e5e5e5;
  display: flex;
  flex-direction: column;
  .scrollView {
    width: 100%;
    flex: 1;
    background: #fff;
    // background: red;
    .addressItem {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 40px;
      display: flex;
      padding: 17px 14px;
      background: #fff;
      border-bottom: 2px solid #f3f3f3;
      .userInfo {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(39, 39, 39, 1);
        height: 50px;
        line-height: 20px;
        .userAddress {
          img {
            margin-right: 10px;
            position: relative;
            top: 4px;
          }
        }
        .userInfoItem {
          margin: 3px 0 0 47px;
          color: rgba(154, 153, 153, 1);
          text {
            margin-right: 5px;
          }
        }
      }
      .editor {
        width: 20%;
        text-align: right;
        height: 40px;
        line-height: 40px;
      }
    }
    .disabledAddress {
      background: #e5e5e5;
    }
  }
  .newAddress {
    width: 100%;
    height: 90px;
    position: relative;
    bottom: 0px;
    line-height: 90px;
    display: flex;
    align-items: center;
    margin-top: 50px;
    button {
      width: 80%;
      font-size: 16px;
    }
  }
}
</style>
