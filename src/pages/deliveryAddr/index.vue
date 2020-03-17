<template>
  <body-wrap>
    <tob-bar
      slot="topBar"
      :styleInfo="{ backgroundColor: '#fff' }"
      jumpButton=""
    >
      <text slot="title" style="color:#000">收货地址</text>
    </tob-bar>
    <view slot="content" class="content">
      <scroll-view scroll-y class="scrollView">
        <view
          class="addressItem"
          v-for="(item, index) in custAddress"
          :key="index"
          @click="selectAddress(item)"
        >
          <view class="userInfo">
            <view class="userAddress">
              <img src="static/deliveryAddr/address_company.svg" alt="" />
              <text
                >{{ item['province'] }}{{ item['city'] }}{{ item['area'] }}
              </text>
              <text>
                {{ item['detailAddress'] }}
              </text>
            </view>
            <view class="userInfoItem">
              <text>{{ item['fullName'] }}</text>
              <text>{{ item['sex'] }}</text>
              <text>{{ item['phone'] }}</text>
            </view>
          </view>
          <view class="editor" @click.stop="gotoDetail('edit', item)">
            <img
              src="static/deliveryAddr/shopping cart-edit address.svg"
              alt=""
            />
          </view>
        </view>
      </scroll-view>
    </view>
  </body-wrap>
</template>
<script>
export default {
  data() {
    return {
      custAddress: this.$store.getters.getCustAddress
    }
  },
  methods: {
    gotoDetail(operate, addressInfo = null) {
      this.$navTo('../deliveryAddr/newAddr')
      // if (!addressInfo) {
      //   this.$navTo('/pages/myOrder/selectPage/userAddress')
      // } else {
      //   this.$navTo('/pages/myOrder/selectPage/userAddress', addressInfo)
      // }
    },
    selectAddress(item) {
      // this.$store.dispatch('setSelectedAdd', item).then(() => {
      //   uni.navigateBack()
      // })
    }
  },
  onShow() {
    this.custAddress = this.$store.getters.getCustAddress
  }
}
</script>
<style lang="scss">
.content {
  flex: 1;
  border-top: 1px solid #e5e5e5;
  display: flex;
  flex-direction: column;
  .scrollView {
    width: 100%;
    height: 100%;
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
  }
}
</style>
