<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
    this.$store.commit("setScene", "");
    uni.hideTabBar();
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang='scss'>
@import "@/uni_modules/uview-ui/index.scss"; /*每个页面公共css */
.tabbar {
  .u-transition {
    bottom: 116rpx !important;
    background-color: rgba(0, 0, 0, 0.3) !important;
  }
  .u-slide-up-enter-active {
    background: transparent !important;
  }
}
</style>