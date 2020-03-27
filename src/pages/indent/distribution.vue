<template>
  <modal v-if="modal">
    <view class="distribution">
      <view class="title">
        <view class="titleInfo">配送方式</view>
        <view class="close" @click="closeModal">X</view>
      </view>
      <view class="content">
        选择配送方式
        <view class="contentSelect uni-list">
          <radio-group @change="radioChange">
            <label
              class="uni-list-cell uni-list-cell-pd"
              v-for="(item, index) in shipperType"
              :key="index"
            >
              <view
                class="selectInfo"
                :class="item.shipperTypeId == current ? 'active' : ''"
              >
                <view>{{ item.shipperName }}</view>
                <view>
                  ¥{{ item.shipperAmount }}
                  <radio
                    :value="item.shipperTypeId + ''"
                    :checked="item.shipperTypeId == current"
                  />
                </view>
              </view>
            </label>
          </radio-group>
        </view>
      </view>
    </view>
  </modal>
</template>
<script>
import modal from "@/components/modal.vue";
export default {
  props: ["shipperType", "hasSelected"],
  components: {
    modal
  },
  data () {
    return {
      current: this.hasSelected && this.hasSelected["shipperTypeId"]
        ? this.hasSelected["shipperTypeId"]
        : 1,
      modal: false
    };
  },
  watch: {
    hasSelected (value) {
      console.log('props_hasSelected');
      this.current = value.shipperTypeId
    }
  },
  methods: {
    radioChange: function (evt) {
      console.log("this.shipperType_", this.shipperType);

      for (let i = 0; i < this.shipperType.length; i++) {
        if (this.shipperType[i].shipperTypeId == evt.target.value) {
          this.current = evt.target.value;
          break;
        }
      }
      this.$emit("shipperSelected", evt.detail.value);
      this.closeModal();
    },
    closeModal () {
      this.modal = false;
    },
    openModal () {
      this.modal = true;
    }
  },
  created () {
    console.log("this.hasSelected_", this.hasSelected);
  }
};
</script>
<style lang="scss" scoped>
.distribution {
  width: 100%;
  height: 300px;
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
    .titleInfo {
      display: inline-block;
    }
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
    padding: 0px 15px;
    font-size: 14px;
    overflow: scroll;
    .contentSelect {
      height: 200px;
      .selectInfo {
        display: flex;
        border-radius: 4px;
        border: 1px solid rgba(58, 116, 241, 1);
        justify-content: space-between;
        border-radius: 4px;
        padding: 10px 14px;
        margin: 20px;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(58, 116, 241, 1);
        /deep/ uni-radio {
          margin-left: 13px;
          position: relative;
          top: -2px;
        }
      }
      .active {
        background: rgba(235, 241, 255, 1);
      }
    }
  }
}
</style>