<template>
  <view class="content">
    <view class="contentInfo">
      <view class="classifyBar">
        <view
          v-for="(item, index) in menuList"
          :key="index"
          class="menuItem"
          :class="activeSelected === item ? 'hasSelected' : ''"
          @click="menuSelect(item)"
          >{{ item }}</view
        >
      </view>
      <scroll-view
        scroll-with-animation
        scroll-y
        :scroll-top="tabScrollTop"
        @scroll="scrollCategory"
        style="height:500px;"
      >
        <!-- <view style=""></view> -->
        <view class="category">
          <view
            v-for="(item, index) in categoryList"
            :key="index"
            class="categoryItem"
            :id="'main-' + item.id"
          >
            <view class="categoryTitle">
              {{ item["classifyName"] }}
            </view>
            <view style="margin-bottom:25rpx"></view>
            <!-- 下面是每一种菜单中的咖啡种类 -->
            <view
              v-for="(categoryItem, index) in item['category']"
              :key="index"
              class="categoryContent"
            >
              <view>
                <img :src="categoryItem['img']" alt class="categoryImg" />
                <view style="float:left;margin-left:22rpx">
                  <view style="height:44rpx;font-size:30rpx;color:#383838">
                    {{ categoryItem["name"] }}
                  </view>
                  <view
                    style="height:52rpx; width:176rpx;font-size:22rpx;margin-bottom:8rpx;color:#a6a6a6"
                  >
                    {{ categoryItem["englishName"] }}
                    <br />
                    {{ categoryItem["default"] }}
                  </view>
                  <view style="height:32rpx;font-size:30rpx;color:#383838">
                    {{ categoryItem["price"] }}
                  </view>
                </view>
              </view>
              <view></view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <view
      v-if="openModal"
      style="  width: 100%;
              height: 100%;
              background-color: #130b0b31;
              position: absolute;"
    >
      <!-- <menuModal
        :modal-show="openModal"
        :pitch="pitchDrink"
        @closeModal="closeModel"
      ></menuModal>-->
    </view>
  </view>
</template>

<script>
// import menuModal from "./menuModal";
export default {
  components: {
    // menuModal
  },
  data() {
    return {
      categoryList: [],
      menuList: [],
      activeSelected: "",
      // 判断是否取到每一个节点的位置高度
      sizeCalcState: false,
      tabScrollTop: 0,
      // 模态是否打开
      openModal: false,
      pitchDrink: {}
    };
  },
  onLoad() {
    this.$http.get("luckin/getMenuList").then(res => {
      this.categoryList = res.data;
      this.menuList = res.data.map(item => {
        return item.classifyName;
      });
      this.activeSelected = this.menuList[0];
    });
    console.log("this.categoryList _", this.categoryList);
  },

  methods: {
    change(e) {
      this.current = e.detail.current;
    },
    menuSelect(e) {
      if (!this.sizeCalcState) {
        this.calcSize(); //
      }
      this.$nextTick(function() {
        console.log("activeSelected_", e);
        this.activeSelected = e;
        // 找到对应的左侧菜单类
        const currentItem = this.categoryList.filter(item => {
          return item.classifyName === e;
        });
        console.log("item__", currentItem[0]["top"]);
        this.tabScrollTop = currentItem[0]["top"];
      });
    },

    // 计算右侧每个tab高度
    calcSize() {
      let h = 0;
      this.categoryList.forEach(item => {
        let view = uni.createSelectorQuery().select("#main-" + item.id);
        view
          .fields(
            {
              size: true
            },
            data => {
              item.top = h;
              h += data.height;
              item.bottom = h;
            }
          )
          .exec();
      });
      this.sizeCalcState = true;
    },
    // 滚动时候左侧是否变动
    scrollCategory(e) {
      if (!this.sizeCalcState) {
        this.calcSize(); //
      }
      this.$nextTick(function() {
        console.log("scrollCategory_", e.detail);
        const currentTop = e.detail.scrollTop;
        let tabs = this.categoryList
          .filter(item => item.top <= currentTop)
          .reverse();
        let tabTwo = this.categoryList
          .filter(item => item.top > currentTop)
          .reverse();
        this.activeSelected = tabs[0]["classifyName"];
      });
    },
    // 模态弹窗
    showModal(info) {
      this.openModal = true;
      this.pitchDrink = info;
      console.log("this.pitchDrink_", this.pitchDrink);
    },
    closeModel() {
      this.openModal = false;
    }
  }
};
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border-top: 1px solid #d4d4d4;
  .contentInfo {
    display: flex;
    flex: 1;
    overflow: hidden;
    .classifyBar {
      width: 90px;
      background: #f8f8f8;
      overflow: scroll;
      .menuItem {
        width: 70px;
        height: 44px;
        color: rgba(80, 80, 80, 1);
        font-size: 14px;
        line-height: 44px;
        text-align: center;
      }
      .hasSelected {
        background: #3a74f1;
        border-left: 1px solid rgb(135, 172, 235);
      }
    }
    .category {
      width: 285px;
      background: #fff;
      padding-left: 14px;
      padding-top: 10px;
      overflow: scroll;
      .categoryItem {
        .categoryTitle {
          width: auto;
          height: 19px;
          color: rgba(56, 56, 56, 1);
          font-size: 13px;
          line-height: 150%;
          text-align: left;
          font-weight: bold;
        }
        .categoryContent {
          width: 255px;
          height: 74px;
          .categoryImg {
            float: left;
            width: 70px;
            height: 70px;
            border-radius: 4px;
          }
        }
      }
    }
  }
}
</style>
