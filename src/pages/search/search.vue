<template>
  <view class="content">
    <!-- <view v-if="hasLogin" class="hello"> -->
    <view class="main">
      <!-- 清除搜索框 -->
      <!-- <view class="clearSearch">
        <img src="/static/icon/login/Checklist.svg" alt="" />
      </view> -->
      <view class="historySearch" v-if="historySearch">
        <view class="classifyTitle">
          <text class="title">
            类型
          </text>
          <view class="medicineOperate">
            <img src="static/icon/search/Search_delete.svg" alt="" />
          </view>
        </view>
        <view class="classifyDetails">
          <view
            class="classifyItem"
            v-for="(item, index) in medicineClassify"
            :key="index"
            @click="search(item)"
          >
            <text>{{ item.name }}</text>
          </view>
        </view>
      </view>
      <view class="debounce" v-if="searchKeyWord">
        <ul>
          <li
            v-for="(item, index) in keyLibrary"
            :key="index"
            @click="search(item)"
          >
            {{ item.keyword }}
          </li>
        </ul>
      </view>
      <view id="nav-bar" class="nav-bar" style="width :100%;" v-if="false">
        <view
          v-for="(item, index) in tabBars"
          :key="item.id"
          class="nav-item"
          :class="{ current: index === tabCurrentIndex }"
          :id="'tab' + index"
          @click="changeTab(index)"
          >{{ item.name }}</view
        >
        <view
          class="nav-item"
          :class="{ current: filtrateSelected }"
          @click="filtrateClick"
        >
          筛选
          <img
            class="filtrate "
            v-show="!filtrateSelected"
            src="static/icon/search/filtrate.svg"
            alt=""
          />
          <img
            class="filtrate"
            src="static/icon/search/filtrateSelected.svg"
            v-show="filtrateSelected"
            alt=""
          />
        </view>
      </view>
      <view class="filtrateShow historySearch" v-if="filtrateSelected">
        <view>
          <view class="filtrateCond">
            <view class="classifyTitle">
              <text class="title">
                类型
              </text>
            </view>
            <view class="classifyDetails filtrateDetails">
              <view
                class="classifyItem"
                v-for="(item, index) in medicineClassify"
                :key="index"
                @click="search(item)"
              >
                <text>{{ item.name }}</text>
              </view>
            </view>
            <view class="classifyTitle">
              <text class="title">
                品牌
              </text>
            </view>
            <view class="classifyDetails filtrateDetails">
              <view
                class="classifyItem"
                v-for="(item, index) in medicineClassify"
                :key="index"
                @click="search(item)"
              >
                <text>{{ item.name }}</text>
              </view>
            </view>
          </view>
          <view class="filtrateOpearte">
            <button>重置</button>
            <button type="primary">确定</button>
          </view>
        </view>
        <view
          class="filtrateShade"
          @click="() => (this.filtrateSelected = false)"
        ></view>
      </view>
      <!-- 下拉刷新组件 -->
      <mix-pulldown-refresh
        ref="mixPulldownRefresh"
        class="panel-content"
        :top="90"
        @refresh="onPulldownReresh"
        @setEnableScroll="setEnableScroll"
        v-if="false"
      >
        <!-- 内容部分 -->
        <swiper
          id="swiper"
          class="swiper-box swiperInfo"
          :duration="300"
          :current="tabCurrentIndex"
          @change="changeTab"
        >
          <swiper-item v-for="tabItem in tabBars" :key="tabItem.id">
            <scroll-view
              class="panel-scroll-box"
              :scroll-y="enableScroll"
              @scrolltolower="loadMore"
            >
              <view
                v-for="(test, indexTest) in tabItem.newsList"
                :key="indexTest"
                class="drugsDetails"
              >
                <img
                  src="../../static/icon/main/Product-Bitmap@2x.png"
                  alt=""
                />
                <view class="drugsInfo">
                  <view class="drugName">商品品牌 通用名...</view>
                  <view class="drugSpec">100ml/支</view>
                  <view class="drugSpec">国药准字xxx</view>
                  <view class="drugPrice">¥ 232.00</view>
                </view>
              </view>
              <!-- 上滑加载更多组件 -->
              <mix-load-more :status="tabItem.loadMoreStatus"></mix-load-more>
            </scroll-view>
          </swiper-item>
        </swiper>
      </mix-pulldown-refresh>
    </view>
  </view>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { debounce, throttle } from "@/utils/debounce";
import mixPulldownRefresh from "@/components/mix-news/components/mix-pulldown-refresh/mix-pulldown-refresh";
import mixLoadMore from "@/components/mix-news/components/mix-load-more/mix-load-more";
import json from "./json";
let windowWidth = 0,
  scrollTimer = false,
  tabBar;
