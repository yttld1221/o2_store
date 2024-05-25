<template>
  <view class="pay">
    <view class="address-container">
      <view class="have-address" v-if="addressInfo && addressInfo.id">
        <view class="address-area">
          <view class="address-tip" v-if="addressInfo.is_default == 1"
            >默认</view
          >
          {{ getArea() }}
        </view>
        <view class="address-detail">
          {{ addressInfo.addr }}
          <u-icon
            @click="toAddress()"
            name="arrow-right"
            color="#000000"
            size="12"
          ></u-icon>
        </view>
        <view class="address-people"
          ><text>{{ addressInfo.name }}</text
          >{{ addressInfo.phone }}</view
        >
      </view>
      <view class="no-address" v-else @click="toAddress()">
        <u-icon size="22" color="#000000" name="plus-circle"></u-icon>
        <text class="add-new">新增收货地址</text>
      </view>
      <image class="address-img" src="../../../static/address.png" />
    </view>
    <view class="product-list">
      <view class="list-item" v-for="(item, index) in list" :key="index">
        <image mode="aspectFill" :src="item.url" />
        <view class="product-info">
          <view class="product-title">{{ item.title }}</view>
          <view class="product-price"
            ><text
              >￥<text class="price-text">{{ item.price }}</text></text
            >
            <u-number-box v-model="item.num">
              <view slot="minus" class="minus">
                <u-icon name="minus" color="#111111" size="16"></u-icon>
              </view>
              <text
                slot="input"
                style="width: 50px; text-align: center"
                class="input"
                >{{ item.num }}</text
              >
              <view slot="plus" class="plus">
                <u-icon name="plus" color="#111111" size="16"></u-icon>
              </view>
            </u-number-box>
          </view>
        </view>
      </view>
    </view>
    <view class="other-info">
      <view class="other-info-item">
        <text>配送</text>
        <text>无配送</text>
      </view>
      <view class="other-info-item">
        <text>优惠券</text>
        <text style="color: #f23333">无可用</text>
      </view>
    </view>
    <view class="other-info">
      <view class="other-info-item">
        <text>商品金额</text>
        <text>¥{{ priceall }}</text>
      </view>
      <view class="other-info-item">
        <text>运费</text>
        <text style="color: #f23333">+¥0.00</text>
      </view></view
    >
    <view class="remark-box">
      <u--textarea
        height="94"
        maxlength="150"
        border="none"
        autoHeight
        v-model="remark"
        placeholder="请输入备注信息..."
        count
      ></u--textarea>
    </view>
    <view class="safe-bottom"></view>
    <view class="fix-bottom-box">
      <view class="fix-bottom">
        <view class="pay-price"
          >合计：<text
            >¥<text class="price-text">{{ priceall }}</text></text
          ></view
        >
        <view class="pay-btn" @click="toPay()">立即支付</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      list: [],
      addressInfo: {},
      remark: "",
      clickAble: true,
    };
  },
  onLoad(options) {
    console.log(options);
    if (options.product) {
      this.list = JSON.parse(decodeURIComponent(options.product));
      this.getAddress();
    }
    uni.$on("getAddress", (data) => {
      console.log(data);
      this.addressInfo = data.addressInfo;
    });
  },
  onShow() {},
  computed: {
    // 计算总价
    priceall: function () {
      var result = 0;
      for (var i in this.list) {
        result += this.list[i].price * this.list[i].num;
      }
      return parseFloat(result).toFixed(2);
    },
  },
  methods: {
    // 支付
    toPay() {
      if (this.clickAble) {
        this.clickAble = false;
        let products = this.list.map((el) => {
          return {
            task_id: el.id,
            num: el.num,
            is_read: 2,
          };
        });
        let params = {
          products,
          pid: this.$store.state.sceneId ? this.$store.state.sceneId : 0,
          address_id: this.addressInfo.id,
          remark: this.remark,
        };
        this.API.home
          .orderForPrePayId(params)
          .then((result) => {
            setTimeout(() => {
              this.clickAble = true;
            }, 1000);
            let newData = result.data;
            uni.requestPayment({
              provider: "wxpay",
              timeStamp: newData.timeStamp,
              nonceStr: newData.nonceStr,
              package: newData.package,
              signType: newData.signType,
              paySign: newData.paySign,
              success: (res1) => {
                this.getDetail(newData.orderId);
              },
              fail: (err) => {
                uni.redirectTo({
                  url: "/page_product/pages/order/index?current=1",
                  success: () => {
                    uni.showToast({
                      title: "支付取消",
                      icon: "none",
                    });
                  },
                });
              },
            });
          })
          .finally(() => {
            this.clickAble = true;
          })
          .catch(async (err) => {
            if (err.code == 410) {
              await this.$store.dispatch("toLogon", {});
              this.toPay();
            }
          });
      }
    },
    getDetail(id) {
      let dsq = setInterval(() => {
        this.API.home
          .getMyOrderInfo({ id })
          .then((res) => {
            clearInterval(dsq);
            console.log(res);
            if ([2, 3].includes(res.data.status)) {
              uni.redirectTo({
                url: "/page_product/pages/order/index?current=2",
                success: () => {
                  uni.showToast({
                    title: "支付成功",
                    icon: "none",
                  });
                },
              });
            }
          })
          .catch(async (err) => {
            if (err.code == 410) {
              clearInterval(dsq);
              await this.$store.dispatch("toLogon", {});
              this.getDetail(id);
            }
          });
      }, 1000);
    },
    // 获取地址
    getArea() {
      let str = this.addressInfo.complete_addr.split(this.addressInfo.addr);
      return str[0];
    },
    // 跳转地址管理
    toAddress() {
      uni.navigateTo({
        url: "/page_product/pages/address/index?from=pay",
      });
    },
    // 获取默认地址
    getAddress() {
      this.API.home
        .getMyReceiveAddrs({ is_default: 1 })
        .then((res) => {
          console.log(res);
          if (res.data.length && res.data[0].is_default == 1) {
            this.addressInfo = res.data[0];
          }
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.getAddress();
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.pay {
  box-sizing: border-box;
  min-height: 100vh;
  padding-bottom: 146rpx;
  background: #fafafa;
  .address-container {
    background: #ffffff;
    position: relative;
    .have-address {
      padding: 26rpx 30rpx 43rpx;
      .address-area {
        display: flex;
        align-items: center;
        font-family: PingFang SC;
        font-weight: 300;
        font-size: 22rpx;
        color: #333333;
        .address-tip {
          width: 50rpx;
          height: 28rpx;
          background: #ff812f;
          border-radius: 4rpx;
          font-family: PingFang SC;
          font-weight: 300;
          font-size: 18rpx;
          color: #ffffff;
          line-height: 28rpx;
          text-align: center;
          margin-right: 15rpx;
        }
      }
      .address-detail {
        font-family: PingFang SC;
        font-weight: 400;
        font-size: 32rpx;
        color: #000000;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 26rpx 0 24rpx;
      }
      .address-people {
        font-family: PingFang SC;
        font-weight: 300;
        font-size: 22rpx;
        color: #333333;
        text {
          margin-right: 16rpx;
        }
      }
    }
    .no-address {
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      padding: 40rpx 0;
      .add-new {
        font-size: 30rpx;
        font-weight: 400;
        color: #000000;
        margin-left: 24rpx;
      }
    }
  }
  .address-img {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 4rpx;
  }
  .product-list {
    margin: 20rpx 0;
    padding: 38rpx 30rpx;
    background: #ffffff;
    border-radius: 20rpx;
    .list-item {
      display: flex;
      align-items: center;
      image {
        width: 160rpx;
        height: 160rpx;
        background: #ffffff;
        border-radius: 6rpx;
        border: 1px solid #eeeeee;
        margin-right: 30rpx;
      }
      .product-info {
        box-sizing: border-box;
        height: 160rpx;
        width: calc(100% - 190rpx);
        display: flex;
        flex-direction: column;
        justify-content: center;
        .product-title {
          font-family: PingFang SC;
          font-weight: 500;
          font-size: 24rpx;
          color: #393a3e;
          margin-bottom: 32rpx;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .product-price {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: PingFang SC;
          font-weight: 300;
          font-size: 22rpx;
          color: #f23333;
          display: flex;
          align-items: flex-end;
          line-height: 23rpx;
          .price-text {
            font-size: 34rpx;
          }
        }
      }
    }
    .list-item:last-child {
      margin-bottom: 0;
    }
  }
  .minus {
    width: 32rpx;
    height: 32rpx;
    border-width: 1px;
    border-color: #cacaca;
    border-style: solid;
    border-radius: 50%;
    @include flex;
    justify-content: center;
    align-items: center;
  }

  .input {
    padding: 0 10px;
    width: auto !important;
    font-family: DIN;
    font-weight: 500;
    font-size: 24rpx;
    color: #111111;
  }

  .plus {
    width: 32rpx;
    height: 32rpx;
    border-width: 1px;
    border-color: #cacaca;
    border-style: solid;
    border-radius: 50%;
    @include flex;
    justify-content: center;
    align-items: center;
  }
  .other-info {
    margin-bottom: 20rpx;
    padding: 48rpx 31rpx 48rpx 36rpx;
    background: #ffffff;
    border-radius: 20rpx;
    .other-info-item {
      font-family: PingFang SC;
      font-weight: 300;
      font-size: 26rpx;
      color: #333333;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .other-info-item:first-child {
      margin-bottom: 45rpx;
    }
  }
  .remark-box {
    background: #ffffff;
    border-radius: 20rpx;
    padding: 39rpx 29rpx 29rpx 36rpx;
  }
  .fix-bottom-box {
    z-index: 10;
    background: #ffffff;
    box-shadow: 0rpx 0rpx 7rpx 1rpx rgba(0, 0, 0, 0.04);
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 25rpx 30rpx;
    .fix-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: env(safe-area-inset-bottom);
    }
    .pay-price {
      font-family: PingFang SC;
      font-weight: 300;
      font-size: 24rpx;
      color: #797979;
      display: flex;
      align-items: flex-end;
      line-height: 26rpx;
      text {
        font-family: PingFang SC;
        font-weight: 300;
        font-size: 22rpx;
        color: #f23333;
        line-height: 23rpx;
      }
      .price-text {
        font-size: 40rpx;
      }
    }
    .pay-btn {
      width: 200rpx;
      height: 76rpx;
      background: linear-gradient(-55deg, #ff9b5a, #ff812f);
      border-radius: 38rpx;
      font-family: PingFang SC;
      font-weight: 400;
      font-size: 26rpx;
      color: #ffffff;
      line-height: 76rpx;
      text-align: center;
    }
  }
  .safe-bottom {
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>