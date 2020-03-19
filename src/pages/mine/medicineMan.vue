<template>
  <body-wrap>
    <tob-bar
      slot="topBar"
      :styleInfo="{ backgroundColor: '#fff' }"
      jumpButton=""
    >
      <text slot="title" style="color:#000">用药人</text>
    </tob-bar>
    <view slot="content" class="content">
      <view class="userInfo" v-for="(item, index) in userInfo" :key="index">
        <view class="userMessage">
          <text class="name">王慧</text>
          <text class="sex">女 </text>
          <text class="sex">57岁</text>
          <text class="sex">136****7856</text>
          <text class="label">默认</text>
        </view>
        <view @click="editor" class="editor">编辑</view>
      </view>
    </view>
  </body-wrap>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      userInfo: [{

      }, {}, {}]
    }
  },
  computed: {
    ...mapGetters(['getMedicineMan'])
  },
  methods: {
    ...mapActions({
      getMedicineManInfo: 'GetMedicineMan'
    }),
    editor (item) { }
  },
  onLoad (option) {
    this.getMedicineManInfo()
    setTimeout(() => {
      console.log('this.getMedicineMan_', this.getMedicineMan);
    }, 0);
  }
}
</script>
<style lang="scss">
.content {
  padding: 0px 10px;
  background: #f3f3f5;
  .userInfo {
    height: 60px;
    line-height: 60px;
    background: #fff;
    margin-top: 10px;
    display: flex;
    padding: 0px 15px;
    align-items: center;
    justify-content: space-between;
    .userMessage {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .name {
        height: 21px;
        font-size: 15px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(27, 27, 27, 1);
        line-height: 21px;
        margin-right: 27px;
      }
      .sex {
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(27, 27, 27, 1);
        line-height: 20px;
        margin-right: 8px;
      }
      .label {
        height: 16px;
        line-height: 16px;
        width: 30px;
        background: #d3e0fe;
        color: #3d76e7;
        font-size: 8px;
        text-align: center;
        border: 4px;
      }
    }
    .editor {
      width: 50px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      border-radius: 10px;
      border: 1px solid rgba(137, 137, 137, 1);
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(137, 137, 137, 1);
    }
  }
}
</style>