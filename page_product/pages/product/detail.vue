<template>
  <view class="detail">
    <u-swiper
      bgColor="#FFFFFF"
      @click="previewImage"
      height="750rpx"
      :list="srcList"
      @change="(e) => (currentNum = e.current)"
      :autoplay="false"
      indicatorStyle="right: 20px"
    >
      <u-swiper-item slot="item" v-for="(item, index) in srcList" :key="index">
        <u-image
          :src="item"
          width="100%"
          height="750rpx"
          mode="aspectFill"
        ></u-image>
      </u-swiper-item>
      <view slot="indicator" class="indicator-num">
        <text class="indicator-num__text"
          ><text style="font-size: 28rpx">{{ currentNum + 1 }}</text
          >/<text style="font-size: 18rpx">{{ srcList.length }}</text></text
        >
      </view>
    </u-swiper>
    <view class="info-box">
      <view class="info-price">
        <view class="info-price-left">
          <text class="sale-price"
            >￥<text class="price-text">{{ info.sale_price }}</text></text
          >
          <text class="old-price">原价:¥{{ info.original_price }}</text>
        </view>
        <view class="info-price-right">
          <image src="../../../static/sc.png" />
          <text>{{ info.collection_num }}人</text>
        </view>
      </view>
      <view class="info-title">
        {{ info.title }}
      </view>
      <view class="info-sale">
        <text>品牌商品 · 送货尚门 · 假一赔十</text>
        <text>已售{{ info.sale_num }}件</text>
      </view>
    </view>
    <u-divider text="商品详情"></u-divider>
    <view class="image-detail"
      ><image
        v-for="(imgUrl, imgIdx) in srcList"
        :key="imgIdx"
        style="width: 100%"
        :src="imgUrl"
        mode="widthFix"
      ></image
    ></view>
    <view class="safe-bottom"></view>
    <uni-goods-nav
      :class="[info.is_collection == 1 ? 'isSc' : 'noSc']"
      :fill="true"
      :options="options"
      :buttonGroup="buttonGroup"
      @click="onClick"
      @buttonClick="buttonClick"
    />
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      id: "",
      info: {},
      srcList: [],
      currentNum: 0,
      buttonGroup: [
        {
          text: "立即购买",
          backgroundColor: "linear-gradient(-55deg, #FF812F, #FF9B5A)",
        },
      ],
      options: [
        {
          icon: "dianpu",
          text: "店铺",
        },
        {
          icon: "kefu",
          text: "客服",
        },
        {
          icon: "star",
          text: "收藏",
        },
        {
          icon: "star-filled",
          text: "已收藏",
          color: "#2979ff",
        },
      ],
    };
  },
  onLoad(options) {
    this.id = options.id;
    this.getDetail();
  },
  methods: {
    // icon点击
    onClick(e) {
      if (e.index == 0) {
      } else if (e.index == 1) {
      } else {
        this.API.home
          .collection({ task_id: this.id })
          .then((res) => {
            console.log(res);
            uni.showToast({
              title: this.info.is_collection == 1 ? "取消收藏成功" : "收藏成功",
              duration: 2500,
              icon: "none",
            });
            this.getDetail();
          })
          .catch(async (err) => {
            if (err.code == 410) {
              await this.$store.dispatch("toLogon", {});
              this.onClick(e);
            }
          });
      }
    },
    // 按钮点击
    buttonClick(e) {
      console.log(e);
      if (e.content.text == "立即购买") {
        let param = [
          {
            id: this.id,
            num: 1,
            pid: 0,
            url: this.info.img_url,
            title: this.info.title,
            price: this.info.sale_price,
          },
        ];
        uni.navigateTo({
          url:
            "/page_product/pages/product/pay?product=" +
            encodeURIComponent(JSON.stringify(param)),
        });
      }
    },
    previewImage(index) {
      console.log(this.srcList);
      uni.previewImage({
        current: index,
        urls: this.srcList,
      });
    },
    getDetail() {
      this.API.home
        .getTaskInfo({ id: this.id })
        .then((res) => {
          console.log(res);
          this.info = res.data;
          this.srcList = this.info.img_url ? this.info.img_url.split(",") : [];
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.getDetail();
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.detail {
  padding-bottom: 80px;
  min-height: 100vh;
  background: #fafafa;
  .indicator-num {
    padding: 2px 0;
    background-color: rgba(0, 0, 0, 0.35);
    border-radius: 100px;
    width: 35px;
    @include flex;
    justify-content: center;

    &__text {
      color: #ffffff;
      font-size: 12px;
    }
  }
  /deep/ .uni-goods-nav {
    position: fixed;
    width: 100%;
    bottom: 0;
    box-shadow: 0rpx 0rpx 7rpx 1rpx rgba(0, 0, 0, 0.04);
  }
  .info-box {
    padding: 29rpx 29rpx 40rpx 29rpx;
    background: #ffffff;
    .info-price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .info-price-left {
        display: flex;
        align-items: flex-end;
        .sale-price {
          font-family: PingFang SC;
          font-weight: 300;
          font-size: 22rpx;
          color: #f23333;
          display: flex;
          align-items: flex-end;
          line-height: 23rpx;
          .price-text {
            font-size: 44rpx;
          }
        }
        .old-price {
          text-decoration: line-through;
          margin-left: 21rpx;
          font-family: PingFang SC;
          font-weight: 300;
          font-size: 22rpx;
          color: #999999;
          vertical-align: bottom;
        }
      }
      .info-price-right {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: PingFang SC;
        font-weight: 300;
        font-size: 18rpx;
        color: #444444;
        image {
          width: 38rpx;
          height: 36rpx;
          margin-bottom: 7rpx;
        }
      }
    }
    .info-title {
      font-family: PingFang SC;
      font-weight: 500;
      font-size: 28rpx;
      color: #393a3e;
      margin: 22rpx 0 38rpx 0;
    }
    .info-sale {
      font-family: PingFang SC;
      font-weight: 300;
      font-size: 22rpx;
      color: #999999;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .image-detail {
    background: #ffffff;
  }
  /deep/ .u-divider {
    padding: 0 30rpx;
  }
  .safe-bottom {
    padding-bottom: env(safe-area-inset-bottom);
  }
  /deep/ .isSc {
    .uni-tab__cart-sub-left {
      .uni-tab__cart-button-left:nth-child(3) {
        display: none;
      }
    }
  }

  /deep/ .noSc {
    .uni-tab__cart-sub-left {
      .uni-tab__cart-button-left:nth-child(4) {
        display: none;
      }
    }
  }
}
</style>