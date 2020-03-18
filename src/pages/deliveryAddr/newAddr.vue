<template>
  <body-wrap>
    <tob-bar
      slot="topBar"
      :styleInfo="{ backgroundColor: '#fff' }"
      jumpButton=""
    >
      <text slot="title" style="color:#000">{{
        this.operate === "reset" ? "编辑收货地址" : "新增收货地址"
      }}</text>
    </tob-bar>
    <view slot="content" class="content">
      <view>
        <form class="form">
          <view class="labelInfo">
            <span>收货人</span>
            <input
              name="fullName"
              type="text"
              placeholder="请填写真实姓名"
              v-model="userInfo['fullName']"
            />
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
            <span>性别</span>
            <radio-group @change="sexChange">
              <view class="sexSel">
                <label
                  v-for="item in items"
                  :key="item.value"
                  style="margin-right:20px;"
                >
                  <view>
                    <radio
                      :value="item.value"
                      :checked="item.value == currentSex"
                    />{{ item.name }}
                  </view>
                </label>
              </view>
            </radio-group>
          </view>
          <view class="labelInfo">
            <span>所在地区</span>
            <input
              type="text"
              name="userAddress"
              placeholder="点击选择地区"
              placeholder-class="placeholder-class"
              disabled
              :value="userInfo['userAddress']"
              @click="selectArea"
            />
          </view>
          <view class="labelInfo textarea">
            <span class="textarea_span">详细地址</span>
            <textarea
              type="text"
              name="address"
              placeholder="如道路、门牌号、小区"
              rows="3"
              cols="4"
              :value="userInfo['address']"
              @input="inputAreaDetail"
            />
          </view>
          <view class="labelInfo">
            <span>标签</span>
            <view class="addrLabel">
              <text
                @click="selectLabel(item)"
                v-for="(item, index) in labelInfo"
                :key="index"
                :class="currentLabel === item ? 'active' : ''"
                >{{ item }}</text
              >
            </view>
          </view>
          <view class="labelInfo default">
            <span>设置为默认地址</span>
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
            保存地址
          </button>
          <button
            type="primary"
            :class="deleteActive ? 'deleteActive' : 'delete'"
            @click="deleteAddress"
          >
            删除地址
          </button>
        </view>
        <w-picker
          mode="region"
          :defaultVal="pickerDefault"
          @confirm="onConfirmArea"
          ref="region"
          themeColor="#f00"
        >
        </w-picker>
      </view>
    </view>
    <!-- <view slot="content" class="content">
        <form @submit="formSubmit" @reset="formReset">
          <view class="uni-form-item uni-column">
            <view class="title">switch</view>
            <view>
              <switch name="switch" />
            </view>
          </view>
          <view class="uni-form-item uni-column">
            <view class="title">radio</view>
            <radio-group name="radio">
              <label> <radio value="radio1" /><text>选项一</text> </label>
              <label> <radio value="radio2" /><text>选项二</text> </label>
            </radio-group>
          </view>
          <view class="uni-form-item uni-column">
            <view class="title">checkbox</view>
            <checkbox-group name="checkbox">
              <label> <checkbox value="checkbox1" /><text>选项一</text> </label>
              <label> <checkbox value="checkbox2" /><text>选项二</text> </label>
            </checkbox-group>
          </view>
          <view class="uni-form-item uni-column">
            <view class="title">slider</view>
            <slider value="50" name="slider" show-value></slider>
          </view>
          <view class="uni-form-item uni-column">
            <view class="title">input</view>
            <input
              class="uni-input"
              name="input"
              placeholder="这是一个输入框"
            />
          </view>
          <view class="uni-btn-v">
            <button form-type="submit">Submit</button>
            <button type="default" form-type="reset">Reset</button>
          </view>
        </form>
      </view> -->
  </body-wrap>
