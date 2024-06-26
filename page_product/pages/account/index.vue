<template>
  <view class="account">
    <view class="fix-top">
      <view class="bg">
        <image
          src="https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/v2/20240626/2024-06-26_17_44_59_0_22.png"
        ></image>
      </view>
      <view class="account-info">
        <view class="account-label">可提现</view>
        <view class="price-box">
          <view class="price-left">
            <text class="total-price">{{ priceInfo.money }}</text>
            <view class="tx-price">
              <view class="label-text">已提现</view>
              <view class="price-num">2.2</view>
            </view>
          </view>
          <view class="price-right">
            <view class="btn-price">
              <text>{{ priceInfo.money }}</text>
              <view class="tx-btn">提现</view>
            </view>
            <view class="wjs-price">
              <view class="label-text">未结算佣金</view>
              <view class="price-num">6.6</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 底部垫层 -->
    <!-- <view class="space-line-bottom">
      <uni-load-more :status="isLoading"></uni-load-more>
    </view> -->
    <view class="safe-bottom"></view
  ></view>
</template>

<script>
export default {
  data() {
    return {
      priceInfo: { money: "0.00" },
      isLoading: "loading",
      theGetMomentsListPage: 1,
      theGetMomentsListPagesize: 10,
      evaluateList: [],
    };
  },
  onLoad(options) {
    // this.getEvaluate();
    this.getPirce();
  },
  // 页面触底的监听事件，配合pages.json中的"onReachBottomDistance": 0，0的位置写距离底部的距离
  onReachBottom() {
    // 触底后动画效果开启
    this.isLoading = "loading";
    // 调用接口
    this.getEvaluate();
  },
  // 监听下拉动作
  onPullDownRefresh() {
    // 重置获取的页码
    this.theGetMomentsListPage = 1;
    // 重置数组
    this.evaluateList = [];
    // 异步转同步调用
    (async () => {
      await this.getEvaluate();
      // 等待接口返回后，取消下拉刷新动画
      uni.stopPullDownRefresh();
    })();
  },
  methods: {
    getPirce() {
      this.API.home
        .getMyMoney({})
        .then((res) => {
          console.log(res);
          this.priceInfo = res.data;
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.getPirce();
          }
        });
    },
    //   预览
    prewFile(item, type) {
      if (type == "image") {
        uni.previewImage({
          current: 0, // 当前显示图片索引
          urls: [item], // 需要预览的图片http链接列表
        });
      } else {
        this.$refs.prewVideo.open(item);
      }
    },
    getType(url) {
      let fileType = url.substring(url.lastIndexOf(".") + 1).toLowerCase();
      return ["jpg", "jpeg", "png"].includes(fileType);
    },
    getEvaluate() {
      this.isLoading = "loading";
      let param = {
        product_id: this.id,
        page: this.theGetMomentsListPage,
        pagesize: this.theGetMomentsListPagesize,
      };
      this.API.home
        .getValuationList(param)
        .then((res) => {
          console.log(res);
          // 如果是请求第一页，证明是首次请求，就重置一下
          if (this.theGetMomentsListPage == 1) {
            this.evaluateList = [];
          }
          if (res.data.length != 0) {
            for (let i = 0; i < res.data.length; i++) {
              console.log(res.data[i].img_url);
              this.evaluateList.push({
                ...res.data[i],
                img_url: res.data[i].img_url
                  ? res.data[i].img_url.split(",")
                  : "",
              });
            }
            this.isLoading = "no-more"; // 取消加载动画
            // 页面+1
            this.theGetMomentsListPage += 1;
            console.log(this.evaluateList);
          } else {
            this.isLoading = "no-more"; // 取消加载动画
          }
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.getEvaluate();
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.account {
  .fix-top {
    width: 100vw;
    height: 542rpx;
    overflow: hidden;
    background: #ff812f;
    position: fixed;
    top: 0;
    .bg {
      margin: -115rpx 0 0 236rpx;
      top: 0;
      width: 100vw;
      height: 760rpx;
      position: absolute;
      background-image: url("https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/v2/20240626/2024-06-26_17_44_35_0_22.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      image {
        width: 256rpx;
        height: 256rpx;
      }
    }
  }
  .account-info {
    padding: 89rpx 48rpx 0;
    .account-label {
      font-family: PingFang SC;
      font-weight: 600;
      font-size: 28rpx;
      color: #ffffff;
    }
    .price-box {
      margin-top: 40rpx;
      display: flex;
      & > view {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .wjs-price,
        .tx-price {
          margin-top: 61rpx;
        }
        .label-text {
          font-family: PingFang SC;
          font-weight: 400;
          font-size: 28rpx;
          color: #ffffff;
        }
        .price-num {
          margin-top: 32rpx;
          font-family: DIN Alternate;
          font-weight: bold;
          font-size: 50rpx;
          color: #ffffff;
        }
      }
      .price-left {
        .total-price {
          font-family: DIN Alternate;
          font-weight: bold;
          font-size: 70rpx;
          color: #ffffff;
        }
      }
      .price-right {
        margin-left: 70rpx;

        .tx-btn {
          width: 129rpx;
          padding: 20rpx 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: PingFang SC;
          font-weight: 400;
          font-size: 26rpx;
          color: #ffffff;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 100rpx;
          position: absolute;
        }
      }

      .btn-price {
        display: flex;
        flex-direction: column;
        position: relative;
        justify-content: center;
        & > text {
          font-family: DIN Alternate;
          font-weight: bold;
          font-size: 70rpx;
          color: #ffffff;
          visibility: hidden;
        }
      }
    }
  }
  .space-line-bottom {
    margin-top: 40rpx;
  }
  .flex-align {
    display: flex;
    align-items: center;
  }
  .safe-bottom {
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>