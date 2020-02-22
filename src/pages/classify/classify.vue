<template>
  <view class="content"> </view>
</template>
<script>
import { mapActions } from "vuex";
export default {
  components: {
    // menuModal
  },
  data() {
    return {
      categoryList: [],
      menuList: []
    };
  },
  onLoad() {
    // this.getClassify();
    console.log("this.$store_", this.$store);

    this.$store.dispatch("GetClassify").then(() => {
      console.log(
        "this.$store.getters.classify_",
        this.$store.getters.classify
      );
    });
  },

  methods: {
    ...mapActions({
      getClassify: "GetClassify" // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    }),
    change(e) {
      this.current = e.detail.current;
    }
  }
};
</script>
<style lang="scss" scoped></style>
