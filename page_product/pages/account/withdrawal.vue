<template>
  <view class="withdrawal">
    <view class="bg"></view>
    <view class="tx-content">
      <view class="tx-input-box">
        <view class="tx-input-label">提现金额</view>
        <view class="input-box">
          <view class="price-text">¥</view
          ><u--input
            type="number"
            placeholder="请输入提现金额"
            v-model="txPrice"
            placeholderStyle="font-size: 24rpx;color: #666666;"
            border="none"
          ></u--input>
        </view>
        <view class="total-box">
          <view
            >可提现<text>{{ ablePrice }}鸥币</text></view
          >
          <view class="right-text" @click="allTx()">全部提现</view>
        </view>
      </view>
      <view class="tx-mode-box">
        <view class="tx-mode-label">提现方式</view>
        <view class="tx-mode-list">
          <u-radio-group placement="column" v-model="pay_type">
            <view
              class="tx-mode-item"
              v-for="(item, index) in list"
              :key="index"
            >
              <view class="tx-mode-left">
                <image :src="item.src"></image>
                {{ item.name }}
              </view>
              <u-radio activeColor="#f89f12" :name="item.name"></u-radio>
            </view>
          </u-radio-group>
        </view>
      </view>
      <view class="tx-btn-box">
        <view class="tx-btn" @click="submitTx()">提交申请</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      pay_type: "微信线下打款",
      list: [
        // {
        //   src: "/static/icon-lq.png",
        //   name: "微信零钱",
        //   enable: true,
        // },
        {
          src: "/static/icon-wx.png",
          name: "微信线下打款",
          enable: true,
        },
        {
          src: "/static/icon-zfb.png",
          name: "支付宝线下打款",
          enable: true,
        },
        {
          src: "/static/icon-yl.png",
          name: "银联线下打款",
          enable: true,
        },
      ],
      txPrice: "",
      ablePrice: 0,
    };
  },
  onLoad() {
    this.getPirce();
  },
  methods: {
    // 提现
    submitTx() {
      if (!this.txPrice) {
        uni.showToast({
          title: "请输入提现金额",
          icon: "none",
        });
        return false;
      } else if (this.txPrice == 0) {
        uni.showToast({
          title: "提现鸥币必须大于0",
          icon: "none",
          className: "tx-error",
        });
        return false;
      } else if (this.txPrice > this.ablePrice) {
        uni.showToast({
          title: "输入的数字不能大于可提现鸥币",
          icon: "none",
          className: "tx-error",
        });
        return false;
      }
      uni.showLoading({
        title: "提现中...",
      });
      let param = {
        money: this.txPrice,
        pay_type: this.pay_type,
      };
      this.API.home
        .applyWithdraw(param)
        .then((res) => {
          console.log(res);
          uni.hideLoading();
          uni.navigateBack({
            delta: 1,
            success: () => {
              uni.showToast({
                title: "提交成功",
                icon: "none",
              });
            },
          });
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.submitTx();
          } else {
            uni.hideLoading();
          }
        });
    },
    // 全部提现
    allTx() {
      this.txPrice = this.ablePrice;
    },
    getPirce() {
      this.API.home
        .getMyMoney({})
        .then((res) => {
          console.log(res);
          this.ablePrice = this.$public.removeTrailingZeros(res.data.money);
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.getPirce();
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.withdrawal {
  min-height: 100vh;
  box-sizing: border-box;
  background: #fafafa;
  position: relative;
  overflow: hidden;
  .bg {
    top: 0;
    position: absolute;
    width: 100vw;
    height: 136rpx;
    background: #ff812f;
  }
  .tx-content {
    margin-top: 69rpx;
    position: relative;
    z-index: 1;
    .tx-input-box {
      padding: 56rpx 60rpx 52rpx;
      background: #ffffff;
      border-radius: 20rpx 60rpx 20rpx 60rpx;
      .tx-input-label {
        font-family: PingFang SC;
        font-weight: 600;
        font-size: 28rpx;
        color: #000000;
      }
      .input-box {
        padding: 50rpx 0;
        display: flex;
        align-items: center;
        border-bottom: 1rpx solid #e6e6e6;
        .price-text {
          font-family: PingFang SC;
          font-weight: 600;
          font-size: 56rpx;
          color: #000000;
          margin-right: 40rpx;
        }
      }
      .total-box {
        margin-top: 49rpx;
        font-family: PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #000000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        text {
          margin-left: 8rpx;
          color: #ff812f;
        }
        .right-text {
          font-family: PingFang SC;
          font-weight: 400;
          font-size: 24rpx;
          color: #333333;
        }
      }
    }
    .tx-mode-box {
      margin-top: 40rpx;
      border-radius: 20rpx 60rpx 20rpx 60rpx;
      padding: 40rpx 30rpx;
      background: #ffffff;
      .tx-mode-label {
        font-family: PingFang SC;
        font-weight: 600;
        font-size: 28rpx;
        color: #333333;
        margin-bottom: 30rpx;
      }
      .tx-mode-list {
        .tx-mode-item {
          margin-bottom: 20rpx;
          border-radius: 20rpx;
          border: 1px solid #e5e5e5;
          padding: 18rpx 30rpx 18rpx 21rpx;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .tx-mode-left {
            display: flex;
            align-items: center;
            font-family: PingFang SC;
            font-weight: 400;
            font-size: 26rpx;
            color: #333333;
            image {
              width: 64rpx;
              height: 64rpx;
              margin-right: 11rpx;
            }
          }
        }
        .tx-mode-item:last-child {
          margin-bottom: 0;
        }
      }
    }
    .tx-btn-box {
      margin: 136rpx 0;
      display: flex;
      justify-content: center;
      .tx-btn {
        font-family: PingFang SC;
        font-weight: 500;
        font-size: 28rpx;
        color: #ffffff;
        width: 600rpx;
        height: 98rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #ff812f;
        border-radius: 100rpx;
      }
    }
  }
}
</style>