</template>
<script>
// import wPicker from "@/components/w-picker/components/w-picker/w-picker.vue";
import wPicker from '@/components/w-picker_1.2.7/components/w-picker/w-picker.vue'
import { mapActions, mapGetters } from 'vuex'
import validate from '@/utils/validate'
import { newAddress, updateAddress, addressDelete } from '@/service/index'
export default {
  components: {
    wPicker
  },
  data () {
    return {
      userInfo: {
        fullName: '',
        phone: '',
        userAddress: '',
        address: '',
        province: '',
        city: '',
        area: '',
        defaultInfo: false
      },
      pickerDefault: ['浙江省', '杭州市', '滨江区'],
      //是新增还是更新
      operate: 'add',
      deleteActive: false,
      // 性别
      currentSex: 1,
      items: [
        { value: '1', name: '男士' },
        { value: '2', name: '女士' }
      ],
      currentLabel: '公司',
      labelInfo: ['公司', '家', '学校']
    }
  },
  computed: {
    ...mapGetters(['getAddress'])
  },
  methods: {
    ...mapActions({
      getAddressInfo: 'GetAddressInfo'
    }),
    submit () {
      console.log('address_', this.userInfo.address)
      let formRules = [
        { name: 'fullName', type: 'required', errmsg: '请填写用户名' },
        {
          name: 'phone',
          required: true,
          type: 'phone',
          errmsg: '请输入正确的手机号'
        },
        { name: 'userAddress', type: 'required', errmsg: '请选择地址' },
        {
          name: 'address',
          type: 'required',
          errmsg: '请填写详细地址信息'
        }
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
      info['addressInfo']['isDefault'] = info['addressInfo']['defaultInfo']
        ? 1
        : 2
      info['addressInfo']['sex'] = Number(this.currentSex)
      info['addressInfo']['addressLabel'] = this.currentLabel
      info['addressInfo']['houseNumber'] = '删除'
      if (info['addressInfo']['addressId']) {
        info['addressInfo']['addressId'] = parseInt(
          info['addressInfo']['addressId']
        )
      }
      if (this.operate === 'add') {
        newAddress(info['addressInfo']).then(res => {
          uni.navigateBack()
        })
      } else if (this.operate = 'reset') {
        updateAddress(info['addressInfo']).then(res => {
          uni.navigateBack()
        })
      }
    },
    // 删除收获地址
    deleteAddress () {
      if (!this.deleteActive) {
        return
      }
      addressDelete(this.userInfo.addressId).then(res => {
        uni.navigateBack()
      })
    },
    selectArea () {
      this.$refs['region'].show()
    },
    inputAreaDetail (event) {
      setTimeout(() => {
        this.userInfo.address = event.detail.value
      }, 0)
    },
    onConfirmArea (val) {
      this.userInfo.userAddress = val.result
      this.userInfo.province = val.checkArr[0]
      this.userInfo.city = val.checkArr[1]
      this.userInfo.area = val.checkArr[2]
      console.log('val_', val)
    },
    changeDefaultInfo (event) {
      console.log('event.detail.value_', event.detail.value)
      this.userInfo.defaultInfo = event.detail.value
    },
    // sexChange
    sexChange (e) {
      this.currentSex = e.detail.value
      console.log(this.currentSex)
    },
    //selectLabel
    selectLabel (e) {
      this.currentLabel = e
      console.log(e)
    }
  },
  onLoad: function (optionInfo) {
    const option = this.getAddress.find(item => {
      return item.addressId == optionInfo.addressId
    })

    if (JSON.stringify(option) !== '{}') {
      this.operate = 'reset'
      //赋值
      this.userInfo['fullName'] = option['fullName']
      this.userInfo['phone'] = option['phone']
      this.userInfo['userAddress'] =
        option['province'] + option['city'] + option['area']
      this.userInfo['address'] = option['address']
      this.userInfo['defaultInfo'] = option['isDefault'] == 2 ? false : true
      this.userInfo['province'] = option['province']
      this.userInfo['city'] = option['city']
      this.userInfo['area'] = option['area']

      this.currentLabel = option['addressLabel']
      this.currentSex = option['sex']
      this.pickerDefault = [option['province'], option['city'], option['area']]
      this.$set(this.userInfo, 'addressId', option['addressId'])
      this.deleteActive = true
    }
  },
  beforeDestroy: function (optionInfo) {
    this.getAddressInfo()
  }
}
</script>
<style lang="scss">
.content {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #e5e5e5;
  background: #fff;
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
      display: flex;
      span {
        width: 105px;
        font-size: 17px;
        color: #282828;
        letter-spacing: 0;
      }
      input {
        height: 57px;
        line-height: 57px;
        flex: 1;
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
      line-height: 47px;
      width: 80%;
      font-size: 16px;
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
