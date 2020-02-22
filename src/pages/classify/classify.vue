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
    this.$http.get("luckin/getMenuList").then(res => {
      this.categoryList = res.data;
      this.menuList = res.data.map(item => {
        return item.classifyName;
      });
      this.activeSelected = this.menuList[0];
    });
    console.log("this.categoryList _", this.categoryList);
  },

  methods: {
    change(e) {
      this.current = e.detail.current;
    }
  }
};
</script>
<style lang="scss" scoped></style>