export default {
  components: {
    mixPulldownRefresh,
    mixLoadMore
  },
  computed: {
    ...mapGetters(["searchLibrary"])
  },
  async onLoad () { },
  onNavigationBarButtonTap (item) {
    // 这边绑定是该页面topBar上面的两个button事件
    console.log("index_search_", item.index);
    uni.hideKeyboard();
  },
  // 监听原生标题栏搜索输入框输入内容变化事件
  onNavigationBarSearchInputChanged (item) {
    if (item.text === "") {
      this.historySearch = true
    } else {
      this.historySearch = false
      this.searchKeyWord = true
      console.log('this.searchLibrary_', this.searchLibrary);

      this.keyLibrary = this.searchLibrary(item.text)
      console.log('this.keyLibrary_', this.keyLibrary);

    }
    let a = function name (params) {
      console.log(item);
    };
    debounce(a, 200)();
  },
  //监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发。

  onNavigationBarSearchInputConfirmed (item) {
    this.search(item.text)
  },
  data () {
    return {
      historySearch: true,
      searchKeyWord: false,
      keyLibrary: [],
      // 是否筛选过
      filtrateSelected: false,
      medicineClassify: [
        {
          url: "static/icon/main/home_Cold@2x.png",
          name: "感冒发"
        },
        {
          url: "static/icon/main/home_cough@2x.png",
          name: "咳用药"
        },
        {
          url: "static/icon/main/home_Cold@2x.png",
          name: "感冒发烧"
        },
        {
          url: "static/icon/main/home_cough@2x.png",
          name: "咳嗽用药"
        },
        {
          url: "static/icon/main/home_Cold@2x.png",
          name: "感冒发烧"
        },
        {
          url: "static/icon/main/home_cough@2x.png",
          name: "咳嗽用药"
        }
      ],
      tabCurrentIndex: 0,
      tabBars: [],
      enableScroll: true
    };
  },
  methods: {
    search (searchInfo) {
      console.log("searchInfo_", searchInfo.name);
    },
    //tab切换
    async changeTab (e) {
      if (scrollTimer) {
        //多次切换只执行最后一次
        clearTimeout(scrollTimer);
        scrollTimer = false;
      }
      let index = e;
      //e=number为点击切换，e=object为swiper滑动切换
      if (typeof e === "object") {
        index = e.detail.current;
      }
      if (typeof tabBar !== "object") {
        tabBar = await this.getElSize("nav-bar");
      }
      //计算宽度相关
      let tabBarScrollLeft = tabBar.scrollLeft;
      let width = 0;
      let nowWidth = 0;
      //获取可滑动总宽度
      for (let i = 0; i <= index; i++) {
        let result = await this.getElSize("tab" + i);
        width += result.width;
        if (i === index) {
          nowWidth = result.width;
        }
      }
      if (typeof e === "number") {
        //点击切换时先切换再滚动tabbar，避免同时切换视觉错位
        this.tabCurrentIndex = index;
      }
      //延迟300ms,等待swiper动画结束再修改tabbar
      scrollTimer = setTimeout(() => {
        if (width - nowWidth / 2 > windowWidth / 2) {
          //如果当前项越过中心点，将其放在屏幕中心
          this.scrollLeft = width - nowWidth / 2 - windowWidth / 2;
        } else {
          this.scrollLeft = 0;
        }
        if (typeof e === "object") {
          this.tabCurrentIndex = index;
        }
        this.tabCurrentIndex = index;

        //第一次切换tab，动画结束后需要加载数据
        let tabItem = this.tabBars[this.tabCurrentIndex];
        if (this.tabCurrentIndex !== 0 && tabItem.loaded !== true) {
          console.log("in");

          this.loadNewsList("add");
          tabItem.loaded = true;
        }
      }, 300);
    },
    //加载list
    loadNewsList (type) {
      let tabItem = this.tabBars[this.tabCurrentIndex];

      console.log("tabItem_", tabItem);

      //type add 加载更多 refresh下拉刷新
      if (type === "add") {
        if (tabItem.loadMoreStatus === 2) {
          return;
        }
        tabItem.loadMoreStatus = 0;
      }
      // #ifdef APP-PLUS
      else if (type === "refresh") {
        tabItem.refreshing = true;
      }
      // #endif

      //setTimeout模拟异步请求数据
      setTimeout(() => {
        let list = json.newsList;
        list.sort((a, b) => {
          return Math.random() > 0.5 ? -1 : 1; //静态数据打乱顺序
        });
        if (type === "refresh") {
          tabItem.newsList = []; //刷新前清空数组
        }
        list.forEach(item => {
          item.id = parseInt(Math.random() * 10000);
          tabItem.newsList.push(item);
        });
        //下拉刷新 关闭刷新动画
        if (type === "refresh") {
          this.$refs.mixPulldownRefresh &&
            this.$refs.mixPulldownRefresh.endPulldownRefresh();
          // #ifdef APP-PLUS
          tabItem.refreshing = false;
          // #endif
          tabItem.loadMoreStatus = 0;
        }
        //上滑加载 处理状态
        if (type === "add") {
          console.log("上滑加载 处理状态");
          tabItem.loadMoreStatus = 0;
        }
      }, 600);
    },
    //下拉刷新
    onPulldownReresh () {
      this.loadNewsList("refresh");
    },
    //上滑加载
    loadMore () {
      this.loadNewsList("add");
    },
    //设置scroll-view是否允许滚动，在小程序里下拉刷新时避免列表可以滑动
    setEnableScroll (enable) {
      if (this.enableScroll !== enable) {
        this.enableScroll = enable;
      }
    },
    //获得元素的size
    getElSize (id) {
      return new Promise((res, rej) => {
        let el = uni.createSelectorQuery().select("#" + id);
        el.fields(
          {
            size: true,
            scrollOffset: true,
            rect: true
          },
          data => {
            res(data);
          }
        ).exec();
      });
    },
    // filtrateClick 打开筛选界面
    filtrateClick () {
      this.filtrateSelected = !this.filtrateSelected;
    }
  }
};
</script>

