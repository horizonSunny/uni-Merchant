<template>
  <body-wrap>
    <tob-bar
      slot="topBar"
      :styleInfo="{ backgroundColor: '#fff' }"
      jumpButton=""
    >
      <text slot="title" style="color:#000">评价</text>
    </tob-bar>
    <view slot="content" class="content">
      <view class="indentWrap">
        <view
          class="indent"
          v-for="(item, index) in getIndentInfo.orderItems"
          :key="index"
        >
          <view class="effectiveGoods">
            <view class="commidityInfo">
              <view class="productImg">
                <img
                  :src="item['productImage'][0]"
                  alt=""
                  width="60"
                  height="60"
                />
                <!-- <img src="/static/img/home.png" alt="" width="60" height="60" /> -->
                <!-- <view class="model">已下架</view> -->
              </view>
              <view class="drugsInfo">
                <view class="drugName">
                  <view>
                    <text class="mark">OTC</text>
                    <!-- <text class="mark" v-show="item.isMp === 0">OTC</text>
                  <text class="mark" v-show="item.isMp === 1"   style="color:red;border: 1px solid green;">OTC</text>
                  <text class="mark" v-show="item.isMp === 2">RX</text>
                  <text class="mark" v-show="item.isMp === 3">其他</text> -->
                    <text class="name">{{ item.productName }}</text>
                  </view>
                </view>
                <view class="drugSpec">
                  <view> 已选择：{{ item.productSpecif }} </view>
                </view>
                <view class="rate">
                  <uni-rate
                    size="20"
                    value="5"
                    margin="20"
                    @change="commentRate($event, 1)"
                    class="uniRate"
                  ></uni-rate>
                  <text class="rateInfo">非常好</text>
                </view>
              </view>
            </view>
          </view>
          <view class="separate logisticsInfo indentInfo">
            <textarea
              placeholder="说你的使用心得，分享给其他人吧～"
              placeholder-style="height:17px;
              font-size:12px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(137,137,137,1);
              line-height:17px;"
              maxlength="200"
              @input="textareaInput"
            />
            <view class="importability">
              100/200
            </view>
          </view>
          <view class="separate logisticsInfo indentInfo">
            <up-img></up-img>
          </view>
        </view>
      </view>
      <view class="issue">
        <button type="primary">发布</button>
      </view>
    </view>
  </body-wrap>
</template>
<script>
import uniRate from '@/components/rate/uni-rate/uni-rate.vue'
import upImg from '@/components/sunui-upimg_v2.72/components/sunui-upimg/sunui-upimg.vue'
import { mapActions, mapGetters } from "vuex";
import * as storage from '@/config/storage'
export default {
  components: { uniRate, upImg },
  computed: {
    ...mapGetters(["getIndentInfo"]),
    header () {
      return {
        authorization: storage.getSync('access_token')
      }
    }
  },
  methods: {
    commentRate (e, id) {
      console.log(e.value, id);
    },
    textareaInput (e) {
      console.log(e.detail.cursor);
    }
  },
  data () {
    return {

    }
  }
}
</script>
<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  background: #f4f1f4;
  overflow: hidden;
  .indentWrap {
    flex: 1;
    overflow: scroll;
    .indent {
      width: 100%;
      height: auto;
      background: #f4f1f4;
      .effectiveGoods {
        margin-top: 10px;
        margin-bottom: 1px;
        padding: 13px 16px;
        background: rgba(255, 255, 255, 1);
        .title {
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(27, 27, 27, 1);
          line-height: 20px;
        }
        .commidityInfo {
          height: 89px;
          width: 100%;
          padding: 10px 0px;
          display: flex;
          // justify-content: center;
          align-items: center;
          .productImg {
            width: 60px;
            height: 60px;
            position: relative;
            .model {
              text-align: center;
              width: 60px;
              height: 60px;
              line-height: 60px;
              position: absolute;
              z-index: 99;
              opacity: 0.5;
              top: 0px;
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              background: #000;
            }
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
              display: flex;
              justify-content: space-between;
              height: 18px;
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(27, 27, 27, 1);
              line-height: 18px;
              .mark {
                position: relative;
                display: inline-block;
                height: 12px;
                line-height: 12px;
                top: -5px;
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
              .name {
                display: inline-block;
                width: 50%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            .drugSpec {
              height: 18px;
              font-size: 13px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(137, 137, 137, 1);
              line-height: 18px;
              display: flex;
              justify-content: space-between;
            }
            .rate {
              padding: 10px 0px;
              height: 20px;
              line-height: 20px;
              margin-top: 10px;
              position: relative;
              left: -20px;
              display: flex;
              .uniRate {
                width: 70%;
              }
              .rateInfo {
                width: 37px;
                height: 17px;
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(137, 137, 137, 1);
                line-height: 17px;
                position: relative;
                top: -7px;
                right: -10px;
              }
            }
          }
        }
      }
      .separate {
        margin-top: 10px;
        padding: 13px 16px;
        background: rgba(255, 255, 255, 1);
      }
      .logisticsInfo {
        background: #fff;
        .logistics {
          height: 20px;
          padding: 5px 0px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(27, 27, 27, 1);
          line-height: 20px;
          display: flex;
          justify-content: space-between;
          .home_right {
            height: 20px;
            font-size: 14px;
            font-family: PingFang-SC-Medium, PingFang-SC;
            font-weight: 500;
            color: rgba(137, 137, 137, 1);
            line-height: 20px;
          }
          .marginLeft {
            margin-left: 14px;
          }
          .indentOperate {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            view {
              width: 90px;
              height: 28px;
              line-height: 28px;
              border-radius: 14px;
              text-align: center;
              margin-left: 10px;
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
      .indentInfo {
        margin-top: 1px;
        position: relative;
        .indentTotal {
          height: 21px;
          line-height: 21px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          text {
            margin-left: 5px;
          }
          text:nth-child(1) {
            height: 18px;
            font-size: 13px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(27, 27, 27, 1);
            line-height: 18px;
          }
          text:nth-child(2) {
            height: 21px;
            font-size: 15px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(250, 73, 73, 1);
            line-height: 21px;
          }
        }
        /deep/ uni-textarea {
          width: 100%;
        }
        .importability {
          position: absolute;
          width: 35px;
          height: 17px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(137, 137, 137, 1);
          line-height: 17px;
          right: 28px;
          bottom: 12px;
        }
      }
    }
  }

  .issue {
    height: 70px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    button {
      width: 80%;
    }
  }
}
</style>