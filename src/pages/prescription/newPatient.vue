<template>
  <body-wrap>
    <tob-bar
      slot="topBar"
      :styleInfo="{ backgroundColor: '#fff' }"
      jumpButton=""
    >
      <text slot="title" style="color:#000">新增用药人</text>
    </tob-bar>
    <view slot="content" class="content">
      <view>
        <form class="form">
          <view class="labelInfo">
            <span>用药人姓名</span>
            <input
              name="fullName"
              type="text"
              placeholder="请填写用药人真实姓名"
              v-model="userInfo['fullName']"
            />
          </view>
          <view class="labelInfo">
            <span>身份证号</span>
            <input
              name="identityCard"
              type="text"
              placeholder="请输入用药人身份证号码"
              v-model="userInfo['identityCard']"
              maxlength="18"
            />
          </view>
          <view class="labelInfo">
            <span>出生年月</span>
            <input
              type="text"
              name="userBirthday"
              placeholder="选择出生年月"
              placeholder-class="placeholder-class"
              disabled
              :value="userInfo['userBirthday']"
              @click="selectArea"
            />
          </view>
          <view class="labelInfo">
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
          <view class="labelInfo">
            <span>手机号码</span>
            <input
              name="phone"
              type="text"
              placeholder="请填写手机号码"
              v-model="userInfo['phone']"
              maxlength="11"
            />
          </view>
          <view class="labelInfo">
            <span>疾病史</span>
            <input
              name="phone"
              type="text"
              disabled="true"
              placeholder="无肝肾异常、过敏史、妊娠"
              v-model="userInfo['phone']"
              maxlength="11"
            />
            <img
              src="static/icon/main/home_right-2.svg"
              alt=""
              @click="showTemplate"
            />
          </view>
          <view class="labelInfo default">
            <span>设置为默认用药人</span>
            <view class="uni-list-cell uni-list-cell-pd">
              <switch
                :checked="userInfo['defaultInfo']"
                @change="changeDefaultInfo"
              />
            </view>
          </view>
        </form>
        <view class="confirm">
          <button type="primary" class="save" @click="submit">
            保存并使用
          </button>
          <button
            type="primary"
            :class="deleteActive ? 'deleteActive' : 'delete'"
            @click="deleteAddress"
          >
            删除用药人
          </button>
        </view>
        <w-picker
          mode="date"
          startDate="2017"
          endYear="2030"
          :defaultVal="pickerDefault"
          @confirm="onConfirmDate"
          ref="date"
          themeColor="#f00"
        >
        </w-picker>
      </view>
      <diseasesHistory v-if="diseasesShow"></diseasesHistory>
    </view>
  </body-wrap>
