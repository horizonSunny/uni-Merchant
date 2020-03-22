<template>
  <body-wrap>
    <tob-bar slot="topBar" :styleInfo="{ backgroundColor: '#fff' }" jumpButton>
      <text slot="title" style="color:#000">处方信息</text>
    </tob-bar>
    <view slot="content" class="content">
      <view class="contentInfo">
        <view class="title">
          <text>请选择用药</text>
          <text @click="gotoNextPage('../prescription/newPatient', {})">添加</text>
        </view>
        <view class="contentWrap">
          <scroll-view scroll-x="true" class="scrollView">
            <view
              class="patient"
              :class="currentPatient === index?'active':''"
              v-for="(item, index) in getMedicineMan"
              :key="index"
              @click="selectPatient(index)"
            >
              <view class="editor">
                <view>{{item.fullName}}</view>
                <img
                  @click.stop="gotoNextPage('../prescription/newPatient', item)"
                  :src="currentPatient === index?'static/myIndent/shopping cart-editdu-sel.svg':'static/myIndent/shopping cart-editdu-nl.svg'"
                  alt
                />
              </view>
              <view>{{item.sex === 1?'先生':'女士'}}</view>
              <view>{{item.phone}}</view>
            </view>
          </scroll-view>
        </view>
        <view class="reminder">
          <text>根据国家药监局规定，购买处方药需要实名认证</text>
        </view>
      </view>
      <view class="contentInfo">
        <view class="title">
          <text>上传处方信息</text>
        </view>
        <view class="contentWrap">
          <up-img @change="imgChange($event)" :upload_count="3" :upimg_preview="preUpLoadImg"></up-img>
        </view>
        <view class="reminder">
          <text>药店药师审核，请上传正规处方（仅可上传3张）</text>
        </view>
      </view>
      <view class="confirm">
        <button type="primary" @click="confirm">完成</button>
      </view>
    </view>
  </body-wrap>
</template>
<script>
import upImg from "@/components/sunui-upimg_v2.72/components/sunui-upimg/sunui-upimg.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { upImg },
  data() {
    return {
      currentPatient: 0,
      prescriptionImg: [],
      preUpLoadImg: []
    };
  },
  computed: {
    ...mapGetters(["getMedicineMan", "getNewIndent"])
  },

  methods: {
    ...mapActions({
      getMedicineManInfo: "GetMedicineMan"
    }),
    toNewPatient() {
      this.$navTo("/pages/prescription/newPatient");
    },
    selectPatient(index) {
      this.$store.commit("REVERSE_MEDICINE_MAN", index);
    },
    // 跳转页面
    gotoNextPage(url, parameters) {
      this.$store.commit("SET_CURRENT_MEDICINE_MAN", parameters);
      this.$navTo(url, parameters);
    },
    imgChange(e) {
      console.log("e_", e);
      this.prescriptionImg = e;
    },
    confirm() {
      console.log("this.prescriptionImg_", this.prescriptionImg);
      // 处方填写完毕,收货人选择收货人列表第一个，只需要把处方图片传递当前订单 ADD_INDENT
      this.$store.commit("ADD_INDENT", {
        prescription: {
          prescriptionImg: this.prescriptionImg,
          prescriptionMan: this.getMedicineMan[0]
        }
      });
      uni.navigateBack();
    },
    // 生成之前上传的图片
    preUpLoadImgActive() {
      let preUpLoadImgInfo = [];
      if (
        this.getNewIndent.prescription &&
        this.getNewIndent.prescription.length !== 0
      ) {
        this.getNewIndent.prescription.prescriptionImg.forEach(element => {
          preUpLoadImgInfo.push({
            path: element
          });
        });
      }
      return preUpLoadImgInfo;
    }
  },
  onShow() {
    console.log(213);
    console.log("invoice_prescribInfo_", this.getNewIndent);
    // this.getMedicineManInfo();
    this.preUpLoadImg = this.preUpLoadImgActive();
  }
};
</script>
<style lang="scss">
.content {
  position: relative;
  .contentInfo {
    border-top: 1px solid #d4d4d4;
    height: 155px;
    // width: 100%;
    padding: 13px 15px;
    .title {
      display: flex;
      justify-content: space-between;
      height: 21px;
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(39, 39, 39, 1);
      line-height: 21px;
      text:nth-child(2) {
        color: rgba(27, 27, 27, 1);
        // color: red
      }
    }
    .contentWrap {
      height: 116px;
      .scrollView {
        white-space: nowrap;
        width: 100%;
        height: 100%;
        .patient {
          margin-top: 20px;
          margin-right: 12px;
          display: inline-block;
          width: 116px;
          height: 78px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.08);
          border-radius: 4px;
          padding: 7px 10px;
          view {
            height: 27px;
            line-height: 27px;
          }
          .editor {
            display: flex;
            justify-content: space-between;
          }
        }
        .active {
          color: rgba(250, 73, 73, 1);
          background: rgba(255, 233, 236, 1);
        }
      }
    }
    .reminder {
      height: 17px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(137, 137, 137, 1);
      line-height: 17px;
    }
  }
  .confirm {
    button {
      width: 80%;
      left: 50%;
      margin-left: -40%;
      position: absolute;
      bottom: 20px;
    }
  }
  .contentInfo:nth-child(2) {
    border-bottom: 1px solid #d4d4d4;
  }
}
</style>