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
              <view class="price-num">{{ priceInfo.success_money }}</view>
            </view>
          </view>
          <view class="price-right">
            <view class="btn-price">
              <text>{{ priceInfo.money }}</text>
              <view class="tx-btn" @click="goTx()">提现</view>
            </view>
            <view class="wjs-price">
              <view class="label-text">未结算佣金</view>
              <view class="price-num">{{ priceInfo.apply_money }}</view>
            </view>
          </view>
        </view>
      </view>
      <view class="tab-box">
        <view
          class="tab-item"
          @click="changeTab(index)"
          v-for="(item, index) in list"
          :key="index"
        >
          {{ item.label }}({{
            priceInfo[item.key] ? priceInfo[item.key] : 0
          }}人)
          <view class="heng" v-if="current == index"></view>
        </view>
      </view>
    </view>
    <view :style="'margin-top:' + contentHeight + 'px;'" class="list-box">
      <view
        class="list-item"
        v-for="(item, index) in referralList"
        :key="index"
      >
        <view class="avatar-box">
          <view
            class="comment-one-avatar"
            :style="'background: url(' + item.avatar_url + ');'"
          ></view>
        </view>
        <view class="list-right">
          <view class="list-right-top">
            <view class="right-name">{{ item.nick_name }}</view>
            <view class="right-num-money">
              <view class="right-num">{{ item.order_num }}个订单</view>
              <view class="right-money">{{ item.money }}元</view>
            </view>
          </view>
          <view class="list-right-bottom">
            <view> 绑定时间：{{ item.pid_bind_at }} </view>
            <view> 推广{{ item.extend_num }}人 </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 底部垫层 -->
    <view class="space-line-bottom">
      <uni-load-more :status="isLoading"></uni-load-more>
    </view>
    <view class="safe-bottom"></view
  ></view>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      contentHeight: 0,
      list: [
        { label: "一级分销", key: "one_level_num", val: 1 },
        { label: "二级分销", key: "second_level_num", val: 2 },
      ],
      priceInfo: { money: "0.00", success_money: "0", apply_money: "0" },
      isLoading: "loading",
      theGetMomentsListPage: 1,
      theGetMomentsListPagesize: 10,
      referralList: [
        {
          id: 1,
          nick_name: "用户1",
          avatar_url:
            "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/v2/20240611/2024-06-11_09_43_03_avatar_0_22.png",
          money: "20",
          pid_bind_at: "2024-09-20 12:00",
          order_num: 20,
          extend_num: 10,
        },
        {
          id: 1,
          nick_name: "用户2",
          avatar_url:
            "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/v2/20240611/2024-06-11_09_43_03_avatar_0_22.png",
          money: "10",
          pid_bind_at: "2024-09-22 12:00",
          order_num: 25,
          extend_num: 8,
        },
      ],
    };
  },
  onLoad(options) {
    let query = uni.createSelectorQuery().in(this);
    query
      .select(".fix-top")
      .boundingClientRect((data) => {
        this.contentHeight = data.height;
      })
      .exec();
  },
  onShow() {
    this.getPirce("list");
  },
  // 页面触底的监听事件，配合pages.json中的"onReachBottomDistance": 0，0的位置写距离底部的距离
  onReachBottom() {
    // 触底后动画效果开启
    this.isLoading = "loading";
    // 调用接口
    this.getList();
  },
  // 监听下拉动作
  onPullDownRefresh() {
    // 重置获取的页码
    this.theGetMomentsListPage = 1;
    // 重置数组
    this.referralList = [];
    // 异步转同步调用
    (async () => {
      await this.getList();
      // 等待接口返回后，取消下拉刷新动画
      uni.stopPullDownRefresh();
    })();
  },
  methods: {
    goTx() {
      uni.navigateTo({
        url: "/page_product/pages/account/withdrawal",
      });
    },
    changeTab(index) {
      this.current = index;
      // 重置数组
      this.referralList = [];
      this.theGetMomentsListPage = 1;
      this.getList();
    },
    getPirce(type) {
      this.API.home
        .getMyMoney({})
        .then((res) => {
          console.log(res);
          this.priceInfo = {
            ...res.data,
            money: this.$public.removeTrailingZeros(res.data.money),
          };
          if (type) {
            this.getList();
          }
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.getPirce(type);
          }
        });
    },
    getList() {
      this.isLoading = "loading";
      let param = {
        type: this.list[this.current].val,
        page: this.theGetMomentsListPage,
        pagesize: this.theGetMomentsListPagesize,
      };
      this.API.home
        .getReferralList(param)
        .then((res) => {
          console.log(res);
          // 如果是请求第一页，证明是首次请求，就重置一下
          if (this.theGetMomentsListPage == 1) {
            this.referralList = [];
          }
          if (res.data.length != 0) {
            for (let i = 0; i < res.data.length; i++) {
              this.referralList.push({
                ...res.data[i],
              });
            }
            this.isLoading = "no-more"; // 取消加载动画
            // 页面+1
            this.theGetMomentsListPage += 1;
          } else {
            this.isLoading = "no-more"; // 取消加载动画
          }
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.getList();
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.account {
  box-sizing: border-box;
  .fix-top {
    width: 100vw;
    background: #ff812f;
    position: fixed;
    top: 0;
    .bg {
      margin: -80rpx 0 0 236rpx;
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
  .tab-box {
    border-bottom: 20rpx solid #f4f5f7;
    margin: 33rpx 0 -5rpx;
    display: flex;
    background: #ffffff;
    border-radius: 50rpx 50rpx 0rpx 0rpx;
    .tab-item {
      flex: 1;
      padding: 40rpx 0;
      text-align: center;
      position: relative;
      display: flex;
      justify-content: center;
      font-family: PingFang SC;
      font-weight: 500;
      font-size: 28rpx;
      color: #000000;
      .heng {
        position: absolute;
        bottom: 0;
        width: 40rpx;
        height: 10rpx;
        background: #ff812f;
        border-radius: 20rpx;
      }
    }
  }
  .list-box {
    padding: 4rpx 30rpx 0;
    .list-item {
      display: flex;
      .comment-one-avatar {
        margin-right: 20rpx;
        border-radius: 100%;
        width: 91rpx;
        height: 91rpx;
        padding: 0 !important;
        background-repeat: no-repeat !important;
        background-size: cover !important;
      }
      .avatar-box,
      .list-right {
        padding: 26rpx 0 21rpx;
      }
      .list-right {
        height: 91rpx;
        width: calc(100% - 111rpx);
        border-bottom: 1rpx solid #f4f5f7;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .list-right-top {
          display: flex;
          align-items: center;
          font-family: PingFang SC;
          font-weight: 400;
          font-size: 22rpx;
          color: #000000;
          .right-name {
            font-family: PingFang SC;
            font-weight: 600;
            font-size: 26rpx;
            color: #000000;
            width: 50%;
          }
          .right-num-money {
            width: 50%;
            display: flex;
            align-items: center;
            & > view {
              flex: 1;
            }
            .right-money {
              text-align: right;
            }
          }
        }
        .list-right-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: PingFang SC;
          font-weight: 400;
          font-size: 22rpx;
          color: #000000;
        }
      }
    }
  }
  .space-line-bottom {
    padding-top: 40rpx;
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