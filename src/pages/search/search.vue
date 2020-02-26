<template>
  <view class="content">
    <!-- <view v-if="hasLogin" class="hello"> -->
    <view class="main">
      <!-- 清除搜索框 -->
      <view
        class="historySearch"
        style="background-color:#fff;width:100%"
        v-if="historySearch"
      >
        <view class="classifyTitle">
          <text class="title">
            历史记录
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
            @click="
              () => {
                this.searchInfo = item.keyword;
                this.loadNewsList();
              }
            "
          >
            {{ item.keyword }}
          </li>
        </ul>
      </view>
      <view
        id="nav-bar"
        class="nav-bar"
        style="width :100%;"
        v-if="productListShow"
      >
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
      <view
        class="filtrateShow historySearch"
        v-if="filtrateSelected && productListShow"
      >
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
                :class="medicineType === item.type ? 'selected' : ''"
                v-for="(item, index) in medicineClassify"
                :key="index"
                @click="medicineType = item.type"
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
                :class="selectBrands.indexOf(item) > -1 ? 'selected' : ''"
                v-for="(item, index) in productBrands"
                :key="index"
                @click="selectedInfo(selectBrands, item)"
              >
                <text>{{ item }}</text>
              </view>
            </view>
          </view>
          <view class="filtrateOpearte">
            <button @click="reset">
              重置
            </button>
            <button @click="confirm" type="primary">确定</button>
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
        v-if="productListShow"
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
                v-for="(itemInfo, indexInfo) in tabItem.newsList"
                :key="indexInfo"
                class="drugsDetails"
              >
                <img
                  src="../../static/icon/main/Product-Bitmap@2x.png"
                  alt=""
                />
                <view class="drugsInfo">
                  <view class="drugName">{{ itemInfo.productName }}</view>
                  <view class="drugSpec">{{ itemInfo.productSpecif }}</view>
                  <view class="drugSpec">{{ itemInfo.approvalNumber }}</view>
                  <view class="drugPrice">¥ {{ itemInfo.price }}</view>
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
import {
  searchProductList
} from '@/service/index'
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
  async onLoad () {
    this.loadTabbars();
  },
  onNavigationBarButtonTap (item) {
    // 这边绑定是该页面topBar上面的两个button事件
    console.log("index_search_", item.index);
    uni.hideKeyboard();
  },
  // 监听原生标题栏搜索输入框输入内容变化事件
  onNavigationBarSearchInputChanged (item) {
    if (item.text === "") {
      this.historySearch = true
      this.filtrateSelected = false
    } else {
      this.filtrateSelected = false
      this.productListShow = false
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
    this.searchInfo = item.text
    this.loadNewsList();
  },
  data () {
    return {
      historySearch: true,
      searchKeyWord: false,
      productListShow: false,
      keyLibrary: [],
      // 查询筛选条件及分页数据
      searchInfo: '',
      sale: -1,
      price: -1,
      productType: -1,
      productBrands: [],
      pageSize: 10,
      selectBrands: [],
      medicineType: -1,
      confirmSelected: {
        selectBrands: [],
        medicineType: -1
      },
      // 是否筛选过
      medicineClassify: [
        {
          type: -1,
          name: "全部"
        },
        {
          type: 0,
          name: "处方药"
        },
        {
          type: 1,
          name: "非处方药"
        }
      ],
      filtrateSelected: false,
      tabCurrentIndex: 0,
      tabBars: [],
      enableScroll: true,
    };
  },
  methods: {
    //获取分类
    loadTabbars () {
      let tabList = json.tabList;
      tabList.forEach(item => {
        item.newsList = [];
        item.loadMoreStatus = 0; //加载更多 0加载前，1加载中，2没有更多了
        item.refreshing = 0;
        item.currentNumber = 0;
      });
      console.log("loadTabbars_", tabList);
      this.tabBars = tabList;
      // this.loadNewsList("add");
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
      // 依据index,设置当前筛选条件为销量，价格还是默认
      switch (index) {
        case 0:
          this.sale = -1
          this.price = -1
          break;
        case 1:
          this.sale = 1
          this.price = -1
          break;
        case 2:
          this.sale = -1
          this.price = 1
          break;
        default:
          break;
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
    //加载数据
    loadNewsList (type) {
      let tabItem = this.tabBars[this.tabCurrentIndex];
      //type add 加载更多 refresh下拉刷新
      if (type === "add") {
        if (tabItem.loadMoreStatus === 2) {
          return;
        }
        tabItem.loadMoreStatus = 0;
      } else if (type === "refresh") {
        tabItem.currentNumber = 0
        tabItem.refreshing = true;
      }
      // #endif

      //异步请求数据
      const params = {
        tenantId: this.$store.getters.tenant.tenantId,
        keyword: this.searchInfo,
        sale: this.sale,
        price: this.price,
        productType: this.confirmSelected.medicineType,
        productBrands: this.confirmSelected.selectBrands.toString(),
        // 只有当前页这一个是分开的
        pageNumber: tabItem.currentNumber,
        pageSize: this.pageSize
      }
      searchProductList(params).then(res => {
        console.log('searchProductList_', res);
        this.productBrands = res.data.productBrands
        this.historySearch = false
        this.searchKeyWord = false
        this.productListShow = true
        // settimeout
        let list = res.data.products
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
        // 假如不满十条，则显示加载完成
        if (list.length < 10) {
          console.log("上滑加载 处理状态");
          tabItem.loadMoreStatus = 2;
        }
        tabItem.currentNumber++;
      })
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
    },
    // 选择品牌和类型，如果选中，再次点击就取消掉
    selectedInfo (arr, item) {
      const index = arr.indexOf(item)
      if (index > -1) {
        arr.splice(index, 1)
      } else {
        arr.push(item)
      }
    },
    // 筛选重置
    reset () {
      this.selectBrands = [];
      this.medicineType = -1;
    },
    // confirm
    confirm () {
      this.confirmSelected = { selectBrands: this.selectBrands, medicineType: this.medicineType }
      this.onPulldownReresh()
      this.filtrateSelected = false
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
    .classifyTitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-size: 14px;
        font-weight: 600;
        color: #1b1b1b;
      }
      .medicineOperate {
        img {
          position: relative;
          right: 20px;
        }
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
        border: 1px solid #fff;
        border-radius: 16px;
        text-align: center;
        // width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text {
          margin-top: 7px;
          font-size: 13px;
          font-weight: 400;
          width: 52px;
          height: 18px;
          line-height: 18px;
        }
      }
      .selected {
        background: #fff;
        border: 1px solid #3c73f2;
        color: #3c73f2;
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
    position: fixed;
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
