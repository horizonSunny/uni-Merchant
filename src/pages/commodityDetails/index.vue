<template>
  <scroll-view
    class="main"
    scroll-y
    :upper-threshold="50"
    @scrolltoupper="scrolltoupper"
    @scroll="scroll"
  >
    <!-- <view v-if="hasLogin" class="hello"> -->
    <view class="customBar" :style="{ background: topBar ? '#fff' : '' }">
      <img src="static/icon/commodityDetails/reback.svg" alt class="reback" />
      <img src="static/icon/commodityDetails/more.svg" alt class="more" />
      <img src="static/icon/commodityDetails/shopCar.svg" alt class="shopCar" />
    </view>
    <!-- bottomBar -->
    <view class="bottomBar">
      <view class="operate">
        <view class="viewInfo">
          <img src="static/icon/commodityDetails/PDJ_home.svg" alt="" />
          <view>首页</view>
        </view>
        <view class="viewInfo">
          <img src="static/icon/commodityDetails/PDJ_Consultation.svg" alt="" />
          <view>咨询</view>
        </view>
        <view class="viewInfo">
          <img
            src="static/icon/commodityDetails/PDJ_nl_Collection.svg"
            alt=""
          />
          <view>收藏</view>
        </view>
      </view>
      <view class="button">
        <button type="primary">加入购物车</button>
        <button type="warn">立即购买</button>
      </view>
    </view>
    <!-- 轮播图 -->
    <view class="carousel">
      <view class="carouselContain">
        <swiper>
          <swiper-item>
            <view class="swiper-item uni-bg-red">
              <img
                src="static/img/home_banner@2x.png"
                alt
                class="merchantIcon"
              />
            </view>
          </swiper-item>
          <swiper-item>
            <view class="swiper-item uni-bg-green">
              <img
                src="static/img/home_banner@2x.png"
                alt
                class="merchantIcon"
              />
            </view>
          </swiper-item>
        </swiper>
      </view>
    </view>
    <view class="serviceInfo">
      <text>
        <img src="@/static/icon/commodityDetails/selected.svg" alt />24小时发货
      </text>
      <text>
        <img src="@/static/icon/commodityDetails/selected.svg" alt />品质保障
      </text>
      <text>
        <img src="@/static/icon/commodityDetails/selected.svg" alt />提供发票
      </text>
    </view>
    <view class="separate productIntr">
      <view class="productPrice">¥ 232.00</view>
      <view class="productName">商品品牌 通用名</view>
      <view class="productIntro">药品简介药品简介药品简介药品简介药品简介</view>
    </view>
    <view class="separate logisticsInfo">
      <view class="logistics">
        配送
        <text>福建厦门</text>至
        <text>上海浦东新区</text>
      </view>
      <view class="logistics">
        运费
        <text>8.00元起</text>
      </view>
      <view class="logistics">
        库存
        <text>
          1212
          <text class="limitation">(限购3件)</text> </text
        >有效期至
        <text>剩余有效期至>180</text>
      </view>
    </view>
    <view class="separate logisticsInfo parameters">
      <view class="parameter">参数</view>
      <view class="logistics">
        <view class="logistics">
          批准文号
          <text>国药准字329348344303400</text>
        </view>
        <view class="logistics">
          包装规格
          <text>10gX9袋/盒</text>
        </view>
        <view class="logistics">
          剂型/型号
          <text>颗粒剂</text>
        </view>
        <view class="logistics">
          生产企业
          <text>xxxxxxx</text>
        </view>
        <view class="logistics">
          有效期
          <text>24个月</text>
        </view>
        <view class="warning">
          <view class="logistics">
            <img src="static/icon/commodityDetails/remind.svg" alt />
            处方药需凭处方在执业医师指导下购买和使用
          </view>
          <view class="logistics">
            <img src="static/icon/commodityDetails/remind.svg" alt />
            请仔细阅读药品使用说明书并按说明使用或在
          </view>
        </view>
      </view>
    </view>
    <view class="separate logisticsInfo parameters sku">
      <view class="parameter skuText">
        选择
        <text class="skuInfo">选择单品</text>
      </view>
      <view class="parameter">
        <img src="static/icon/main/home_right-2.svg" alt />
      </view>
    </view>
    <view class="separate logisticsInfo parameters sku">
      <view class="parameter skuText">
        <text class="skuInfo questionTitle">常见问题（126）</text>
      </view>
      <view class="parameter question">
        <text>查看全部</text>
        <img src="static/icon/main/home_right-2.svg" alt />
      </view>
    </view>
    <view class="comment">
      <view
        class="separate logisticsInfo parameters sku"
        style="margin-bottom:0px;"
      >
        <view class="parameter skuText">
          <text class="skuInfo questionTitle">顾客评论（126）</text>
        </view>
        <view class="parameter question">
          <text>查看全部</text>
          <img src="static/icon/main/home_right-2.svg" alt />
        </view>
      </view>
      <view class="commentInfo">
        <view class="commentTitle">
          <view class="userInfo">
            <img src="static/img/home.png" alt />
            <text>张三</text>
          </view>
          <view class="commentTime">2019-12-13 12:00:12</view>
        </view>
        <view class="commentContent"
          >评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容</view
        >
      </view>
    </view>
    <!-- 基本信息 说明书 服务保障 -->
    <view class="details">
      <text>基本信息</text>
      <text>说明书</text>
      <text style="border-right:0px"> 服务保障</text>
    </view>
    <view class="remind">
      温馨提示：商品包装因厂家更换频繁，如有不符请以实物为准
    </view>
    <!-- <view class="detailsInfo">
      <view class="basicInfo">
        <text class="label">通用名</text>
        <text>xxxxxx</text>
      </view>
    </view> -->
    <view class="detailsInfo">
      <view class="specification">
        <view class="label">【产品名称】</view>
        <view class="content"
          >说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说</view
        >
      </view>
    </view>
    <view class="productImg">
      <view v-for="(item, index) in imgArr" :key="index">
        <img src="static/img/home_banner@2x.png" alt />
      </view>
    </view>
  </scroll-view>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["forcedLogin", "hasLogin", "userName"]),
  onLoad () { },
  onNavigationBarButtonTap (item) {
    // 这边绑定是该页面topBar上面的两个button事件
    console.log("index_", item.index);
  },
  methods: {
    testTologin () {
      console.log("testTologin_");
      uni.navigateTo({
        // url: "../login/login"
        // url: "../merchantsIntr/merchantsIntr"
        url: "../search/search"
      });
    },
    goClassify () {
      console.log("goClassify_");
      uni.switchTab({
        // url: "../login/login"
        // url: "../merchantsIntr/merchantsIntr"
        url: "../classify/classify"
      });
    },
    scrolltoupper () {
      console.log("aaa");
    },
    scroll (e) {
      console.log("scrollCategory_", e.detail);
      if (e.detail.scrollTop > 200) {
        this.topBar = true;
      } else {
        this.topBar = false;
      }
    }
  },
  data () {
    return {
      indicatorDots: false,
      autoplay: false,
      // 滚动到200到位置topbar背景色变白
      topBar: false,
      imgArr: [1, 2, 3]
    };
  }
};
</script>

