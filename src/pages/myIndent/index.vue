<template>
  <body-wrap>
    <tob-bar
      slot="topBar"
      :styleInfo="{ backgroundColor: '#fff' }"
      jumpButton="black"
    >
      <text slot="title" style="color:#000">我的订单</text>
      <img
        src="static/icon/main/D_search.svg"
        alt
        slot="rightIcon"
        @click="gotoNextPage('../search/search', {})"
      />
    </tob-bar>
    <view slot="content" class="content">
      <!-- <view v-if="hasLogin" class="hello"> -->
      <view class="main">
        <view id="nav-bar" class="nav-bar" style="width :100%;">
          <view
            v-for="(item, index) in tabBars"
            :key="item.id"
            class="nav-item"
            :class="{ current: index === tabCurrentIndex }"
            :id="'tab' + index"
            @click="changeTab(index)"
            >{{ item.name }}</view
          >
        </view>
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
                <!-- 这边是内容部分 -->
                <view
                  class="scrollInfo"
                  v-for="(indentItem, indentIndex) in tabItem.newsList"
                  :key="indentIndex"
                  @click="goDetails(indentItem)"
                >
                  <view class="indentHead">
                    <view>订单编号：{{ indentItem.orderNo }}</view>
                    <view>{{ orderStatus(indentItem.orderStatus) }}</view>
                  </view>
                  <view
                    class="commidityInfo"
                    v-for="(itemInfo, indexInfo) in indentItem.orderItems"
                    :key="indexInfo"
                  >
                    <view class="productImg">
                      <!-- src="static/mine/Bitmap.png" -->
                      <img
                        :src="itemInfo['productImage'][0]"
                        alt
                        width="60"
                        height="60"
                      />
                    </view>
                    <view class="drugsInfo">
                      <view class="drugName">
                        <view class="prodcutDetails">
                          <text class="mark" v-show="itemInfo.isMp === 0"
                            >OTC</text
                          >
                          <text
                            class="mark"
                            v-show="itemInfo.isMp === 1"
                            style="color:red;border: 1px solid green;"
                            >OTC</text
                          >
                          <text class="mark" v-show="itemInfo.isMp === 2"
                            >RX</text
                          >
                          <text class="mark" v-show="itemInfo.isMp === 3"
                            >其他</text
                          >
                          <view class="name">{{ itemInfo.productName }}</view>
                          <view class="price">¥ {{ itemInfo["price"] }}</view>
                        </view>
                        <view class="drugSpec">
                          <text>{{ itemInfo.productSpecif }}</text>
                          <text style="float:right"
                            >x{{ itemInfo.cartNum }}</text
                          >
                        </view>
                        <!-- <text>{{ item.productName }}</text> -->
                      </view>
                      <!-- <view class="drugSpec">{{ item.productSpecif }}</view> -->
                    </view>
                  </view>
                  <view class="totalPrice">
                    <view>共{{ indentItem.totalNum }}件商品 总价</view>
                    <view class="price">¥{{ indentItem.totalPrice }}</view>
                  </view>
                  <view class="indentOperate" @click.stop>
                    <view
                      class="pray"
                      v-if="
                        indentItem.orderStatus === 5 ||
                          indentItem.orderStatus === 4
                      "
                      @click="
                        deleteOrder(indentItem, tabItem.newsList, indentIndex)
                      "
                      >删除订单</view
                    >
                    <view
                      class="pray"
                      v-if="indentItem.orderStatus === 0"
                      @click="
                        openModal(indentItem, tabItem.newsList, indentIndex)
                      "
                      >取消订单</view
                    >
                    <view
                      class="active"
                      v-if="indentItem.orderStatus === 5"
                      @click="repurchase(indentItem)"
                      >重新购买</view
                    >
                    <view class="active" v-if="indentItem.orderStatus === 3"
                      >查看物流</view
                    >
                    <view
                      class="active"
                      v-if="indentItem.orderStatus === 4"
                      @click="jumpInfo(indentItem, indentItem.orderStatus)"
                      >评价</view
                    >
                    <view
                      class="active"
                      v-if="indentItem.orderStatus === 0"
                      @click="pay(indentItem.orderNo)"
                      >付款</view
                    >
                  </view>
                </view>

                <!-- 上滑加载更多组件 -->
                <mix-load-more :status="tabItem.loadMoreStatus"></mix-load-more>
              </scroll-view>
            </swiper-item>
          </swiper>
        </mix-pulldown-refresh>
      </view>
      <cancelOrder
        ref="cancelOrder"
        :currentOpeateOrder="currentOpeateOrder"
        :goBack="false"
      ></cancelOrder>
    </view>
  </body-wrap>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { debounce, throttle } from "@/utils/debounce";
