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
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";
import { debounce, throttle } from "@/utils/debounce";

export default {
  computed: mapState(["forcedLogin", "hasLogin", "userName"]),
  onLoad() {},
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
      ]
    };
  },
  methods: {
    search(searchInfo) {
      console.log("searchInfo_", searchInfo.name);
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
}
</style>
