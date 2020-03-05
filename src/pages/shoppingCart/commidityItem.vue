<template>
  <checkbox-group @change="checkboxChange">
    <view
      class="uni-list-cell uni-list-cell-pd"
      v-for="item in items"
      :key="item.value"
    >
      <scroll-view
        scroll-x="true"
        style="white-space: nowrap;"
        @scroll="scroll"
      >
        <!-- <checkbox :value="item.value" :checked="item.checked" />
        <view>{{ item.name }}</view> -->
        <view class="test">
          <view class="test1"></view>
          <view class="test2"></view>
        </view>
      </scroll-view>
    </view>
    <!-- <view>{{ item.name }}</view> -->
  </checkbox-group>
</template>
<script>
export default {
  created () {
    uni.getSystemInfo({
      success: function (res) {
        this.windowWidth = res.windowWidth
        this.windowHeight = res.windowHeight
        console.log('this.windowWidth_', this.windowWidth, this.windowHeight);

      }
    })
  },
  data () {
    return {
      title: 'checkbox 复选框',
      items: [{
        value: 'USA',
        name: '美国'
      }
      ],
      scrollTop: 0,
      windowWidth: 0,
      windowHeight: 0
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
  height: 100px;
  white-space: nowrap;
  overflow-y: hidden;
  .test1 {
    display: inline-block;
    width: 100%;
    height: 100px;
    background: yellow;
  }
  .test2 {
    display: inline-block;
    width: 20%;
    height: 100px;
    background: green;
  }
}
.test::-webkit-scrollbar {
  width: 0;
}
</style>