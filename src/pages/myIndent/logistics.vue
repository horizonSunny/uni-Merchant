<template>
  <body-wrap>
    <tob-bar slot="topBar" :styleInfo="{ backgroundColor: '#fff' }" jumpButton>
      <text slot="title" style="color:#000">物流信息</text>
    </tob-bar>
    <view slot="content" class="content">
      <view>
        <view>{{ getTracesStatus }}</view>
        <view>承运公司：{{ getTracesShipper }}</view>
        <view>运单编号：{{ getTraces.logisticCode }}</view>
        <view>发货时间：{{ deliveryTime }}</view>
      </view>
      <view style="overflow:scroll">
        <evan-steps>
          <evan-step
            v-for="(item, index) in getTracesInfo"
            :key="index"
            icon="circle-filled"
            :title="item['acceptStation']"
            :description="item['acceptTime']"
          ></evan-step>
        </evan-steps>
      </view>
    </view>
  </body-wrap>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { getDate, timeChangetype, formatDate } from "@/utils/date";
import evanSteps from "@/components/steps/evan-steps/evan-steps.vue";
import evanStep from "@/components/steps/evan-steps/evan-step.vue";
export default {
  data () {
    return {
    };
  },
  components: { evanSteps, evanStep },
  computed: {
    ...mapGetters(["getShipper", 'getTraces', 'deliveryTime']),
    getTracesShipper () {
      let shipper = this.getShipper.find((item) => {
        return item.shipperCode === this.getTraces.shipperCode
      })
      return shipper ? shipper.shipperName : "暂无快递公司"
    },
    getTracesStatus () {
      let result
      switch (this.getTraces.state) {
        case '0':
          result = '无轨迹'
          break;
        case '1':
          result = '已揽收'
          break;
        case '2':
          result = '在途中'
          break;
        case '3':
          result = '已签收'
          break;
        case '4':
          result = '问题件'
          break;
        default:
          result = '无轨迹'
          break;
      }
      return result
    },
    getTracesInfo () {
      return this.getTraces['traces'].reverse()
    }
  },
  methods: {
    ...mapActions({
      // getMedicineManInfo: "GetMedicineMan"
    }),
    // 跳转页面
    // gotoNextPage (url, parameters) {
    //   this.$store.commit("SET_CURRENT_MEDICINE_MAN", parameters);
    //   this.$navTo(url);
    // }
  },
  onLoad (option) {
    // this.getMedicineManInfo();
    // setTimeout(() => {
    //   console.log("this.getMedicineMan_", this.getMedicineMan);
    // }, 0);
  }
};
</script>
<style lang="scss">
.content {
  padding: 0px 10px;
  background: #f3f3f5;
  display: flex;
  overflow: hidden;
  flex-direction: column;
}
</style>