import mixPulldownRefresh from "@/components/mix-news/components/mix-pulldown-refresh/mix-pulldown-refresh";
import mixLoadMore from "@/components/mix-news/components/mix-load-more/mix-load-more";
import * as json from "@/config/json";
import cancelOrder from "./cancelOrder";
// import { myIndent } from '@/config/test'
import { getOrderList, buyAgain, deleteOrder, alipay } from "@/service/index";
let windowWidth = 0,
  scrollTimer = false,
  tabBar;
export default {
  components: {
    mixPulldownRefresh,
    mixLoadMore,
    cancelOrder
  },
  computed: {
    ...mapGetters(["searchLibrary"]),
    orderStatus () {
      return function (status) {
        switch (status) {
          case -1:
            return "申请退款";
            break;
          case -2:
            return "已退款";
            break;
          case 0:
            return "等待付款";
            break;
          case 1:
            return "待审核";
            break;
          case 2:
            return "待发货";
            break;
          case 3:
            return "待收货";
            break;
          case 4:
            return "交易成功";
            break;
          case 5:
            return "交易取消";
            break;
          default:
            break;
        }
      };
    }
  },
  onLoad (option) {
    // console.log("option.id_", option.orderStatus); //打印出上个页面传递的参数。
    this.tabCurrentIndex = Number(option.orderStatus);
    // this.loadTabbars();
  },
  onShow () {
    // console.log("option.id_", option.orderStatus); //打印出上个页面传递的参数。
    // this.tabCurrentIndex = Number(option.orderStatus);
    // this.loadTabbars();
    setTimeout(() => {
      this.loadTabbars();
    }, 0);
  },
  data () {
    return {
      tabCurrentIndex: 0,
      tabBars: [],
      enableScroll: true,
      pageSize: 10,
      currentOpeateOrder: null
    };
  },
  methods: {
    //获取分类
    loadTabbars () {
      let tabList = json.indentTabList;
      tabList.forEach(item => {
        item.newsList = [];
        item.loadMoreStatus = 0; //加载更多 0加载前，1加载中，2没有更多了
        item.refreshing = 0;
        // 最后一条订单的id，由此进行分页，查询id后十条
        item.lastOrderId = 0;
        item.loaded = false;
      });
      console.log("loadTabbars_", tabList);
      this.tabBars = tabList;
      this.loadNewsList("add");
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
        // 切换完就刷新数据
        this.loadNewsList("refresh");
        tabItem.loaded = true;
        // if (this.tabCurrentIndex !== 0 && tabItem.loaded !== true) {
        //   console.log("in");

        //   this.loadNewsList("add");
        //   tabItem.loaded = true;
        // }
      }, 100);
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
        tabItem.lastOrderId = 0;
        tabItem.refreshing = true;
      }
      console.log("tabItem_", tabItem);

      const params = {
        // productType: this.confirmSelected.medicineType,
        keyword: "",
        status: Number(this.tabCurrentIndex) + 1,
        // productBrands: this.confirmSelected.selectBrands.toString(),
        // 只有当前页这一个是分开的
        orderId: tabItem.lastOrderId,
        pageSize: this.pageSize
      };

      getOrderList(params).then(res => {
        // settimeout
        let list = res.data;
        console.log("res.data_", res.data);
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
        console.log("tabItem.newsList_", tabItem.newsList);
        const orderProductList = tabItem.newsList;
        tabItem.lastOrderId =
          orderProductList[orderProductList.length - 1] && orderProductList[orderProductList.length - 1].orderId;
        // console.log("tabItem.lastOrderId_", tabItem.lastOrderId);
        // tabItem.lastOrderId++;
      });
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
    // 跳转商品详情页面
    goDetails (item) {
      this.$store.commit("SET_ORDER_DETAILS", item);
      this.$navTo("../myIndent/indentDetails");
    },
    // 跳转页面
    gotoNextPage (url, parameters) {
      this.$navTo(url, parameters);
    },
    // jumpInfo
    jumpInfo (info, key) {
      // console.log('info_', info);
      this.$store.commit("SET_INDENT_INFO", info);
      switch (key) {
        case 4:
          this.gotoNextPage("../myIndent/comment", {});
          break;

        default:
          break;
      }
    },
    // 重新购买
    repurchase (indentItem) {
      buyAgain({
        orderNo: indentItem.orderNo
      }).then(res => {
        this.$navTo("../shoppingCart/index", {
          productIds: res.data.productIds
        });
      });
    },
    //删除订单
    deleteOrder (indentItem, tabItem, index) {
      deleteOrder({ orderNo: indentItem.orderNo }).then(res => {
        console.log("res_", res);
        tabItem.splice(index, 1);
      });
    },
    // 取消订单
    openModal (indentItem, newList, indentIndex) {
      this.currentOpeateOrder = indentItem;
      this.$refs.cancelOrder.openModal();
    },
    // 付款
    pay (orderNo) {
      alipay({ orderNo: orderNo }).then(resInfo => {
        // console.log('alipay_', resInfo);
        // const div = document.createElement('div')
        // div.innerHTML = resInfo;
        // document.body.appendChild(div)
        // document.forms[0].submit()
      });
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
  border-top: 2px solid #f3f3f3;
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
        border: 1px solid #fff;
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
  .filtrateShow {
    position: absolute;
    padding: 0px;
    width: 100%;
    border-top: 1px solid rgb(240, 240, 240);
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
    height: 96upx;
    white-space: nowrap;
    box-shadow: 0 2upx 8upx rgba(0, 0, 0, 0.06);
    background-color: #fff;
    .nav-item {
      display: inline-block;
      width: 25%;
      height: 96upx;
      text-align: center;
      line-height: 96upx;
      font-size: 30upx;
      color: #303133;
      position: relative;
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
    .scrollInfo {
      height: auto;
      padding: 12px 14px 20px;
      background: #fff;
      margin-top: 10px;
      .indentHead {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
      }
      .commidityInfo {
        height: 89px;
        // padding: 12px 14px 15px;
        margin-top: 17px;
        display: flex;
        align-items: center;
        .productImg {
          width: 60px;
          height: 60px;
          position: relative;
        }
        .drugsInfo {
          flex: 1;
          height: 75px;
          margin-top: 10px;
          margin-left: 11px;
          // display: flex;
          // flex-direction: column;
          // justify-content: space-between;
          .drugName {
            width: 100%;
            height: 60px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(27, 27, 27, 1);
            line-height: 20px;
            .mark {
              position: relative;
              display: inline-block;
              height: 12px;
              line-height: 12px;
              top: 3px;
              width: 30px;
              height: 12px;
              margin-right: 10px;
              line-height: 11px;
              border: 1px solid #d7242c;
              border-radius: 11px;
              text-align: center;
              font-size: 5px;
              color: #d7242c;
              font-weight: 400;
            }
            .prodcutDetails {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              .name {
                flex: 1;
                width: 100px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .price {
                height: 20px;
                font-size: 14px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                width: 45px;
                color: rgba(250, 73, 73, 1);
                line-height: 20px;
                margin-left: 50px;
              }
            }
          }
          .drugSpec {
            height: 18px;
            margin-top: 7px;
            font-size: 13px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(137, 137, 137, 1);
            line-height: 18px;
          }
        }
      }
      .totalPrice {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(27, 27, 27, 1);
        line-height: 20px;
        .price {
          margin-left: 5px;
          width: 60px;
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(250, 73, 73, 1);
          line-height: 20px;
        }
      }
      .indentOperate {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 10px;
        view {
          width: 90px;
          height: 28px;
          line-height: 28px;
          border-radius: 14px;
          text-align: center;
          margin-left: 20px;
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
        }
        .pray {
          border: 1px solid rgba(137, 137, 137, 1);
          color: rgba(137, 137, 137, 1);
        }
        .active {
          color: rgba(58, 116, 241, 1);
          border: 1px solid #3a74f1;
        }
      }
    }
  }
  .panel-scroll-box {
    height: 100%;
    background: #f4f1f4;
    .panel-item {
      background: #fff;
      padding: 30px 0;
      border-bottom: 2px solid #000;
    }
  }
}
</style>
