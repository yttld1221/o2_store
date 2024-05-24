<template>
  <view class="address">
    <view v-if="list.length">
      <u-swipe-action>
        <u-swipe-action-item
          @click="submit(listItem)"
          v-for="(listItem, index) in list"
          :index="index"
          :key="index"
          :options="options"
        >
          <view class="list-box" @click="chooseAddress(listItem)">
            <view class="list-container">
              <view class="list-info-box">
                <text class="list-info-name">{{ listItem.name }}</text>
                <text class="list-info-phone">{{ listItem.phone }}</text>
                <view class="list-info-default" v-if="listItem.is_default == 1"
                  >默认</view
                >
              </view>
              <view class="list-info-detail">
                {{ listItem.complete_addr }}
              </view>
            </view>
            <u-icon
              @click.native.stop="editAddress(listItem)"
              class="edit-icon"
              size="28"
              name="edit-pen"
            ></u-icon>
          </view>
        </u-swipe-action-item>
      </u-swipe-action>
    </view>
    <view class="no-list" v-else>
      <view class="no-list-title">一个地址也没有</view>
      <view class="no-list-tip">“快去添加收货地址，买买买吧”</view>
      <view class="no-list-btn" @click="addAddress()">添加收货地址</view>
    </view>
    <view v-if="list.length">
      <view class="safe-bottom"></view>
      <view class="fix-bottom-box">
        <view class="fix-bottom">
          <view class="pay-btn" @click="addAddress()">添加收货地址</view>
        </view>
      </view>
    </view>
    <u-modal
      :show="show"
      :show-cancel-button="true"
      @confirm="confirmDel"
      @cancel="cancelDel"
      confirm-color="#FF812F"
      content="确认要删除该地址吗?"
    ></u-modal>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      delId: "",
      show: false,
      list: [],
      options: [
        {
          text: "删除",
          style: {
            backgroundColor: "#FF812F",
          },
        },
      ],
      fromPage: "",
    };
  },
  onLoad(option) {
    console.log(option);
    if (option.from) {
      this.fromPage = option.from;
    }
  },
  onShow() {
    this.getList();
  },
  methods: {
    //   选择收货地址
    chooseAddress(item) {
      console.log(item);
      if (this.fromPage) {
        uni.$emit("getAddress", { addressInfo: item });
        uni.navigateBack();
      }
    },
    editAddress(e) {
      let obj = encodeURIComponent(JSON.stringify(e));
      let url = `/page_product/pages/address/setAddress?data=${obj}`;
      if (this.fromPage) {
        url += "&from=pay";
      }
      uni.navigateTo({
        url,
      });
    },
    //   添加收货地址
    addAddress() {
      let url = "/page_product/pages/address/setAddress";
      if (this.fromPage) {
        url += "?from=pay";
      }
      uni.navigateTo({
        url,
      });
    },
    // 获取地址列表
    getList() {
      this.API.home
        .getMyReceiveAddrs({ is_default: 0 })
        .then((res) => {
          console.log(res);
          this.list = res.data;
          this.list.map((item) => {
            this.$set(item, "show", false);
          });
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.getList();
          }
        });
    },
    // 确认删除
    confirmDel() {
      this.API.home
        .delMyReceiveAddr({
          id: this.delId,
        })
        .then((res) => {
          this.cancelDel();
          this.getList();
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
    submit(e) {
      console.log(e);
      this.show = true;
      this.delId = e.id;
    },
  },
};
</script>
<style lang="scss" scoped>
.address {
  min-height: 100vh;
  box-sizing: border-box;
  background: #fafafa;
  .no-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    .no-list-title {
      font-family: PingFang SC;
      font-weight: 500;
      font-size: 30rpx;
      color: #000000;
    }
    .no-list-tip {
      font-family: PingFang;
      font-weight: 500;
      font-size: 28rpx;
      color: #979797;
      margin: 16rpx 0 26rpx;
    }
    .no-list-btn {
      width: 600rpx;
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
  .list-box {
    padding: 25rpx 42rpx 42rpx 0rpx;
    margin-left: 38rpx;
    border-bottom: 1rpx solid #d6d6d6;
    display: flex;
    justify-content: space-between;
    .list-container {
      .list-info-box {
        display: flex;
        align-items: center;
        .list-info-name {
          font-family: PingFang;
          font-weight: 600;
          font-size: 32rpx;
          color: #363636;
        }
        .list-info-phone {
          font-family: PingFang;
          font-weight: 500;
          font-size: 28rpx;
          color: #363636;
          margin-left: 20rpx;
        }
      }
      .list-info-detail {
        margin-top: 28rpx;
        font-family: PingFang;
        font-weight: 500;
        font-size: 28rpx;
        color: #b8b8b8;
      }
      .list-info-default {
        margin-left: 20rpx;
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
      }
      .edit-icon {
        margin-left: 28rpx;
      }
    }
  }
  /deep/ .u-swipe-action-item__content {
    background: #fafafa;
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
</style>