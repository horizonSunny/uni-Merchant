<template>
  <body-wrap>
    <tob-bar
      slot="topBar"
      :styleInfo="{ backgroundColor: '#fff' }"
      jumpButton=""
    >
      <text slot="title" style="color:#000">收藏</text>
    </tob-bar>
    <view slot="content" class="content">
      <scroll-view
        v-show="true"
        class="scrollView"
        scroll-y="true"
        lower-threshold="50"
        @scrolltolower="scrolltolower"
        v-if="true"
        :style="{ height: this.editorInfo ? '80%' : '' }"
      >
        <view class="clearBoth" @click="editor">{{
          this.editorInfo ? "完成" : "编辑"
        }}</view>
        <checkbox-group @change="checkboxChange">
          <label
            class="uni-list-cell uni-list-cell-pd"
            v-for="(item, index) in getCollectInfo"
            :key="index"
            @click="
              gotoNextPage('../commodityDetails/index', {
                productId: item.productId
              })
            "
          >
            <uni-swipe-action>
              <uni-swipe-action-item
                :options="options"
                @click="onClick($event, item)"
                @click.stop
              >
                <view class="commidityInfo">
                  <checkbox
                    :value="item.productCollectId"
                    color="#FFCC33"
                    :checked="checkedArr.includes(String(item.value))"
                    v-if="editorInfo"
                  />
                  <view class="productImg">
                    <img
                      :src="item.productImage[0]"
                      alt=""
                      width="60"
                      height="60"
                    />
                    <!-- <view class="model">已下架</view> -->
                  </view>
                  <view class="drugsInfo">
                    <view class="drugName">
                      <view class="prodcutDetails">
                        <view class="name">{{ item.productName }}</view>
                        <view class="price">¥ {{ item.price }}</view>
                      </view>
                      <view class="drugSpec">{{ item.productSpecif }}</view>
                    </view>
                    <!-- <view class="drugSpec">{{ item.productSpecif }}</view> -->
                  </view>
                </view>
              </uni-swipe-action-item>
            </uni-swipe-action>
          </label>
        </checkbox-group>
      </scroll-view>
      <view class="cancelCol" v-show="this.editorInfo">
        <button @click="cancelCollect()">取消收藏</button>
      </view>
      <view v-show="false" class="noHistory">
        <img src="static/mine/Search_Bitmap3.svg" alt="" />
        <view class="noInfo">抱歉，暂无收藏记录哦～</view>
      </view>
    </view>
  </body-wrap>
</template>
<script>
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
import { mapActions, mapGetters } from "vuex"
import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
import {
  deleteProductCollect
} from '@/service/index'
export default {
  // computed: mapState(["forcedLogin", "hasLogin", "userName"]),
  components: {
    uniSwipeAction,
    uniSwipeActionItem
  },
  data () {
    return {
      options: [
        {
          text: '取消收藏',
          style: {
            backgroundColor: '#E60B35',
            width: '50px',
            textWidth: "30px",
            fontSize: '15px'
          }
        }
      ],
      checkedArr: [],
      editorInfo: false,
      pageNumber: 0,
      pageSize: 1000,
    }
  },
  computed: {
    ...mapGetters(["getCollectInfo"])
  },
  methods: {
    ...mapActions({
      getProductCollect: 'GetProductCollect',
      // deleteProductVisit: 'DeleteProductVisit'
    }),
    checkboxChange: function (e) {
      console.log(e.detail.value);

      this.checkedArr = e.detail.value
      // 如果选择的数组中有值，并且长度等于列表的长度，就是全选
    },
    editor () {
      console.log('编辑');
    },
    onClick (e, itemInfo, time) {
      console.log(itemInfo, '_itemInfo_');
      const deleteArr = [itemInfo.productCollectId]
      this.cancelCollect(deleteArr)
    },
    cancelCollect (collectArr) {
      console.log('collectArr_', collectArr);
      if (collectArr === undefined) {
        //代表的是取消收藏按钮
        collectArr = this.checkedArr
      }
      deleteProductCollect({ productCollectId: collectArr }).then((res) => {
        this.getCollectInfo.forEach((element, index) => {
          if (collectArr.indexOf(element.productCollectId) !== -1) {
            this.getCollectInfo.splice(index, 1)
          }
        });
      })
    },
    // 滚动到底部
    scrolltolower () {
      console.log('scrolltolower');
      this.productInfo = this.productInfo.concat(collect)
    },
    // 编辑
    editor () {
      this.editorInfo = !this.editorInfo
    },
    // 跳转页面
    gotoNextPage (url, parameters) {
      if (this.editorInfo) {
        return
      }
      console.log('parameters_', parameters);
      this.$navTo(url, parameters);
    },
  },
  onLoad () {
    this.getProductCollect({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    })
  }
}
</script>
<style lang="scss">
/deep/ .uni-checkbox-input {
  border-radius: 11px;
}
.content {
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
    .commidityInfo {
      height: 89px;
      width: 100%;
      padding: 12px 14px 15px;
      display: flex;
      border-bottom: 1px solid #f2f2f2;
      // justify-content: center;
      align-items: center;
      .productImg {
        width: 60px;
        height: 60px;
        margin-left: 10px;
        position: relative;
        // .model {
        //   text-align: center;
        //   width: 60px;
        //   height: 60px;
        //   line-height: 60px;
        //   position: absolute;
        //   z-index: 999;
        //   opacity: 0.5;
        //   top: 0px;
        //   font-size: 14px;
        //   font-family: PingFangSC-Regular, PingFang SC;
        //   font-weight: 400;
        //   color: rgba(255, 255, 255, 1);
        //   background: #000;
        // }
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
          margin-top: 7px;
          height: 18px;
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(137, 137, 137, 1);
          line-height: 18px;
        }
        .drugPrice {
          margin-top: 11px;
          height: 25px;
          font-size: 18px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(250, 73, 73, 1);
          line-height: 25px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
  .cancelCol {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    button {
      width: 80%;
      background: #f15353;
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
    // background: red;
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