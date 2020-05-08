<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import pageAnimation from '@/components/Michael-pageAnimationPlus'
export default {
  mixins: [pageAnimation],
  onLaunch: function () {
    this.getKeyWord()
    this.getMainInfo()
    this.getMedicineTemplate()
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
    let lastRouterInfo = sessionStorage.getItem('lastRouterInfo')
    // 有可能是订单支付跳往支付宝，然后类似于刷新，这边加上一个，订单支付后回跳到订单列表页面
    if (lastRouterInfo === "pages/indent/index") {
      uni.reLaunch({
        url: 'pages/myIndent/index?orderStatus=0'
      })
    }
  },
  onHide: function () {
    // console.log('App Hide')

  },
  created () {
    //在页面加载时读取sessionStorage里的状态信息
    document.body.ontouchstart = function (event) {
      event.preventDefault()
    }
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem('store'))
        )
      )
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
      const currentPages = getCurrentPages()
      const currentPage = currentPages[currentPages.length - 1]['route']
      sessionStorage.setItem('lastRouterInfo', currentPage)
    })
  },
  methods: {
    ...mapActions({
      getMainInfo: 'GetMainInfo',
      getKeyWord: 'GetKeyWord',
      getMedicineTemplate: 'GetMedicineTemplate'
    })
  }
}
</script>

<style lang="scss">
/* 头条小程序需要把 iconfont 样式放到组件外 */
@import "components/m-icon/m-icon.css";

/*每个页面公共css */
// * {
//   touch-action: none;
// }
page {
  min-height: 100%;
  display: flex;
  font-size: 16px;
  background: #f4f1f4;
}
uni-page-body {
  height: 100%;
}
.uni-page-head-btn {
  height: 22px;
  margin: 0px 15px;
}
/* #ifdef MP-BAIDU */
page {
  width: 100%;
  height: 100%;
  display: block;
}
swan-template {
  width: 100%;
  min-height: 100%;
  display: flex;
}

/* 原生组件模式下需要注意组件外部样式 */
custom-component {
  width: 100%;
  min-height: 100%;
  display: flex;
}

/* #endif */

/* #ifdef MP-ALIPAY */
page {
  min-height: 100vh;
}

/* #endif */

/* 原生组件模式下需要注意组件外部样式 */
m-input {
  width: 100%;
  /* min-height: 100%; */
  display: flex;
  flex: 1;
}

.content {
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #ffffff;
}
.input-group {
  background-color: #ffffff;
  margin-top: 20px;
  position: relative;
}

.input-group::before {
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
  height: 1px;
  content: "";
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background-color: #c8c7cc;
}

.input-group::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1px;
  content: "";
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background-color: #c8c7cc;
}

.input-row {
  display: flex;
  flex-direction: row;
  position: relative;
  font-size: 18px;
  line-height: 40px;
}

.input-row .title {
  width: 72px;
  padding-left: 15px;
}

.input-row.border::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 8px;
  height: 1px;
  content: "";
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background-color: #c8c7cc;
}

.btn-row {
  margin-top: 25px;
  padding: 10px;
}

button.primary {
  /* background-color: #0faeff; */
}
</style>
