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
      <view class="userWrap">
        <view
          class="userInfo"
          v-for="(item, index) in getMedicineMan"
          :key="index"
        >
          <view class="userMessage">
            <text class="name">{{ item.fullName }}</text>
            <text class="sex">{{ item.sex === 1 ? "先生" : "女士" }}</text>
            <text class="sex">{{ calculateAge(item.birthday) }}</text>
            <text class="sex">{{ item.phone }}</text>
            <text class="label" v-if="item.isDefault === 1">{{
              item.isDefault === 1 ? "默认" : ""
            }}</text>
          </view>
          <view
            class="editor"
            @click="gotoNextPage('../prescription/newPatient', item)"
            >编辑</view
          >
        </view>
      </view>
      <view class="newMan">
        <button
          type="primary"
          @click="gotoNextPage('../prescription/newPatient', {})"
        >
          新增用药人
        </button>
      </view>
    </view>
  </body-wrap>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { getDate, timeChangetype, formatDate } from '@/utils/date'
export default {
  data () {
    return {
      userInfo: [{}, {}]
    }
  },
  computed: {
    ...mapGetters(['getMedicineMan']),
    calculateAge: function () {
      return function (birthday) {
        console.log('birthday_', birthday);
        const info = getDate(birthday)
        const time = Date.parse(new Date()) - timeChangetype(info)
        const age = time / (365 * 24 * 60 * 60 * 1000)
        return parseInt(age) + '岁'
      }
    }
  },
  methods: {
    ...mapActions({
      getMedicineManInfo: 'GetMedicineMan'
    }),
    // 跳转页面
    gotoNextPage (url, parameters) {
      this.$store.commit('SET_CURRENT_MEDICINE_MAN', parameters)
      this.$navTo(url, parameters);
    },
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
  display: flex;
  overflow: hidden;
  flex-direction: column;
  .userWrap {
    width: 100%;
    background: #f3f3f5;
    flex: 1;
    overflow: scroll;
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
          height: 20px;
          width: 50px;
          font-size: 14px;
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
  .newMan {
    width: 100%;
    height: 80px;
    line-height: 80px;
    display: flex;
    align-items: center;
    button {
      width: 100%;
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>