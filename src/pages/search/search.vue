<template>
  <view class="content">
    <!-- <view v-if="hasLogin" class="hello"> -->
    <view class="main">
      <view class="historySearch" v-if="historySearch">
        <view class="classifyTitle">
          <text class="title">
            历史搜索
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
      <view class="debounce" v-if="historySearch">
        <ul>
          <li
            v-for="(item, index) in medicineClassify"
            :key="index"
            @click="search(item)"
          >
            {{ item.name }}
          </li>
        </ul>
      </view>
      <scroll-view id="nav-bar" class="nav-bar">
        <view
          v-for="(item, index) in tabList"
          :key="item.id"
          class="nav-item"
          :class="{ current: index === tabCurrentIndex }"
          :id="'tab' + index"
          @click="changeTab(index)"
          >{{ item.name }}</view
        >
      </scroll-view>
      <!-- 下拉刷新组件 -->
      <mix-pulldown-refresh
        ref="mixPulldownRefresh"
        class="panel-content"
        :top="90"
        @refresh="onPulldownReresh"
        @setEnableScroll="setEnableScroll"
      >
        <!-- 内容部分 -->
        <swiper
          id="swiper"
          class="swiper-box"
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
              <!-- 
							* 新闻列表 
							* 和nvue的区别只是需要把uni标签转为weex标签而已
							* class 和 style的绑定限制了一些语法，其他并没有不同
						-->
              <view
                v-for="(item, index) in tabItem.newsList"
                :key="index"
                class="news-item"
                @click="navToDetails(item)"
              >
                <text :class="['title', 'title' + item.type]">{{
                  item.title
                }}</text>
                <view
                  v-if="item.images.length > 0"
                  :class="[
                    'img-list',
                    'img-list' + item.type,
                    item.images.length === 1 && item.type === 3
                      ? 'img-list-single'
                      : ''
                  ]"
                >
                  <view
                    v-for="(imgItem, imgIndex) in item.images"
                    :key="imgIndex"
                    :class="[
                      'img-wrapper',
                      'img-wrapper' + item.type,
                      item.images.length === 1 && item.type === 3
                        ? 'img-wrapper-single'
                        : ''
                    ]"
                  >
                    <image class="img" :src="imgItem"></image>
                    <view class="video-tip" v-if="item.videoSrc">
                      <image
                        class="video-tip-icon"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAEC0lEQVRoQ+2ajVEVMRDHdzuwA6ACpQKxArECtQKxAqECoQKhAqECoQKxAqEDrWCdn7Nx8vJy+bp3T4YhM2+O8S7J/rO7//2IKo9k6CPBIU9Acpo0s10ReSkiPA8mtH0tIncicqOqPDcyZmvEhX8rIu8cQI9gtyJyKSIXc0ENA3EAnxxAj/BT356LyEdV/TWyWDcQM3smIgA4mtjwXkQ4aX4Mngj3QkSYy5PfTmb+laoeLg7EzBDga8aEEB4TOVfVAKAoj2sUc+QXQC0PxMzY8Esi3W8ROVbV05FTDHPMDC1AEBzEcqY1AeLMQQxtXANuZvjMa/cb/i6Oqo9kQKCFI1WtLl7bfOq9mUHd3/w9ND1F5f+WKAJxn/gebQiIg1Y/mAEEUsDX8J0zVZ0iljoQZydAYLuMrYCIwXOQrYc2qREzw4E/RAu/X9KcRrUX5mWBODX+jBY/UdXjuZuNznd5PnscepNjtikgODJpRzCp3VFaHBU+MTEOkSDMIJ0hFKyMNSAZbZA2NMUJn7ujqjebABDWyDDnXpqb5YDEvnGvqsHZi7I5CMgBxiHDxRx5bmSYGZlyyADWmCwHBN8IwjdRH5Im3B+En5UIJuYFBeMnjFtV3Y/frwDJmNV+K/1NAGEvIv+pqp7MUU1GthXzSoHE+VSzWRU0EsuOaUDhw+aWmNdKOEiBxOzQlYkWNJIqAiAI0V0dmhkZNvkXYyUkpEDYhFJ17cOaWXQACUtxaPhgc9JpZvFBr+Rg/xNI8B+0w0lXR0LDzUCIoE0bNPpISdC1uJD7uJQVlzTyEIFQgFGhMpo10pVfDfgIwlAiU9s0af4h+gglARkE8WURZ98G/V65Fhal3zgg3qnqXpVK/IMG0/rhAOYExDh9KgZEcqy4DtlEirKpTgutqLjsnk5RnEaLWeaUhiY0srFOS1KxrqVPtTS+2by8xsdsnkONNN5G0pDCQcVmtcaoLYVVV63e0zDo8L+0OVgvrNy84lIXemRiM022CtjynWsabVCwMdpKXQeSOlZXcGwRsPWbJAgyLZvOPOh2UKZWn6xYS0Dibl/IVF+1VoytJ15wbqyCtmkwKdIZGnZZE+9tmbLI4mC8VRuDAG8xpo00sQFDi2iRJrabU2jGBYVVmbMKxJ0/dzfSXeGVzM3ZiRZt2tGsgmDdJiAFMGiHNPxijk+YGV1NsuHgD82aCB82A4lomdohvf8jrQm3s61XbzgzAMJtVXwWOPZhD7F0AXEwnBrqjzv1sRCACnfp/HvIdsNlTbiDn+pgDuVn3UCCxN4wA1Bods+xrr8R26/yuuuULh8p8D0nSzsTE8ldOZcAhttgKsUhAEM+Ujty1xIm1PJfOK7nCh/LM2xaNVDbfv8EZNsnXtvvDyrmF1FIBKIwAAAAAElFTkSuQmCC"
                      ></image>
                    </view>
                  </view>
                </view>
                <!-- 空图片占位 -->
                <view v-else class="img-empty"></view>
                <view :class="['bot', 'bot' + item.type]">
                  <text class="author">{{ item.author }}</text>
                  <text class="time">{{ item.time }}</text>
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
import { mapState } from "vuex";
import { debounce, throttle } from "@/utils/debounce";
import mixPulldownRefresh from "@/components/mix-news/components/mix-pulldown-refresh/mix-pulldown-refresh";
import mixLoadMore from "@/components/mix-news/components/mix-load-more/mix-load-more";
import json from "./json";
export default {
  components: {
    mixPulldownRefresh,
    mixLoadMore
  },
  onLoad() {
    this.loadTabbars();
  },
  onNavigationBarButtonTap(item) {
    // 这边绑定是该页面topBar上面的两个button事件
    console.log("index_search_", item.index);
    uni.hideKeyboard();
  },
  // 监听原生标题栏搜索输入框输入内容变化事件
  onNavigationBarSearchInputChanged(item) {
    let a = function name(params) {
      console.log(item);
    };
    debounce(a, 200)();
  },
  //监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发。

  onNavigationBarSearchInputConfirmed(item) {
    console.log("item_Search", item);
    uni.showToast({
      icon: "none",
      title: item.text
    });
  },
  data() {
    return {
      historySearch: false,
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
      tabList: [
        {
          name: "默认",
          id: "1"
        },
        {
          name: "销量",
          id: "2"
        },
        {
          name: "价格",
          id: "3"
        },
        {
          name: "筛选",
          id: "4"
        }
      ],
      tabBars: [],
      enableScroll: true
    };
  },
  methods: {
    //获取分类
    loadTabbars() {
      let tabList = this.tabList;
      tabList.forEach(item => {
        item.newsList = [];
        item.loadMoreStatus = 0; //加载更多 0加载前，1加载中，2没有更多了
        item.refreshing = 0;
      });
      console.log("loadTabbars_", tabList);

      this.tabBars = tabList;
      this.loadNewsList("add");
    },
    search(searchInfo) {
      console.log("searchInfo_", searchInfo.name);
    },
    changeTab(index) {
      this.tabCurrentIndex = index;
    },
    //加载list
    loadNewsList(type) {
      let tabItem = this.tabBars[this.tabCurrentIndex];
      console.log("tabItem_", tabItem);

      //type add 加载更多 refresh下拉刷新
      if (type === "add") {
        if (tabItem.loadMoreStatus === 2) {
          return;
        }
        tabItem.loadMoreStatus = 1;
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
          tabItem.loadMoreStatus = tabItem.newsList.length > 40 ? 2 : 0;
        }
      }, 600);
    },
    //下拉刷新
    onPulldownReresh() {
      this.loadNewsList("refresh");
    },
    //上滑加载
    loadMore() {
      this.loadNewsList("add");
    },
    //设置scroll-view是否允许滚动，在小程序里下拉刷新时避免列表可以滑动
    setEnableScroll(enable) {
      if (this.enableScroll !== enable) {
        this.enableScroll = enable;
      }
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
  .historySearch {
    padding: 28px 10px 15px;
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
  }
  .debounce {
    width: 100%;
    height: 48px;
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
      &:after {
        content: "";
        width: 0;
        height: 0;
        border-bottom: 4upx solid #007aff;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        transition: 0.3s;
      }
    }
    .current {
      color: #007aff;
      &:after {
        width: 50%;
      }
    }
  }
}
</style>
