<template>
  <view
    class="order-detail"
    :class="{
      'pad-bot':
        [1, 2, 3, 5].includes(info.status) &&
        (!info.refund_id ||
          (info.refund_id > 0 && info.refund_check_status == 3)),
    }"
  >
    <view v-if="info.is_delivery == 1" class="address-container">
      <view class="have-address">
        <view class="address-area">
          <view class="address-tip" v-if="info.addr_is_default == 1">默认</view>
          {{ getArea() }}
        </view>
        <view class="address-detail">
          {{ info.addr }}
        </view>
        <view class="address-people"
          ><text>{{ info.name }}</text
          >{{ info.phone }}</view
        >
      </view>
      <image class="address-img" src="../../../static/address.png" />
    </view>
    <view class="product-list">
      <view class="list-item">
        <image mode="aspectFill" :src="info.img_url" />
        <view class="product-info">
          <view class="product-title">{{ info.title }}</view>
          <view class="product-price"
            ><text
              >￥<text class="price-text">{{ info.sale_price }}</text></text
            >
            <view class="product-num">x {{ info.num }}</view>
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
        <text>¥{{ info.total_fee }}</text>
      </view>
      <view class="other-info-item">
        <text>运费</text>
        <text style="color: #f23333">+¥0.00</text>
      </view></view
    >
    <view class="other-info">
      <view class="other-info-item order-total">
        <text>订单合计</text>
        <text style="color: #f23333">¥{{ info.actual_fee }}</text>
      </view></view
    >
    <view class="other-info">
      <view class="other-info-item">
        <text>创建时间</text>
        <text>{{ info.created_at }}</text>
      </view>
      <view v-if="info.pay_time" class="other-info-item">
        <text>支付时间</text>
        <text>{{ info.pay_time }}</text>
      </view></view
    >
    <view v-if="info.deliver_no" class="other-info kd-box">
      <view class="other-info-item">
        <text>物流公司</text>
        <text>{{ getKdName(info.deliver_company) }}</text>
      </view>
      <view class="other-info-item kd-no">
        <text>快递单号</text>
        <view class="no-box">
          <view
            @click="copyText(item)"
            class="no-item"
            v-for="(item, index) in getKdNo(info.deliver_no)"
          >
            {{ item }}
            <view class="copy-btn">复制</view>
          </view></view
        >
      </view>
      <view class="other-info-item">
        <text>发货时间</text>
        <text>{{ info.deliver_at }}</text>
      </view></view
    >
    <view class="remark-box" v-if="info.remark">{{ info.remark }}</view>
    <view v-if="info.refund_id" class="other-info refund-info">
      <view class="other-info-item">
        <text>退款申请时间</text>
        <text>{{ refundInfo.updated_at }}</text>
      </view>
      <view class="other-info-item">
        <text>退款申请金额</text>
        <text>¥{{ refundInfo.money }}</text>
      </view>
      <view v-if="refundInfo.remark" class="other-info-item refund-reason">
        <view>退款原因</view>
        <view>{{ refundInfo.remark }}</view>
      </view>
      <view class="filelist-box" v-if="fileList.length">
        <view
          @click="prewFile(item)"
          class="filelist-item"
          v-for="(item, index) in fileList"
          :key="index"
        >
          <image
            class="image-style"
            v-if="item.type == 'image'"
            mode="aspectFill"
            :src="item.url"
          />
          <view class="video-box" v-else>
            <u-icon name="play-right" color="#FFFFFF" size="34"></u-icon>
          </view>
        </view>
      </view>
    </view>
    <view
      v-if="
        [1, 2, 3, 5].includes(info.status) &&
        (!info.refund_id ||
          (info.refund_id > 0 && info.refund_check_status == 3))
      "
    >
      <view class="safe-bottom"></view>
      <view class="fix-bottom-box">
        <view class="fix-bottom">
          <view class="pay-btn" @click="toHandle()">{{
            btnText[info.status]
          }}</view>
        </view>
      </view>
    </view>
    <u-modal
      :show="show"
      :show-cancel-button="true"
      @confirm="confirmDel"
      @cancel="cancelDel"
      confirm-color="#FF812F"
      content="确认收货?"
    ></u-modal>
    <prew-video ref="prewVideo" />
  </view>
</template>

