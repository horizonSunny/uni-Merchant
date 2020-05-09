<template>
  <body-wrap>
    <tob-bar slot="topBar" :styleInfo="{ backgroundColor: '#fff' }" jumpButton>
      <text slot="title" style="color:#000">物流信息</text>
    </tob-bar>
    <view slot="content" class="content">
      <div></div>
      <div></div>
    </view>
  </body-wrap>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { getDate, timeChangetype, formatDate } from "@/utils/date";
export default {
  data () {
    return {
      userInfo: [{}, {}]
    };
  },
  computed: {
    ...mapGetters(["getMedicineMan"]),
  },
  methods: {
    ...mapActions({
      getMedicineManInfo: "GetMedicineMan"
    }),
    // 跳转页面
    gotoNextPage (url, parameters) {
      this.$store.commit("SET_CURRENT_MEDICINE_MAN", parameters);
      this.$navTo(url);
    }
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