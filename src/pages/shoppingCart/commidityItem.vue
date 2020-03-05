<template>
  <checkbox-group @change="checkboxChange">
    <view
      class="uni-list-cell uni-list-cell-pd"
      v-for="item in items"
      :key="item.value"
    >
      <scroll-view scroll-x="true" class="test" @scroll="scroll">
        <!-- <checkbox :value="item.value" :checked="item.checked" />
        <view>{{ item.name }}</view> -->
        <text class="test1"></text>
        <text class="test2"></text>
      </scroll-view>
    </view>
    <!-- <view>{{ item.name }}</view> -->
  </checkbox-group>
</template>
<script>
export default {
  data () {
    return {
      title: 'checkbox 复选框',
      items: [{
        value: 'USA',
        name: '美国'
      }
      ],
      scrollTop: 0
    }
  },
  methods: {
    checkboxChange: function (e) {
      var items = this.items,
        values = e.detail.value;
      for (var i = 0, lenI = items.length; i < lenI; ++i) {
        const item = items[i]
        if (values.includes(item.value)) {
          this.$set(item, 'checked', true)
        } else {
          this.$set(item, 'checked', false)
        }
      }
    },
    // 设置横向滚动
    scroll () { }
  }
}
</script>
<style lang="scss" scoped>
// 改变组件样式
/deep/ .uni-checkbox-input {
  border-radius: 11px;
}
.test {
  width: 100%;
  background: red;
  height: 100px;
  .test1 {
    display: inline-block;
    width: 50%;
    height: 100px;
    background: yellow;
  }
  .test2 {
    display: inline-block;
    width: 70%;
    height: 100px;
    background: green;
  }
}
</style>