</template>
<script>
import wPicker from "@/components/w-picker_1.2.7/components/w-picker/w-picker.vue";
import validate from '@/utils/validate'
import diseasesHistory from './diseasesHistory'
export default {
  components: {
    wPicker,
    diseasesHistory
  },
  data () {
    return {
      userInfo: {
        fullName: '',
        phone: '',
        userBirthday: '',
        identityCard: '',
        defaultInfo: false,
      },
      pickerDefault: '2017-10-30',
      //是新增还是更新
      operate: 'add',
      deleteActive: false,
      // 性别
      currentSex: '1',
      items: [
        { value: '1', name: "男士" },
        { value: '2', name: "女士" }
      ]
    }
  },
  computed: {},
  methods: {
    submit () {
      let formRules = [
        { name: 'fullName', type: 'required', errmsg: '请填写用户名' },
        { name: 'identityCard', required: true, type: 'identityCard', errmsg: '请填写用药人正确身份证号码' },
        { name: 'phone', required: true, type: 'phone', errmsg: '请输入正确的手机号' },
        { name: 'userBirthday', type: 'required', errmsg: '请选择出生年月' },
      ]
      let valLoginRes = validate.validate(this.userInfo, formRules)
      if (!valLoginRes.isOk) {
        uni.showToast({
          icon: 'none',
          title: valLoginRes.errmsg
        })
        return false
      }
      const info = {
        operate: this.operate,
        addressInfo: this.userInfo
      }
      info['addressInfo']['isDefault'] = info['addressInfo']['defaultInfo'] ? 1 : 0
      if (info['addressInfo']['addressId']) {
        info['addressInfo']['addressId'] = parseInt(info['addressInfo']['addressId'])
      }
      console.log('addressInfo____', info);
      this.$store.dispatch('setCustAdd', info).then((res) => { })
    },
    // 删除收获地址
    deleteAddress () {
      if (!this.deleteActive) {
        return
      }
      let url = 'patient/address/' + this.userInfo.addressId
      this.$http.delete(url).then((res) => {
        this.$store.dispatch('getCustAdd').then((res) => {
          // 如果删除的是选中地址，store要清空
          if (this.$store.getters.getCustSelectedAddress) {
            const hasSelected = this.$store.getters.getCustSelectedAddress
            if (parseInt(this.userInfo.addressId) === parseInt(hasSelected.addressId)) {
              console.log('this.userInfo.addressId === hasSelected.addressId')
              this.$store.commit('DELETE_SELECTCUST')
            }
          }
          uni.navigateBack()
        })
      })
    },
    selectArea () {
      this.$refs['date'].show();
    },
    inputAreaDetail (event) {
      setTimeout(() => { this.userInfo.detailAddress = event.detail.value }, 0)
    },
    onConfirmDate (val) {
      // this.userInfo.userBirthday = val.result
      // this.userInfo.province = val.checkArr[0]
      // this.userInfo.city = val.checkArr[1]
      // this.userInfo.area = val.checkArr[2]
      this.userInfo.userBirthday = val.result
      console.log('val_', val.result);
    },
    changeDefaultInfo (event) {
      console.log('event.detail.value_', event.detail.value);
      this.userInfo.defaultInfo = event.detail.value
    },
    // sexChange
    sexChange () { },
    //selectLabel
    selectLabel (e) {
      this.currentLabel = e;
      console.log(e);

    },
    //selectLabel
    showTemplate () {
      this.diseasesShow = !this.diseasesShow
    }
  },
  onLoad: function (option) {
    console.log('option_', option)
    if (JSON.stringify(option) !== '{}') {
      this.operate = 'reset'
      //赋值
      this.userInfo['fullName'] = option['fullName']
      this.userInfo['phone'] = option['phone']
      // this.userInfo['userBirthday'] = option['province'] + option['city'] + option['area']
      // this.userInfo['detailAddress'] = option['detailAddress']
      // this.userInfo['defaultInfo'] = option['isDefault'] == 0 ? false : true
      // this.userInfo['province'] = option['province']
      // this.userInfo['city'] = option['city']
      // this.userInfo['area'] = option['area']

      // this.pickerDefault = [option['province'], option['city'], option['area']]
      this.$set(this.userInfo, 'addressId', option['addressId'])
      this.deleteActive = true
    }
  }
}
</script>
<style lang="scss">
.content {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-top: 1px solid #f3f3f3;
  .form {
    border: 1px solid #f3f3f3;
    border-style: solid none;
    background: #fff;
    .labelInfo {
      width: auto;
      height: 57px;
      line-height: 57px;
      padding: 0px 15px;
      border-bottom: 1px solid #f3f3f3;
      font-size: 14px;
      display: flex;
      span {
        width: 105px;
        // display: inline-block;
        // width: 30%;
        font-size: 14px;
        color: #282828;
        letter-spacing: 0;
      }
      input {
        height: 57px;
        line-height: 57px;
        text-overflow: ellipsis;
      }
      /deep/ uni-input {
        // width: 80%;
        width: 70%;
        font-size: 14px;
      }
      .placeholder-class {
        font-size: 18px;
        color: #dbdbdb;
      }
      .sexSel {
        display: flex;
        height: 57px;
        line-height: 57px;
        /deep/ .uni-radio-input {
          position: relative;
          top: -2px;
        }
      }
      .addrLabel {
        text {
          display: inline-block;
          border: 1px solid rgba(223, 223, 223, 1);
          height: 18px;
          border-radius: 2px;
          line-height: 18px;
          width: 36px;
          margin-right: 16px;
          text-align: center;
          font-size: 13px;
        }
        .active {
          border: 1px solid #5d9dff;
          background: rgba(233, 240, 255, 1);
          color: #5d9dff;
        }
      }
    }
    .textarea {
      height: 127px;
      display: flex;
      .textarea_span {
        width: 105px;
        font-size: 18px;
        color: #282828;
        letter-spacing: 0;
        // display: inline-block;
        // vertical-align: middle;
      }
      textarea {
        flex: 1;
        resize: none;
        line-height: 25px;
        overflow: scroll;
        height: 109px;
        padding-top: 18px;

        // vertical-align: middle;
      }
    }
    .default {
      display: flex;
      border-bottom: 0px;
      justify-content: space-between;
      span {
        width: 150px;
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
    .delete {
      margin-top: 13px;
      background: #c0c0c0;
    }
    .deleteActive {
      margin-top: 13px;
      background: #e90a0a;
    }
  }
}
</style>