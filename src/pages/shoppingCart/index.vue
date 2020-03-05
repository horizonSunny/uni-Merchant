<template>
  <body-wrap>
    <tob-bar slot="topBar">
      <text slot="title">所打动</text>
    </tob-bar>
    <view slot="content" class="content">
      <view class="classify">
        <view class="classifyTitle">
          <text class="title">
            <img src="static/shoppingCart/shopping cart-business.svg" alt="" />
            商家名称
          </text>
          <view class="medicineOperate" @click="goClassify">
            <img src="static/shoppingCart/shopping cart-coupon.svg" alt="" />
          </view>
        </view>
        <view class="classifyDetails">
          <view class="uni-list">
            <checkbox-group @change="checkboxChange">
              <label
                class="uni-list-cell uni-list-cell-pd"
                v-for="item in items"
                :key="item.value"
              >
                <view>
                  <checkbox :value="item.value" :checked="item.checked" />
                </view>
                <view>{{ item.name }}</view>
              </label>
            </checkbox-group>
          </view>
        </view>
      </view>
    </view>
    <tab-bar slot="tabBar"></tab-bar>
  </body-wrap>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data () {
    return {
      title: 'checkbox 复选框',
      items: [{
        value: 'USA',
        name: '美国'
      },
      {
        value: 'CHN',
        name: '中国',
        checked: 'true'
      },
      {
        value: 'BRA',
        name: '巴西'
      },
      {
        value: 'JPN',
        name: '日本'
      },
      {
        value: 'ENG',
        name: '英国'
      },
      {
        value: 'FRA',
        name: '法国'
      }
      ]
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
    checkboxChange: function (e) {
      var items = this.items,
        values = e.detail.value;
      for (var i = 0, lenI = items.length; i < lenI; ++i) {
        const item = items[i]
        if (values.includes(item.value)) {
          this.$set(item, 'checked', true)
        } else {
          this.$set(item, 'checked', false)
        }
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
  border-top: 1px solid #d4d4d4;
  overflow: hidden;
  .classify {
    width: 100%;
    background: #f4f1f4;
    .classifyTitle {
      padding: 12px 14px 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 48px;
      line-height: 48px;
      background: #fff;
      .title {
        height: 21px;
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(27, 27, 27, 1);
        line-height: 21px;
        img {
          position: relative;
          top: 2px;
          margin-right: 2px;
        }
      }
      .medicineOperate {
        display: flex;
        align-items: center;
        .operate {
          font-size: 12px;
          font-weight: 500;
          color: rgba(137, 137, 137, 1);
          margin-right: 5px;
        }
      }
    }
  }
}
// 改变组件样式
/deep/ .uni-checkbox-input {
  border-radius: 11px;
}
</style>