<script>
import prewVideo from "../../components/prewVideo.vue";
export default {
  components: { prewVideo },
  data() {
    return {
      clickAble: true,
      id: 0,
      info: {},
      fileList: [],
      refundInfo: {},
      btnText: {
        1: "去支付",
        2: "申请退款",
        5: "确认收货",
        3: "立即评价",
      },
      show: false,
    };
  },
  onLoad(options) {
    if (options.id) {
      this.id = options.id;
      this.getOrder();
    }
  },
  methods: {
    copyText(text) {
      uni.setClipboardData({
        data: text,
        success: function () {
          uni.showToast({
            title: "复制成功",
            icon: "none",
            duration: 2000,
          });
        },
      });
    },
    getKdName(name) {
      if (name) {
        return name.split("-")[0];
      }
    },
    getKdNo(no) {
      if (no) {
        let arr = no.split(",");
        return arr;
      }
    },
    // 确认删除
    confirmDel() {
      this.API.order
        .checkOrder({ id: this.id })
        .then((res) => {
          uni.$emit("changeTab", 4);
          uni.navigateBack({
            delta: 1,
            success: () => {
              uni.showToast({
                title: "确认收货成功",
                icon: "none",
              });
            },
          });
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.confirmDel();
          }
        });
    },
    // 取消删除
    cancelDel() {
      this.show = false;
    },
    // 订单操作
    toHandle() {
      if (this.info.status == 1) {
        this.toPay();
      } else if (this.info.status == 2) {
        //退款
        uni.navigateTo({
          url: `/page_product/pages/order/refund?id=${this.id}`,
        });
      } else if (this.info.status == 3) {
        //评价
        uni.navigateTo({
          url: `/page_product/pages/order/evaluate?id=${item.id}&from=all`,
        });
      } else if (this.info.status == 5) {
        //确认收货
        this.show = true;
      }
    },
    toPay() {
      if (this.clickAble) {
        this.clickAble = false;
        this.API.order
          .rePayForPrePayId({ id: this.id })
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
                this.getDetail();
              },
              fail: (err) => {
                uni.showToast({
                  title: "支付取消",
                  icon: "none",
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
              this.clickAble = true;
              this.toPay();
            }
          });
      }
    },
    getDetail() {
      let dsq = setInterval(() => {
        this.API.order
          .getMyOrderInfo({ id: this.id })
          .then((res) => {
            clearInterval(dsq);
            console.log(res);
            if ([2, 3].includes(res.data.status)) {
              uni.$emit("changeTab", 2);
              uni.navigateBack({
                delta: 1,
                success: () => {
                  uni.showToast({
                    title: "支付取消",
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
              this.getDetail();
            }
          });
      }, 1000);
    },
    // 获取详情
    getOrder() {
      this.API.order
        .getMyOrderInfo({ id: this.id })
        .then((res) => {
          console.log(res);
          this.info = {
            ...res.data,
            img_url: res.data.img_url ? res.data.img_url.split(",")[0] : "",
          };
          if (res.data.refund_id > 0) {
            this.getRefund();
          }
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.getOrder();
          }
        });
    },
    // 获取地址
    getArea() {
      let str = this.info.complete_addr.split(this.info.addr);
      return str[0];
    },
    //   预览
    prewFile(item) {
      if (item.type == "image") {
        uni.previewImage({
          current: 0, // 当前显示图片索引
          urls: [item.url], // 需要预览的图片http链接列表
        });
      } else {
        this.$refs.prewVideo.open(item.url);
      }
    },
    getRefund() {
      this.API.order
        .getApplyRefundInfo({ order_id: +this.id })
        .then((res) => {
          this.refundInfo = res.data;
          let arr = res.data.refund_img_url
            ? res.data.refund_img_url.split(",")
            : [];
          this.fileList = arr.map((el) => {
            let fileType = el.substring(el.lastIndexOf(".") + 1).toLowerCase();
            return {
              type: ["jpg", "jpeg", "png"].includes(fileType)
                ? "image"
                : "video",
              url: el,
            };
          });
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.getRefund();
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.order-detail {
  box-sizing: border-box;
  min-height: 100vh;
  overflow: hidden;
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
          .product-num {
            font-family: DIN Alternate;
            font-weight: bold;
            font-size: 26rpx;
            color: #111111;
          }
        }
      }
    }
    .list-item:last-child {
      margin-bottom: 0;
    }
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
      margin-bottom: 45rpx;
    }
    .other-info-item:last-child {
      margin-bottom: 0 !important;
    }
  }
  .kd-box {
    .kd-no {
      display: flex;
      align-items: flex-start;

      .no-box {
        width: calc(100% - 200rpx);

        .no-item {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-bottom: 20rpx;

          .copy-btn {
            font-family: PingFang SC;
            font-weight: 400;
            font-size: 22rpx;
            color: #333333;
            padding: 5rpx 0;
            width: 70rpx;
            text-align: center;
            border: 1rpx solid #333333;
            margin-left: 30rpx;
            border-radius: 10rpx;
          }
        }
        .no-item:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  .remark-box {
    background: #ffffff;
    border-radius: 20rpx;
    padding: 39rpx 29rpx 29rpx 36rpx;
  }
  .filelist-box {
    display: flex;
    align-items: flex-start;
    background: white;
    .filelist-item {
      position: relative;
      margin-right: 30rpx;
      & > image {
        width: 140rpx;
        height: 140rpx;
        border-radius: 20rpx;
      }
      .video-box {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 140rpx;
        height: 140rpx;
        border-radius: 20rpx;
        background: rgba(0, 0, 0, 0.5);
      }
    }
  }
  .refund-info {
    .refund-reason {
      display: flex;
      align-items: flex-start;
      view:first-child {
        width: 200rpx;
      }
      view:last-child {
        text-align: right;
        width: calc(100% - 200rpx);
      }
    }
  }
  .safe-bottom {
    padding-bottom: env(safe-area-inset-bottom);
  }
  .fix-bottom-box {
    z-index: 10;
    background: #ffffff;
    box-shadow: 0rpx 0rpx 7rpx 1rpx rgba(0, 0, 0, 0.04);
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 25rpx 75rpx;
    box-sizing: border-box;
    .fix-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: env(safe-area-inset-bottom);
    }
    .pay-btn {
      width: 100%;
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
}
.pad-bot {
  padding-bottom: 146rpx;
}
</style>