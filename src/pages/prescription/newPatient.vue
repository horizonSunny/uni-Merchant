<template>
  <body-wrap>
    <tob-bar
      slot="topBar"
      :styleInfo="{ backgroundColor: '#fff' }"
      jumpButton=""
    >
      <text slot="title" style="color:#000">{{
        operate === "reset" ? "编辑用药人" : "新增用药人"
      }}</text>
    </tob-bar>
    <view slot="content" class="content">
      <view>
        <form class="form">
          <view class="labelInfo">
            <span :style="{ color: disabledInfo ? '#898989' : '' }"
              >用药人姓名</span
            >
            <input
              :style="{ color: disabledInfo ? '#898989' : '' }"
              name="fullName"
              type="text"
              :disabled="disabledInfo"
              placeholder="请填写用药人真实姓名"
              v-model="userInfo['fullName']"
            />
          </view>
          <view class="labelInfo">
            <span :style="{ color: disabledInfo ? '#898989' : '' }"
              >身份证号</span
            >
            <input
              :style="{ color: disabledInfo ? '#898989' : '' }"
              name="idCard"
              type="text"
              :disabled="disabledInfo"
              placeholder="请输入用药人身份证号码"
              v-model="userInfo['idCard']"
              maxlength="18"
            />
          </view>
          <view class="labelInfo">
            <span style="color:#898989">出生年月</span>
            <!-- <span>
              {{ birthDate }}
            </span> -->
            <input
              style="color:#898989"
              type="text"
              name="birthday"
              disabled="true"
              placeholder="选择出生年月"
              placeholder-class="placeholder-class"
              :value="birthDate"
            />
          </view>
          <view class="labelInfo">
            <span style="color:#898989">性别</span>
            <radio-group @change="sexChange" :disabled="disabledInfo">
              <view class="sexSel">
                <label
                  v-for="(item, index) in items"
                  :key="item.value"
                  style="margin-right:20px;"
                  disabled="true"
                >
                  <view>
                    <radio
                      disabled="true"
                      :value="item.value"
                      :checked="item.value == sexInfo"
                    />
                    <text style="color:#898989">
                      {{ item.name }}
                    </text>
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
          <view class="labelInfo" style="height:auto;">
            <span>疾病史</span>
            <view
              v-if="templateDiseaseInfo && templateDiseaseInfo.length > 0"
              style="width:70%;line-height:20px;padding:15px 0px"
            >
              <view
                v-for="(item, index) of templateDiseaseInfo"
                :key="index"
                style=" 
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;"
                >{{ item.medicineName }}: {{ item.diseases }}
              </view>
            </view>
            <input
              name="phone"
              type="text"
              disabled="true"
              placeholder="无肝肾异常、过敏史、妊娠"
              maxlength="11"
              v-else
            />
            <img
              src="static/icon/main/home_right-2.svg"
              alt=""
              style="margin-top:22px;height:13px"
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
      <diseasesHistory
        ref="diseasesHistory"
        :templateInfo="templateInfo"
        @diseasesConfirm="diseasesConfirm"
      ></diseasesHistory>
    </view>
  </body-wrap>