<style lang="scss">
uni-page-body {
  min-height: 100%;
  display: -webkit-box;
  height: 100%;
  display: -webkit-flex;
  display: flex;
  font-size: 16px;
}
.main {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #fafafe;
  // 自定义头部
  .customBar {
    height: 30px;
    line-height: 30px;
    padding: 7px 3px;
    position: fixed;
    z-index: 999;
    opacity: 1;
    width: 100%;
    img {
      height: 22px;
      width: 22px;
    }
    .reback {
      float: left;
      margin-left: 8px;
    }
    .shopCar {
      margin-right: 21px;
      float: right;
    }
    .more {
      margin-right: 18px;
      float: right;
    }
  }
  // 购物车bottomBar
  .bottomBar {
    height: 50px;
    background: rgba(255, 255, 255, 1);
    position: fixed;
    z-index: 999;
    width: 100%;
    bottom: -1px;
    display: flex;

    .operate {
      width: 40%;
      display: flex;
      justify-content: space-around;
      font-size: 10px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(27, 27, 27, 1);
      align-items: center;
      .viewInfo {
        width: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      img {
        height: 18px;
        width: 18px;
      }
    }
    .button {
      width: 60%;
      height: 50px;
      line-height: 50px;
      display: flex;
      button {
        width: 50%;
        border-radius: 0px;
      }
    }
  }
  .merchantInfo {
    background: #3a74f1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 22px;
    padding: 9px 15px 20px;
    .merchantMessage {
      display: flex;
      align-items: center;
      img {
        margin-right: 5px;
      }
      text {
        color: #fff;
      }
    }
    .merchantIcon {
      width: 64px;
      height: 22px;
    }
  }
  .carousel {
    height: 200px;
    text-align: center;
    position: relative;
    .carouselContain {
      z-index: 1;
      display: inline-block;
      border-radius: 8px;
      width: 100%;
      height: 200px;
      img {
        width: 100%;
        height: 200px;
      }
    }
    .carouselAngel {
      position: absolute;
      width: 0;
      height: 0;
      bottom: 0px;
      border-style: solid;
    }
  }
  .serviceInfo {
    background: rgba(246, 246, 246, 1);
    width: 100%;
    height: 30px;
    line-height: 30px;
    text {
      margin-left: 20px;
      width: 75px;
      height: 17px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(105, 105, 105, 1);
      line-height: 17px;
    }
    img {
      position: relative;
      top: 4px;
      height: 17px;
      width: 17px;
    }
  }
  .separate {
    margin-bottom: 10px;
    padding: 13px 10px;
  }
  // 商品名
  .productIntr {
    background: #fff;
    .productPrice {
      height: 30px;
      font-size: 22px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(250, 73, 73, 1);
      line-height: 30px;
    }
    .productName {
      margin-top: 7px;
      height: 21px;
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(27, 27, 27, 1);
      line-height: 21px;
    }
    .productIntro {
      margin-top: 3px;
      height: 36px;
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(137, 137, 137, 1);
      line-height: 18px;
    }
  }
  // 配送
  .logisticsInfo {
    background: #fff;
    .logistics {
      height: 18px;
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(137, 137, 137, 1);
      line-height: 18px;
      margin-bottom: 5px;
      text {
        color: rgba(27, 27, 27, 1);
        margin: 0px 8px;
        .limitation {
          color: rgba(247, 109, 32, 1);
          margin-right: 21px;
        }
      }
    }
  }
  // 参数
  .parameters {
    height: 170px;
    display: flex;
    .parameter {
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(137, 137, 137, 1);
      width: 27px;
      margin-right: 8px;
    }
    .warning {
      margin-top: 11px;
      img {
        width: 14px;
        height: 14px;
        position: relative;
        top: 2px;
        right: 3px;
      }
    }
  }
  // 选择单品
  .sku {
    display: flex;
    position: relative;
    justify-content: space-between;
    height: auto;
    .skuText {
      width: 80%;
      .skuInfo {
        margin-left: 9px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(27, 27, 27, 1);
      }
      .questionTitle {
        margin-left: 0px;
      }
    }
    .question {
      width: 22%;
      text {
        font-size: 13px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(58, 116, 241, 1);
        margin-right: 9px;
      }
    }
    img {
      position: relative;
      top: 2px;
      // right: 1px;
      float: right;
    }
  }
  // 评论
  .comment {
    background: #fff;
    .commentInfo {
      padding: 10px 10px;
      .commentTitle {
        height: 32px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(137, 137, 137, 1);
        line-height: 32px;
        display: flex;
        align-items: center;
        .userInfo {
          width: 50%;
          height: 32px;
          line-height: 32px;
          img {
            width: 32px;
            height: 32px;
            line-height: 32px;
            border-radius: 16px;
            background: rgba(216, 216, 216, 1);
          }
          text {
            position: relative;
            left: 5px;
            top: -10px;
          }
        }
        .commentTime {
          width: 50%;
          text-align: right;
        }
      }
      .commentContent {
        margin-top: 5px;
        padding: 0px 5px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(27, 27, 27, 1);
        line-height: 17px;
      }
    }
  }
  // 基本信息详情
  .details {
    padding: 13px 10px;
    margin-top: 10px;
    background: #fff;
    display: flex;
    justify-content: space-around;
    text {
      height: 18px;
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(94, 94, 94, 1);
      line-height: 18px;
      width: 33%;
      border-right: 1px solid #eeeeee;
      text-align: center;
    }
  }
  // 温馨提示
  .remind {
    background: #fff7e8;
    text-align: center;
    height: 17px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(247, 109, 32, 1);
    line-height: 17px;
  }
  // 详情信息
  .detailsInfo {
    margin: 5px;
    border-radius: 6px;
    background: #fff;
    padding: 18px 22px;
    .basicInfo {
      height: 40px;
      line-height: 40px;
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #1b1b1b;
      border-bottom: 1px solid #f7f7f7;
      .label {
        color: #aeaeae;
        margin-right: 36px;
      }
    }
    .specification {
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(27, 27, 27, 1);
      line-height: 18px;
      .content {
        color: #898989;
        padding: 6px 10px;
      }
    }
  }
  //  详情图片
  .productImg {
    margin-bottom: 10px;
    background: #fff;
    padding: 10px;
    img {
      height: 300px;
      width: 100%;
    }
  }
  uni-swiper {
    display: block;
    height: 200px;
  }
}
</style>
