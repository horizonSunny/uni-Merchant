<template>
  <body-wrap>
    <tob-bar slot="topBar" :styleInfo="{ backgroundColor: '#fff' }" jumpButton>
      <text slot="title" style="color:#000">浏览记录</text>
    </tob-bar>
    <view slot="content" class="content">
      <scroll-view
        class="scrollView"
        scroll-y="true"
        lower-threshold="50"
        @scrolltolower="scrolltolower"
        v-if="true"
      >
        <view class="clearBoth" @click="clearBoth">清空</view>
        <view
          class="contentInfo"
          v-for="(item, index) in getProductVisit"
          :key="index"
        >
          <view class="timeShow">{{ item.dataTime }}</view>
          <view
            v-for="(itemInfo, indexInfo) in item.productVisits"
            :key="indexInfo"
            class="productInfo"
          >
            <uni-swipe-action>
              <uni-swipe-action-item
                :options="options"
                @click="onClick($event, itemInfo, item)"
              >
                <view
                  class="commidityInfo"
                  @click="
                    gotoNextPage('../commodityDetails/index', {
                      productId: itemInfo.productId
                    })
                  "
                >
                  <view class="productImg">
                    <!-- :src="/static/img/home.png" -->
                    <img
                      :src="itemInfo.productImage[0]"
                      alt
                      width="60"
                      height="60"
                    />
                  </view>
                  <view class="drugsInfo">
                    <view class="drugName">
                      <view class="prodcutDetails">
                        <view class="name">{{ itemInfo.productName }}</view>
                        <view class="price">¥ {{ itemInfo.price }}</view>
                      </view>
                      <view class="drugSpec">{{ itemInfo.productSpecif }}</view>
                      <!-- <text>{{ item.productName }}</text> -->
                    </view>
                    <!-- <view class="drugSpec">{{ item.productSpecif }}</view> -->
                  </view>
                </view>
              </uni-swipe-action-item>
            </uni-swipe-action>
          </view>
        </view>
      </scroll-view>
      <view v-show="false" class="noHistory">
        <img src="static/mine/Search_Bitmap2.svg" alt />
        <view class="noInfo">抱歉，暂无浏览记录哦～</view>
      </view>
    </view>
  </body-wrap>
</template>
<script>
import uniSwipeAction from "@/components/uni-swipe-action/uni-swipe-action.vue";
import uniSwipeActionItem from "@/components/uni-swipe-action-item/uni-swipe-action-item.vue";
import { mapState, mapActions, mapGetters } from "vuex";
import {
  deleteProductVisitAll,
  deleteProductVisit,
  productVisit
} from "@/service/index";
export default {
  computed: {
    ...mapGetters(["getProductVisit"])
  },
  components: {
    uniSwipeAction,
    uniSwipeActionItem
  },
  data () {
    return {
      options: [
        {
          text: "删除",
          style: {
            backgroundColor: "#E60B35",
            width: "50px",
            textWidth: "30px",
            fontSize: "15px"
          }
        }
      ],
      pageNumber: 0,
      pageSize: 10,
      // 表示分页数据未完成
      historyFull: false
    };
  },
  methods: {
    ...mapActions({
      getHistory: "ProductVisit"
      // deleteProductVisit: 'DeleteProductVisit'
    }),
    clearBoth () {
      // console.log('清空');
      deleteProductVisitAll().then(res => {
        this.$store.commit("CLEAR_PRODUCT_VISIT");
      });
    },
    onClick (e, itemInfo, item) {
      deleteProductVisit({ productVisitId: itemInfo.productVisitId }).then(
        res => {
          const index = item.productVisits.findIndex(itemInfoDel => {
            return itemInfoDel.productVisitId === itemInfo.productVisitId;
          });
          item.productVisits.splice(index, 1);
          if (item.productVisits.length === 0) {
            // 删除这个时间段
            const indexInfo = this.getProductVisit.findIndex(info => {
              return info.dataTime === item.dataTime;
            });
            this.getProductVisit.splice(indexInfo, 1);
          }
          console.log("index", index);
        }
      );
    },
    // 滚动到底部
    scrolltolower () {
      console.log("scrolltolower_", this.getProductVisit);
      let data = this.getProductVisit;
      let lastTime = data[data.length - 1];
      let lastProductVisits = lastTime.productVisits;
      let lastProductVisitId = lastProductVisits[lastProductVisits.length - 1];
      this.getHistory({
        productVisitId: lastProductVisitId.productVisitId,
        pageSize: this.pageSize
      }).then(res => { });
    },
    // 跳转页面
    gotoNextPage (url, parameters) {
      console.log('parameters_', parameters);
      this.$navTo(url, parameters);
    },
  },
  onLoad () {
    // this.getMedicineMan()
    this.getHistory({
      pageSize: this.pageSize
    }).then(res => {
      // let data = res.data;
      // let lastTime = data[data.length - 1];
      // let lastProductVisits = lastTime.productVisits;
      // let lastProductVisitId = lastProductVisits[lastProductVisits.length - 1];
    });
    // getProductVisit
  },
  beforeDestroy () {
    this.$store.commit("CLEAR_PRODUCT_VISIT");
  }
};
</script>
<style lang="scss">
.content {
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-top: 1px solid #d5d5d5;
  .clearBoth {
    height: 35px;
    line-height: 35px;
    text-align: right;
    font-size: 15px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(27, 27, 27, 1);
    padding: 0px 14px;
    border-bottom: 1px solid #e2e2e2;
  }
  .scrollView {
    flex: 1;
    overflow: scroll;
    .contentInfo {
      .timeShow {
        height: 34px;
        line-height: 34px;
        padding: 0px 15px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(137, 137, 137, 1);
      }
      .productInfo {
        .commidityInfo {
          height: 89px;
          width: 100%;
          padding: 12px 14px 15px;
          display: flex;
          align-items: center;
          .productImg {
            width: 60px;
            height: 60px;
            margin-left: 10px;
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
              height: 66px;
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
                top: -1px;
                width: 30px;
                height: 12px;
                margin-right: 10px;
                line-height: 12px;
                border: 1px solid #d7242c;
                border-radius: 5px;
                text-align: center;
                font-size: 5px;
                color: #d7242c;
                font-weight: 800;
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
                  color: rgba(250, 73, 73, 1);
                  line-height: 20px;
                  margin-left: 40px;
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
      }
    }
  }
  .noHistory {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    background: #fff;
    img {
      width: 132px;
      height: 101px;
      margin-top: 37px;
    }
    .noInfo {
      width: 143px;
      height: 18px;
      font-size: 13px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: rgba(190, 190, 190, 1);
      line-height: 18px;
    }
  }
}
</style>