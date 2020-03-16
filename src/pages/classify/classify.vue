<template>
  <body-wrap>
    <tob-bar
      slot="topBar"
      :styleInfo="{ backgroundColor: '#fff' }"
      jumpButton=""
    >
      <text
        slot="title"
        style="
          font-size:16px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(27,27,27,1);
          "
        >全部药品</text
      >
      <img
        src="static/icon/main/D_search.svg"
        alt=""
        slot="rightIcon"
        @click="gotoNextPage('../search/search', {})"
      />
    </tob-bar>
    <view slot="content" class="content">
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
                <view>
                  {{ thrItem.cateName }}
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
        <!-- 为了适应tabBar的遮挡问题 -->
        <view style="width:100%;height:47px;"></view>
      </view>
    </view>
    <tab-bar slot="tabBar"></tab-bar>
  </body-wrap>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  onNavigationBarButtonTap (item) {
    // 这边绑定是该页面topBar上面的两个button事件
    console.log("index_search_", item.index);
    // uni.navigateTo({
    //   url: "../search/search"
    // });
  },
  data () {
    return {
      tabCurrentIndex: 0,
      currentClassify: []
    };
  },
  onLoad () {
    console.log('this.getCurrentPages()_', getCurrentPages());
    this.getClassify().then(res => {
      this.currentClassify = res[0]["children"];
    });
  },
  computed: {
    ...mapGetters(["classify"])
  },
  methods: {
    ...mapActions({
      getClassify: "GetClassify"
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
      // uni.navigateTo({
      //   url: "../classify/classifyDetails?categoryId=" + item.id
      // });
      this.$navTo('../classify/classifyDetails', {
        categoryId: item.id,
        cateName: item.cateName
      });
    },
    // 跳转页面
    gotoNextPage (url, parameters) {
      this.$navTo(url, parameters);
    },
  }
};
</script>
<style lang="scss">
.content {
  display: flex;
  flex-direction: row;
  flex: 1;
  width: 100%;
  background: #fff;
  overflow: hidden;
  border-top: 1px solid #d4d4d4;
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
