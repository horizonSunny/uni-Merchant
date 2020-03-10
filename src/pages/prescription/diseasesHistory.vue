<template>
  <modal>
    <view class="diseasesHistory">
      <view class="title">
        <view class="titleInfo">疾病史</view>
        <view class="close" @click="closeModal">X</view>
      </view>
      <view class="content">
        <view class="contentDis">
          <span>性别</span>
          <radio-group @change="sexChange">
            <view class="sexSel">
              <label
                v-for="(item, index) in items"
                :key="item.value"
                style="margin-right:20px;"
              >
                <view>
                  <radio
                    :value="item.value"
                    :checked="index === currentSex"
                  />{{ item.name }}
                </view>
              </label>
            </view>
          </radio-group>
        </view>
      </view>
    </view>
  </modal>
</template>
<script>
import modal from '@/components/modal.vue';
export default {
  components: {
    modal
  },
  data () {
    return {
      current: 0,
      modal: false,
      // 性别
      currentSex: '0',
      items: [
        { value: '0', name: "男士" },
        { value: '1', name: "女士" }
      ],
    }
  },
  methods: {
    radioChange: function (evt) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].value === evt.target.value) {
          this.current = i;
          break;
        }
      }
    },
    closeModal () {
      this.modal = false;
    },
    openModal () {
      this.modal = true;
    }
  }
}
</script>
<style lang="scss">
.diseasesHistory {
  height: 480px;
  position: absolute;
  bottom: 0px;
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
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
    flex: 1;
    padding: 0px 20px;
    background: red;
    .contentDis {
      list-style: none;
      min-height: 59px;
      width: 100%;
      background: yellow;
    }
  }
}
</style>