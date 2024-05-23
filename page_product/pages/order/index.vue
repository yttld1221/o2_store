<template>
  <view class="order">
    <view class="the-line-4">
      <view
        @click="line_4_itemsSelected(index)"
        class="the-line-4-item"
        v-for="(item, index) in line_4_items"
      >
        <view class="the-line-4-item-name">{{ item.label }}</view>
        <view v-if="index == current" class="the-line-4-item-line"></view>
      </view>
    </view>
    <view :style="'margin-top:' + contentHeight + 'px;'" class="list-container">
      <view
        @click="toDetail(item)"
        v-for="(item, index) in orderList"
        :key="index"
        class="list-item"
      >
        <view class="list-item-top flex-align">
          <view class="top-left flex-align">
            <view class="round flex-align">
              <view class="small-round"></view>
              <view class="big-round"></view>
              <view class="small-round"></view>
            </view>
            <text
              v-if="
                current == 5 ||
                (current == 0 &&
                  item.refund_id > 0 &&
                  [1, 2].includes(item.refund_check_status))
              "
              >{{ refundText[item.refund_check_status] }}</text
            >
            <text v-else>{{ statusText[item.status] }}</text>
          </view>
          <view
            @click.native.stop="delOrder(item, index, 'del')"
            class="top-right flex-align"
            v-if="item.status == 4"
          >
            <u-icon name="trash" color="#8A8A8A" size="14"></u-icon>
          </view>
        </view>
        <view class="list-item-center flex-align">
          <image mode="aspectFill" :src="item.img_url" />
          <view class="product-info">
            <view class="product-title">{{ item.title }}</view>
            <view class="product-price"
              ><text
                >￥<text class="price-text">{{ item.sale_price }}</text></text
              >
            </view>
          </view>
        </view>
        <view class="list-item-bottom flex-align">
          <view v-if="item.status == 1" class="flex-align">
            <view
              class="other-btn"
              @click.native.stop="delOrder(item, index, 'cancel')"
              >取消订单</view
            >
            <view class="detail-btn" @click.native.stop="toHandle(item, index)"
              >去支付</view
            >
          </view>
          <view
            v-else-if="
              [2, 3, 5].includes(item.status) &&
              (!item.refund_id ||
                (item.refund_id > 0 && item.refund_check_status == 3))
            "
            @click.native.stop="toHandle(item, index)"
            class="other-btn"
            >{{ btnText[item.status] }}</view
          >
          <view
            @click.native.stop="toDetail(item)"
            v-if="![1].includes(item.status)"
            class="detail-btn"
            >查看订单</view
          >
        </view>
      </view>
    </view>
    <!-- 底部垫层 -->
    <view class="space-line-bottom" @click="getMomentsList()">
      <uni-load-more
        :status="isLoading"
        :content-text="contentText"
      ></uni-load-more>
    </view>
    <u-modal
      :show="show"
      :show-cancel-button="true"
      @confirm="confirmDel"
      @cancel="cancelDel"
      confirm-color="#FF812F"
      :content="
        content == 'del'
          ? '确认删除订单?'
          : content == 'send'
          ? '确认收货?'
          : '确认取消订单?'
      "
    ></u-modal>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      clickAble: true,
      content: "",
      delId: 0,
      handleIndex: "",
      show: false,
      // 用于 uni-load-more
      contentText: {
        contentdown: "查看更多",
        contentrefresh: "加载中...",
        contentnomore: "到底了，可点击此处手动加载~",
      },
      // 最后的加载组件的加载动画效果，
      isLoading: "loading",
      btnText: { 2: "申请退款", 5: "确认收货", 3: "立即评价" },
      statusText: {
        1: "待支付",
        2: "待发货",
        5: "待收货",
        3: "待评价",
        6: "已完成",
        4: "已取消",
      },
      refundText: {
        1: "退款中",
        2: "退款成功",
        3: "退款失败",
      },
      line_4_items: [
        { label: "全部", value: 0 },
        { label: "待支付", value: 1 },
        { label: "待发货", value: 2 },
        { label: "待收货", value: 5 },
        { label: "待评价", value: 3 },
        { label: "退款/售后", value: 0 },
      ],
      current: 0,
      // 用于分页加载传参
      // 当前获取的校园墙页码，每次需要+1
      theGetMomentsListPage: 1,
      theGetMomentsListPagesize: 5,
      orderList: [],
      contentHeight: 0,
    };
  },
  onLoad(options) {
    if (options.current) {
      this.current = options.current;
    }
    let query = uni.createSelectorQuery().in(this);
    query
      .select(".the-line-4")
      .boundingClientRect((data) => {
        this.contentHeight = data.height;
      })
      .exec();
    this.theGetMomentsListPage = 1;
    this.getMomentsList();

    uni.$on("changeTab", (data) => {
      console.log(data);
      this.line_4_itemsSelected(data);
    });
  },
  onShow() {
    // --------------------------------------------------------------调用初始数据--------------------------------------------------------------
    // --------------------------------------------------------------调用初始数据--------------------------------------------------------------
    // --------------------------------------------------------------调用初始数据--------------------------------------------------------------
  },
  // 页面触底的监听事件，配合pages.json中的"onReachBottomDistance": 0，0的位置写距离底部的距离
  onReachBottom() {
    // 触底后动画效果开启
    this.isLoading = "loading";
    // 调用接口
    this.getMomentsList();
  },
  // 监听下拉动作
  onPullDownRefresh() {
    // 重置获取的页码
    this.theGetMomentsListPage = 1;
    // 重置数组
    this.orderList = [];
    // 异步转同步调用
    (async () => {
      await this.getMomentsList();
      // 等待接口返回后，取消下拉刷新动画
      uni.stopPullDownRefresh();
    })();
  },
  methods: {
    // 确认删除
    async confirmDel() {
      let res = "";
      if (this.content == "del") {
        res = await this.API.order.delOrder({ id: this.delId });
      } else if (this.content == "send") {
        res = await this.API.order.checkOrder({ id: this.delId });
      } else {
        res = await this.API.order.cancelOrder({ id: this.delId });
      }
      if (res.code == 0) {
        if (this.content == "del") {
          this.orderList.splice(this.handleIndex, 1);
        } else if (this.content == "send") {
          this.line_4_itemsSelected(4);
        } else {
          this.$set(this.orderList[this.handleIndex], "status", 4);
        }
        uni.showToast({
          title:
            this.content == "del"
              ? "订单删除成功"
              : this.content == "send"
              ? "确认收货成功"
              : "订单取消成功",
          duration: 2500,
          icon: "none",
        });
        this.cancelDel();
      } else if (res.code == 410) {
        await this.$store.dispatch("toLogon", {});
        this.confirmDel();
      }
    },
    // 订单操作
    toHandle(item, index) {
      // 支付
      if (item.status == 1) {
        this.toPay(item);
      } else if (item.status == 2) {
        //退款
        uni.navigateTo({
          url: `/page_product/pages/order/refund?id=${item.id}&from=all`,
        });
      } else if (item.status == 3) {
        //评价
        uni.navigateTo({
          url: `/page_product/pages/order/evaluate?id=${item.id}&from=all`,
        });
      } else if (item.status == 5) {
        //确认收货
        this.delOrder(item, index, "send");
      }
    },
    toPay(item) {
      if (this.clickAble) {
        this.clickAble = false;
        this.API.order
          .rePayForPrePayId({ id: item.id })
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
                this.getDetail(item.id);
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
              this.toPay(item);
            }
          });
      }
    },
    getDetail(id) {
      let dsq = setInterval(() => {
        this.API.order
          .getMyOrderInfo({ id })
          .then((res) => {
            clearInterval(dsq);
            console.log(res);
            if ([2, 3].includes(res.data.status)) {
              uni.showToast({
                title: "支付成功",
                icon: "none",
              });
              this.line_4_itemsSelected(2);
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
    // 取消删除
    cancelDel() {
      this.show = false;
    },
    getMomentsList() {
      this.isLoading = "loading";
      let param = {
        page: this.theGetMomentsListPage,
        pagesize: this.theGetMomentsListPagesize,
        status: this.line_4_items[this.current].value,
        refund_id: this.current == 5 ? 1 : 0,
      };
      this.API.order
        .getMyOrderList(param)
        .then((res) => {
          console.log(res);
          // 如果是请求第一页，证明是首次请求，就重置一下
          if (this.theGetMomentsListPage == 1) {
            this.orderList = [];
          }
          if (res.data.length != 0) {
            if (![0, 5].includes(this.current)) {
              res.data = res.data.filter(
                (el) =>
                  !el.refund_id ||
                  (el.refund_id > 0 && el.refund_check_status == 3)
              );
            }
            for (let i = 0; i < res.data.length; i++) {
              this.orderList.push({
                ...res.data[i],
                img_url: res.data[i].img_url
                  ? res.data[i].img_url.split(",")[0]
                  : "",
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
            this.getMomentsList();
          }
        });
    },
    // 切换状态
    line_4_itemsSelected(index) {
      this.current = index;
      this.orderList = [];
      this.theGetMomentsListPage = 1;
      this.getMomentsList();
    },
    // 跳转详情
    toDetail(row) {
      uni.navigateTo({
        url: "/page_product/pages/order/detail?id=" + row.id,
      });
    },
    // 删除已取消状态订单
    delOrder(item, index, type) {
      this.content = type;
      this.delId = item.id;
      this.handleIndex = index;
      this.show = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.order {
  min-height: 100vh;
  box-sizing: border-box;
  background: #fafafa;
  overflow: hidden;
  .the-line-4 {
    display: flex;
    flex-direction: row;
    width: 100vw;
    background-color: #ffffff;
    position: fixed;

    .the-line-4-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 50%;
    }

    .the-line-4-item-selected {
      color: #000000 !important;
    }

    .the-line-4-item-name {
      margin-top: 10px;
      color: #bbbbbb;
      font-family: PingFang SC;
      font-weight: 400;
      font-size: 26rpx;
      color: #000000;
      height: 25px;
      line-height: 25px;
    }

    .the-line-4-item-line {
      width: 45rpx;
      height: 8rpx;
      background: #ff812f;
      margin-top: 7px;
    }
  }
  .list-container {
    overflow: hidden;
    .list-item {
      margin-top: 20rpx;
      background: #ffffff;
      border-radius: 20rpx;
      padding: 21rpx 30rpx 36rpx;
      .list-item-top {
        justify-content: space-between;
        .top-left {
          text {
            font-family: PingFang SC;
            font-weight: 300;
            font-size: 24rpx;
            color: #393a3e;
            margin-left: 21rpx;
          }
          .round {
            .small-round {
              width: 6rpx;
              height: 6rpx;
              background: #808080;
              border-radius: 3rpx;
              opacity: 0.51;
            }
            .big-round {
              margin: 0 8rpx;
              width: 10rpx;
              height: 10rpx;
              background: #808080;
              border-radius: 5rpx;
            }
          }
        }
        .top-right {
          justify-content: center;
          width: 40rpx;
          height: 40rpx;
          background: #eaeaea;
          border-radius: 20rpx;
        }
      }
      .list-item-center {
        margin-top: 20rpx;
        image {
          width: 140rpx;
          height: 140rpx;
          background: #ffffff;
          border-radius: 6rpx;
          border: 1px solid #eeeeee;
          margin-right: 29rpx;
        }
        .product-info {
          box-sizing: border-box;
          height: 140rpx;
          width: calc(100% - 169rpx);
          display: flex;
          flex-direction: column;
          justify-content: center;
          .product-title {
            font-family: PingFang SC;
            font-weight: 500;
            font-size: 24rpx;
            color: #393a3e;
            margin-bottom: 36rpx;
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
      .list-item-bottom {
        justify-content: flex-end;
        .detail-btn {
          width: 150rpx;
          height: 54rpx;
          background: #ff812f;
          border-radius: 27rpx;
          border: 1px solid #ff812f;
          margin-left: 30rpx;
          font-family: PingFang SC;
          font-weight: 300;
          font-size: 24rpx;
          color: #ffffff;
          line-height: 54rpx;
          text-align: center;
        }
        .other-btn {
          line-height: 54rpx;
          text-align: center;
          width: 150rpx;
          height: 54rpx;
          border-radius: 27rpx;
          border: 1px solid #a2a2a2;
          font-family: PingFang SC;
          font-weight: 300;
          font-size: 24rpx;
          color: #818181;
        }
      }
    }
  }
  .space-line-bottom {
    margin-top: 20px;
  }
  .flex-align {
    display: flex;
    align-items: center;
  }
}
</style>