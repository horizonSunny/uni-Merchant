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
        margin-top: 16px;
        width: 25%;
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
    .classifyContent {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .contentItem {
        margin-bottom: 10px;
        background: #fff;
        display: flex;
        width: 49%;
        align-items: center;
        border-radius: 4px;
        height: 200px;
        flex-direction: column;
        img {
          width: 100px;
          height: 100px;
          margin-top: 9px;
        }
        .productDetails {
          margin-top: 7px;
          width: 130px;
          padding-right: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(27, 27, 27, 1);
          line-height: 20px;
          img {
            width: 32px;
            height: 14px;
          }
        }
        .specification {
          margin-top: 3px;
          width: 150px;
          height: 18px;
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(137, 137, 137, 1);
          line-height: 18px;
        }
        .price {
          margin-top: 3px;
          width: 150px;
          height: 22px;
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(250, 73, 73, 1);
          line-height: 22px;
        }
      }
    }
  }
}
</style>
