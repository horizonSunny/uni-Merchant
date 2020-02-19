<template>
  <view class="content">
    <!-- <view v-if="hasLogin" class="hello"> -->
    <view class="main">
      <view class="classify">
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
          >
            <text>{{ item.name }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["forcedLogin", "hasLogin", "userName"]),
  onLoad() {},
  onNavigationBarButtonTap(item) {
    // 这边绑定是该页面topBar上面的两个button事件
    console.log("index_search_", item.index);
    uni.hideKeyboard();
  },
  // 监听原生标题栏搜索输入框输入内容变化事件
  onNavigationBarSearchInputChanged() {
    let a = getCurrentPages();
    let page = a[a.length - 1];
    console.log("this_", page);
    let currentWebview = page.$getAppWebview();
    console.log("this_", currentWebview);
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
      indicatorDots: false,
      autoplay: false,
      interval: 2000,
      duration: 500,
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
      recommend: [
        {
          url: "static/icon/main/Product-Bitmap@2x.png",
          otc: true,
          brand: "23312",
          commandName: "sdsd",
          specification: "100ml",
          price: 123
        },
        {
          url: "static/icon/main/Product-Bitmap@2x.png",
          otc: true,
          brand: "23312",
          commandName: "sdsd",
          specification: "100ml",
          price: 123
        },
        {
          url: "static/icon/main/Product-Bitmap@2x.png",
          otc: false,
          brand: "23312",
          specification: "100ml",
          commandName: "sdsd",
          price: 123
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.main {
  display: flex;
  flex: 1;
  flex-direction: column;
  background: #fafafe;
  .classify {
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
}
</style>
