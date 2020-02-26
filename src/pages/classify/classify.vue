<template>
  <view class="content">
    <view class="siderBar">
      <scroll-view class="scroll-view" scroll-y>
        <view
          class="firstClassify"
          v-for="(item, index) in classify"
          :class="{ active: index === tabCurrentIndex }"
          :key="index"
          @click="selectBar(item, index)"
          >{{ item.cateName }}</view
        >
      </scroll-view>
    </view>
    <view class="classifyContent">
      <scroll-view class="scroll-view" scroll-y>
        <view
          class="sencondWrap"
          v-for="(secItem, secIndex) in currentClassify"
          :key="secIndex"
        >
          <view class="sencondTitle">{{ secItem.cateName }}</view>
          <view class="threeWrap">
            <view
              v-for="(thrItem, thrIndex) in secItem.children"
              :key="thrIndex"
              class="threeClassify"
              @click="toClassify(thrItem)"
            >
              <img :src="thrItem.pic" alt />
              {{ thrItem.cateName }}
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    // menuModal
  },
  onNavigationBarButtonTap (item) {
    // 这边绑定是该页面topBar上面的两个button事件
    console.log("index_search_", item.index);
    uni.navigateTo({
      url: "../search/search"
    });
  },
  data () {
    return {
      tabCurrentIndex: 0,
      currentClassify: []
    };
  },
  onLoad () {
    // console.log("this.$store_", this.$store);
    this.getClassify().then(res => {
      this.currentClassify = res[0]["children"];
    });
  },
  computed: {
    ...mapGetters(["classify"])
  },
  methods: {
    ...mapActions({
      getClassify: "GetClassify" // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    }),
    change (e) {
      this.current = e.detail.current;
    },
    selectBar (item, index) {
      this.tabCurrentIndex = index;
      this.currentClassify = item.children;
    },
    // 跳转三级分类页面
    toClassify (item) {
      console.log('item_', item);
      uni.navigateTo({
        url: "../classify/classifyDetails?categoryId=" + item.id
      });
    }
  }
};
</script>
<style lang="scss">
uni-page-body {
  height: 100%;
}
.content {
  display: flex;
  flex-direction: row;
  border-top: 1px solid #d4d4d4;
  height: 100%;
  width: 100%;
  background: #fff;
  .siderBar {
    width: 25%;
    text-align: center;
    .firstClassify {
      margin-top: 26px;
      display: inline-block;
      text-align: center;
      width: 85%;
      border-radius: 13px;
      height: 26px;
      line-height: 26px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
    }
    .active {
      background: #3a74f1;
      color: #fff;
    }
  }
  .classifyContent {
    width: 75%;
    flex: 1;
    border-left: 1px solid #e3e3e3;
    .sencondWrap {
      padding: 5px 14px;
      border-bottom: 1px solid #e3e3e3;
      .sencondTitle {
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(27, 27, 27, 1);
        line-height: 20px;
        margin-top: 17px;
        margin-bottom: 7px;
      }
      .threeWrap {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-around;
        .threeClassify {
          width: 33%;
          font-size: 12px;
          text-align: center;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(27, 27, 27, 1);
          margin-bottom: 18px;
          img {
            width: 75px;
            height: 75px;
          }
        }
      }
    }
  }
  .scroll-view {
    height: 100%;
  }
}
</style>
