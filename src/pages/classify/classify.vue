<template>
  <view class="content"> </view>
</template>
<script>
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
    this.$store.getters.filteredList;
    console.log("this.$store.getters.classify_", this.$store.getters.classify);
  },

  methods: {
    change(e) {
      this.current = e.detail.current;
    }
  }
};
</script>
<style lang="scss" scoped></style>
