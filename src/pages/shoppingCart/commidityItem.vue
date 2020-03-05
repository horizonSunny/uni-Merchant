<template>
  <checkbox-group @change="checkboxChange">
    <label
      class="uni-list-cell uni-list-cell-pd"
      v-for="item in items"
      :key="item.value"
    >
      <uni-swipe-action>
        <uni-swipe-action-item
          :options="options"
          @click="onClick"
          @change="change"
        >
          <view class="commidityInfo">
            <checkbox
              :value="item.value"
              :checked="item.checked"
              color="#FFCC33"
            />
          </view>
        </uni-swipe-action-item>
      </uni-swipe-action>
    </label>
  </checkbox-group>
</template>
<script>
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
export default {
  components: {
    uniSwipeAction,
    uniSwipeActionItem
  },
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
      items: [{
        value: 'USA',
        name: '美国'
      },
      {
        value: 'CHN',
        name: '中国',
        checked: 'true'
      }
      ],
      options: [
        {
          text: '移入收藏',
          style: {
            backgroundColor: '#F4AF02',
            width: '50px',
            textWidth: "30px",
            fontSize: '15px'
          }
        }, {
          text: '删除',
          style: {
            backgroundColor: '#E60B35',
            width: '50px',
            textWidth: "30px",
            fontSize: '15px'
          }
        }
      ]
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
    onClick (e) {
      console.log('当前点击的是第' + e.index + '个按钮，点击内容是' + e.content.text)
    },
    change (open) {
      console.log('当前开启状态：' + open)
    }
  }
}
</script>
<style lang="scss" scoped>
// 改变组件样式
/deep/ .uni-checkbox-input {
  border-radius: 11px;
}
.commidityInfo {
  height: 116px;
  width: 100%;
  background: yellow;
  padding: 15px 14px;
}
.cont {
  height: 100px;
  width: 100%;
}
</style>