<template>
  <modal>
    <view class="diseasesHistory">
      <view class="title">
        <view class="titleInfo">疾病史</view>
        <view class="close" @click="closeModal">X</view>
      </view>
      <view class="content">
        <view class="contentWrap" v-for="(item, index) in test" :key="index">
          <view class="contentDis">
            <span>{{ item.name }}</span>
            <radio-group @change="diseaChange($event, item)">
              <view class="choose">
                <label
                  v-for="(itemInfo, indexInfo) in items"
                  :key="indexInfo"
                  style="margin-right:20px;"
                >
                  <view>
                    <radio
                      :value="itemInfo.value"
                      :checked="itemInfo.value == item.status"
                    />{{ itemInfo.name }}
                  </view>
                </label>
              </view>
            </radio-group>
          </view>
          <view v-show="item.status == 1" class="diseases">
            <view
              class="diseasesItem"
              v-for="(diseasesInfo, diseasesIndex) in item.diseases"
              :key="diseasesIndex"
              >{{ diseasesInfo }}
              <view
                class="delete"
                @click.stop="deleteDiseases(item, diseasesInfo)"
                >x</view
              >
            </view>
            <view class="diseasesItem diseasesAdd" @click="addDiseases(item)"
              >+</view
            >
          </view>
        </view>
      </view>
      <view class="confirm">
        <button type="primary" class="save" @click="submit">
          完成
        </button>
      </view>
    </view>
    <!-- 为病史添加药物 -->
    <view class="diseasesHistory" v-show="diseasesAdd">
      <view class="title">
        <view class="titleInfo">添加疾病</view>
        <view class="close" @click="closeAdd">X</view>
      </view>
      <view class="contentInfo">
        <input
          @input="onKeyInput"
          class="uni-input"
          confirm-type="search"
          placeholder="请输入疾病名称"
          @confirm="confirmInput"
        />
      </view>
    </view>
  </modal>
</template>
<script>
import modal from '@/components/modal.vue';
import { diseasesHistory } from '@/config/test'
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
        { value: '1', name: "有" },
        { value: '0', name: "无" }
      ],
      test: diseasesHistory,
      // 当前要添加疾病的病史
      currentDiseases: '',
      // diseasesAdd
      diseasesAdd: false
    }
  },
  methods: {
    closeModal () {
      this.modal = false;
    },
    openModal () {
      this.modal = true;
    },
    // 选中有无时候
    diseaChange (evt, item) {
      console.log('evt_', evt.detail.value);
      console.log('item_', item.status);
      item.status = evt.detail.value
      console.log('test_', test);
    },
    // deleteDiseases删除病下面的疾病
    deleteDiseases (item, diseases) {
      console.log(item, '_item_', diseases);
      item.diseases = item.diseases.filter((diseasesInfo) => {
        return diseasesInfo !== diseases
      })
    },
    // 为当前病史添加疾病
    addDiseases (item) {
      this.currentDiseases = item
      this.diseasesAdd = true
      console.log(item.diseases);

    },
    // 关闭添加疾病
    closeAdd () {
      this.diseasesAdd = false
    },
    onKeyInput: function (event) {
      console.log('event.target.value_', event.target.value);
      // this.inputValue = event.target.value
    },
    confirmInput (event) {
      console.log('event.target.value_', event.target.value);
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
    height: 330px;
    overflow: scroll;
    .contentWrap {
      height: auto;
      border-top: 1px solid #efefef;
      .contentDis {
        list-style: none;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .choose {
          display: flex;
          height: 57px;
          line-height: 57px;
          /deep/ .uni-radio-input {
            position: relative;
            top: -2px;
          }
        }
      }
      .diseases {
        height: auto;
        width: auto;
        justify-content: flex-start;
        padding-bottom: 15px;
        .diseasesItem {
          position: relative;
          width: auto;
          margin-top: 10px;
          height: 30px;
          line-height: 30px;
          display: inline-block;
          background: rgba(242, 242, 242, 1);
          border-radius: 4px;
          margin-right: 10px;
          font-size: 12px;
          padding: 0 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(27, 27, 27, 1);
          .delete {
            position: absolute;
            top: -8px;
            font-size: 8px;
            right: 4px;
            color: #a1a1a1;
          }
        }
        .diseasesAdd {
          font-size: 18px;
          position: relative;
          top: 2px;
        }
      }
    }
  }
  .confirm {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    margin-top: 12px;
    button {
      height: 47px;
      width: 80%;
    }
    .save {
      background: #3a74f1;
    }
  }
  .contentInfo {
    text-align: center;
    padding: 0px 15px;
    input {
      margin-top: 27px;
      height: 38px;
      display: inline-block;
      width: 90%;
      background: rgba(245, 245, 245, 1);
      border-radius: 6px;
    }
  }
}
</style>