<template>
  <body-wrap>
    <tob-bar
      slot="topBar"
      :styleInfo="{ backgroundColor: '#fff' }"
      jumpButton=""
    >
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
                @click="onClick($event, itemInfo, item.time)"
              >
                <view class="commidityInfo" @click.stop>
                  <view class="productImg">
                    <!-- :src="/static/img/home.png" -->
                    <img
                      :src="itemInfo.productImage[0]"
                      alt=""
                      width="60"
                      height="60"
                    />
                  </view>
                  <view class="drugsInfo">
                    <view class="drugName">
                      <!-- <text class="mark">OTC</text> -->
                      <!-- <text class="mark" v-show="item.isMp === 0">OTC</text>
                <text class="mark" v-show="item.isMp === 1"   style="color:red;border: 1px solid green;">OTC</text>
                <text class="mark" v-show="item.isMp === 2">RX</text>
                <text class="mark" v-show="item.isMp === 3">其他</text> -->
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
        <img src="static/mine/Search_Bitmap2.svg" alt="" />
        <view class="noInfo">抱歉，暂无浏览记录哦～</view>
      </view>
    </view>
  </body-wrap>
</template>
<script>
import { browsingHistory } from '@/config/test'
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
import { mapState, mapActions, mapGetters } from "vuex";
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
      productInfo: browsingHistory,
      options: [
        {
          text: '删除',
          style: {
            backgroundColor: '#E60B35',
            width: '50px',
            textWidth: "30px",
            fontSize: '15px'
          }
        }
      ],
      pageNumber: 0,
      pageSize: 10,
      // 表示分页数据未完成
      historyFull: false
    }
  },
  methods: {
    ...mapActions({
      getHistory: 'ProductVisit'
    }),
    clearBoth () {
      console.log('清空');
    },
    onClick (e, itemInfo, time) {
      console.log('当前点击的是第' + e.index + '个按钮，点击内容是' + e.content.text)
      console.log(itemInfo, '_itemInfo_', time);
    },
    // 滚动到底部
    scrolltolower () {
      console.log('scrolltolower');
      if (!this.historyFull) {
        this.getHistory({
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
        }).then(res => {
          console.log(res);
          if (res.length === 0) {
            this.historyFull = true
          }
          this.pageNumber++
        })
      }
      // this.productInfo = this.productInfo.concat(browsingHistory)
    }
  },
  onLoad () {
    // this.getMedicineMan()
    this.getHistory({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    }).then(res => {
      this.pageNumber++
    })
    // getProductVisit
  },
  beforeDestroy () {
    this.$store.commit('CLEAR_PRODUCT_VISIT')
  }
}
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