</template>
<script>
import wPicker from "@/components/w-picker_1.2.7/components/w-picker/w-picker.vue";
import validate from '@/utils/validate'
import diseasesHistory from './diseasesHistory'
import { mapActions, mapGetters } from "vuex"
import deepCopy from '@/utils/deepCopy'
import { updateMedicineMan, newMedicineMan, medicineManDelete } from '@/service/index'
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
        birthday: '',
        idCard: '',
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
      ],
      // 用于保存模版中的信息
      templateInfo: [],
      preTemplateInfo: [],
      // 用来保存初始过来的用药人的病史信息
      medicineInfo: []
    }
  },
  computed: {
    ...mapGetters(["medicineTemplate", 'getCurrentMedicineMan']),
    disabledInfo () {
      return this.operate === "reset"
    },
    templateDiseaseInfo () {
      let template = []
      this.preTemplateInfo.forEach((item) => {
        if (item.status == 1 && [1, 2, 3].indexOf(item.id) > -1) {
          item.diseases.length > 0 && template.push({
            medicineName: item.medicineName,
            diseases: item.diseases.toString()
          })
        }
        if (item.status == 1 && [4, 5, 6].indexOf(item.id) > -1) {
          template.push({
            medicineName: item.medicineName,
            diseases: '有'
          })
        }
      })
      console.log('template___', template);
      return template
    },
    birthDate () {
      if (this.userInfo['idCard'].length === 18) {
        let tmpStr = this.userInfo['idCard'].substring(6, 14);
        tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)
        this.userInfo['birthday'] = tmpStr
        return tmpStr;
      }
    },
    sexInfo () {
      if (this.userInfo['idCard'].length === 18) {
        if ((this.userInfo['idCard'].substring(16, 1)) % 2 == 1) {
          this.currentSex = 1
        } else {
          this.currentSex = 2
        }
        debugger;
        return this.currentSex
      } else {
        return 1
      }
    }
  },
  methods: {
    ...mapActions({
      getMedicineMan: 'GetMedicineMan'
    }),
    submit () {
      let formRules = [
        { name: 'fullName', type: 'required', errmsg: '请填写用户名' },
        { name: 'idCard', required: true, type: 'identityCard', errmsg: '请填写用药人正确身份证号码' },
        { name: 'phone', required: true, type: 'phone', errmsg: '请输入正确的手机号' },
        { name: 'birthday', type: 'required', errmsg: '请选择出生年月' },
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
        patientInfo: this.userInfo
      }
      info['patientInfo']['sex'] = this.currentSex;
      info['patientInfo']['isDefault'] = info['patientInfo']['defaultInfo'] ? 1 : 2
      if (info['patientInfo']['addressId']) {
        info['patientInfo']['addressId'] = parseInt(info['patientInfo']['addressId'])
      }
      console.log('patientInfo____', info);
      console.log('this.preTemplateInfo_', this.preTemplateInfo);
      const medicineInfo = this.preTemplateInfo.map((item) => {
        if (['过往病史', '过敏史', '家族病史'].indexOf(item.medicineName) > -1) {
          const judge = Number(item.status) === 1 && item.diseases.length !== 0
          if (judge) {
            return {
              id: item.id,
              labels: item.diseases
            }
          }
        } else {
          return {
            id: item.id,
            labels: []
          }
        }

      })
      const medicine = medicineInfo.filter(item => item !== undefined)
      console.log('medicineInfo_', medicine);
      info['patientInfo']['medicineInfo'] = medicine
      if (this.operate === 'reset') {
        updateMedicineMan(info['patientInfo']).then(res => { uni.navigateBack() })
      } else {
        newMedicineMan(info['patientInfo']).then(res => { uni.navigateBack() })
      }
    },
    // 删除收获地址
    deleteAddress () {
      if (!this.deleteActive) {
        return
      }
      medicineManDelete(this.getCurrentMedicineMan.medicineUserId).then(res => {
        uni.navigateBack()
      })
    },
    selectArea () {
      if (!this.disabledInfo) {
        this.$refs['date'].show();
      }

    },
    inputAreaDetail (event) {
      setTimeout(() => { this.userInfo.detailAddress = event.detail.value }, 0)
    },
    onConfirmDate (val) {
      this.userInfo.birthday = val.result
      console.log('val_', val.result);
    },
    changeDefaultInfo (event) {
      console.log('event.detail.value_', event.detail.value);
      this.userInfo.defaultInfo = event.detail.value
    },
    // sexChange
    sexChange (e) {
      console.log(e.detail.value);
      this.currentSex = e.detail.value
    },
    //selectLabel
    selectLabel (e) {
      this.currentLabel = e;
      console.log(e);

    },
    //selectLabel
    showTemplate () {
      this.templateInfo = deepCopy(this.preTemplateInfo)
      this.$refs.diseasesHistory.openModal()
    },
    //diseasesConfirm
    diseasesConfirm () {
      this.preTemplateInfo = deepCopy(this.templateInfo)
      console.log('this.preTemplateInfo_', this.preTemplateInfo);
      console.log('this.preTemplateInfo_', this.templateInfo);
    }
  },
  created () {
    console.log('medicineTemplate_', this.medicineTemplate);
    // 为了解决getter数据变化视图不更改原因
    const template = deepCopy(this.medicineTemplate)
    this.templateInfo = template.map((item) => {
      item.status = 0
      item.diseases = []
      this.medicineInfo && this.medicineInfo.length !== 0 && this.medicineInfo.forEach((medicineInfo) => {
        if (medicineInfo.id === item.id) {
          item.status = 1
          item.diseases = medicineInfo.labels
        }
      })
      return item
    })
    this.preTemplateInfo = deepCopy(this.templateInfo)
  },
  onLoad: function (option) {
    const currentMedicineMan = deepCopy(this.getCurrentMedicineMan)
    console.log('getCurrentMedicineMan_', currentMedicineMan);
    if (JSON.stringify(currentMedicineMan) !== '{}' && currentMedicineMan) {
      this.operate = 'reset'
      //赋值
      this.userInfo['medicineUserId'] = currentMedicineMan['medicineUserId']
      this.userInfo['fullName'] = currentMedicineMan['fullName']
      this.userInfo['phone'] = currentMedicineMan['phone']
      //
      this.currentSex = currentMedicineMan['sex'] + ''
      this.userInfo['defaultInfo'] = currentMedicineMan['isDefault'] == 2 ? false : true
      this.medicineInfo = currentMedicineMan['medicineInfo']
      console.log('this.medicineInfo_', this.medicineInfo);
      console.log('this.medicineInfo_', currentMedicineMan['medicineInfo']);
      this.userInfo['birthday'] = currentMedicineMan['birthday']
      this.userInfo['idCard'] = currentMedicineMan['idCard']
      this.deleteActive = true
    }
  },
  beforeDestroy: function () {
    this.getMedicineMan()
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
      border-bottom: 1px solid #f3f3f3;
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
    margin-top: 20px;
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