<style lang="scss">
.main {
  display: flex;
  flex: 1;
  flex-direction: column;
  background: #fafafe;
  height: 100%;
  // 清除搜索框
  .clearSearch {
    position: relative;
    top: -33px;
    z-index: 999;
    left: 75%;
    img {
      height: 15px;
      width: 15px;
    }
  }
  .historySearch {
    padding: 28px 10px 15px;
    position: fixed;
    z-index: 999;
    height: 100%;
    background: #fff;
    .classifyTitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-size: 14px;
        font-weight: 600;
        color: #1b1b1b;
      }
    }
    .classifyDetails {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      .classifyItem {
        margin: 16px 0px 0px 10px;
        padding: 0 10px;
        height: 32px;
        line-height: 32px;
        background: rgba(240, 242, 247, 1);
        border-radius: 16px;
        text-align: center;
        // width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;
        text {
          margin-top: 7px;
          font-size: 13px;
          font-weight: 400;
          width: 52px;
          height: 18px;
          line-height: 18px;
        }
      }
    }
    .filtrateDetails {
      margin-bottom: 16px;
    }
  }
  .debounce {
    width: 100%;
    height: 100%;
    background: #fff;
    ul {
      padding: 0px;
    }
    li {
      border-bottom: 1px solid #efefef;
      padding: 0px 15px;
      list-style-type: none;
      line-height: 48px;
      background: rgba(255, 255, 255, 1);
      font-size: 14px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: rgba(27, 27, 27, 1);
    }
  }
  .filtrateShow {
    position: absolute;
    padding: 0px;
    // background: #fff;
    border-top: 1px solid rgb(240, 240, 240);
    // opacity: 0.7;
    top: 45px;
    bottom: 0px;
    z-index: 99;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .filtrateCond {
      padding: 15px 15px;
      background: #fff;
    }
    .filtrateOpearte {
      button {
        width: 50%;
        float: left;
        border-radius: 0px;
      }
    }
    .filtrateShade {
      flex: 1;
      background: #000;
      opacity: 0.7;
    }
  }
  //   .shade {
  //     position: absolute;
  //     background: red;
  //     z-index: 999;
  //     height: 100px;
  //     width: 100%;
  //   }
  /* 顶部tabbar */
  .nav-bar {
    position: relative;
    display: flex;
    justify-content: space-between;
    z-index: 10;
    height: 90upx;
    white-space: nowrap;
    box-shadow: 0 2upx 8upx rgba(0, 0, 0, 0.06);
    background-color: #fff;
    .nav-item {
      display: inline-block;
      width: 25%;
      height: 90upx;
      text-align: center;
      line-height: 90upx;
      font-size: 30upx;
      color: #303133;
      position: relative;
      //   &:after {
      //     content: "";
      //     width: 0;
      //     height: 0;
      //     border-bottom: 4upx solid #007aff;
      //     position: absolute;
      //     left: 50%;
      //     bottom: 0;
      //     transform: translateX(-50%);
      //     transition: 0.3s;
      //   }
      .filtrate {
        width: 12px;
        height: 12px;
        margin-top: 2px;
      }
    }
    .current {
      color: #007aff;
      &:after {
        width: 50%;
      }
    }
  }
  .swiperInfo {
    flex: 1;
    .drugsDetails {
      height: 130px;
      //   justify-content: center;
      align-items: center;
      margin-top: 1px;
      background: #fff;
      padding: 15px;
      display: flex;
      img {
        height: 100px;
        width: 100px;
      }
      .drugsInfo {
        height: 105px;
        margin-left: 11px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .drugName {
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(27, 27, 27, 1);
          line-height: 20px;
        }
        .drugSpec {
          height: 18px;
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(137, 137, 137, 1);
          line-height: 18px;
        }
        .drugPrice {
          margin-top: 20px;
          height: 25px;
          font-size: 18px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(250, 73, 73, 1);
          line-height: 25px;
        }
      }
    }
  }
  .panel-scroll-box {
    height: 100%;
    .panel-item {
      background: #fff;
      padding: 30px 0;
      border-bottom: 2px solid #000;
    }
  }
}
</style>
