<template>
  <view class="detail">
    <u-swiper
      radius="0"
      bgColor="#FFFFFF"
      @click="previewImage"
      height="750rpx"
      :list="srcList"
      @change="(e) => (currentNum = e.current)"
      :autoplay="false"
      indicatorStyle="right: 0px"
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
          ><text style="font-size: 18rpx">/{{ srcList.length }}</text></text
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
        <text>品牌商品 · 送货上门 · 假一赔十</text>
        <text>已售{{ info.sale_num }}件</text>
      </view>
    </view>
    <view class="evaluate-box">
      <view class="evaluate-title flex-align" @click="goEvaluate()">
        <view class="evaluate-title-left flex-align"
          ><view class="shu"></view>评价（{{ evaluateTotal }}）</view
        >
        <u-icon slot="right" name="arrow-right"></u-icon>
      </view>
      <view class="evaluate-list-box">
        <view v-if="evaluateList.length">
          <view class="more-evaluate">
            <view
              class="evaluate-item"
              v-for="(item, index) in evaluateList"
              :key="index"
            >
              <view class="evaluate-item-top">
                <view
                  class="comment-one-avatar"
                  :style="'background: url(' + item.avatar_url + ');'"
                ></view>
                <view class="evaluate-item-rate">
                  <text>{{ item.nick_name }}</text>
                  <u-rate
                    size="10"
                    active-color="#FF812F"
                    gutter="6"
                    :count="5"
                    v-model="item.total_num"
                    readonly
                  ></u-rate>
                </view>
              </view>
              <view class="evaluate-item-content">
                {{ item.content }}
              </view>
              <view class="evaluate-img-box" v-if="item.img_url.length">
                <view
                  class="evaluate-item-img"
                  :key="imgIndex"
                  :class="{
                    'border-left': imgIndex == 0,
                    'border-right': imgIndex == item.img_url.length - 1,
                  }"
                  v-for="(imgItem, imgIndex) in item.img_url"
                >
                  <image
                    @click="prewFile(imgItem, 'image')"
                    class="image-style"
                    v-if="getType(imgItem)"
                    mode="aspectFill"
                    :src="imgItem"
                  />
                  <view
                    @click="prewFile(imgItem, 'video')"
                    class="video-box"
                    v-else
                  >
                    <u-icon
                      name="play-right"
                      color="#FFFFFF"
                      size="34"
                    ></u-icon>
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view class="btn-box">
            <view class="more-btn" @click="goEvaluate()">查看更多评价</view>
          </view>
        </view>
        <view class="no-evaluate" v-else>暂无评价</view>
      </view>
    </view>
    <u-divider text="商品详情"></u-divider>
    <view class="image-detail"
      ><image
        v-for="(imgUrl, imgIdx) in detailSrc"
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
    <prew-video ref="prewVideo" />
  </view>
</template>

<script>
import prewVideo from "../../components/prewVideo.vue";
export default {
  components: { prewVideo },
  data() {
    return {
      evaluateTotal: 0,
      evaluateList: [],
      id: "",
      info: {},
      srcList: [],
      detailSrc: [],
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
    uni.showShareMenu({
      menus: ["shareAppMessage"], // 需要显示的转发按钮名称列表.合法值包含 "shareAppMessage"、"shareTimeline"
      success(res) {
        console.log(res);
      },
      fail(e) {
        console.log(e);
      },
    });
    this.id = options.id;
    this.getDetail("list");
  },
  methods: {
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
    goEvaluate() {
      if (this.evaluateTotal) {
        uni.navigateTo({
          url: "/page_product/pages/product/evaluate?id=" + this.id,
        });
      }
    },
    getEvaluate() {
      let param = {
        product_id: this.id,
        page: 1,
        pagesize: 2,
      };
      this.API.home
        .getValuationList(param)
        .then((res) => {
          console.log(res);
          this.evaluateTotal = res.count;
          this.evaluateList = res.data.map((el) => {
            return {
              ...el,
              img_url: el.img_url ? el.img_url.split(",") : [],
            };
          });
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.getEvaluate();
          }
        });
    },
    // icon点击
    onClick(e) {
      if (e.index == 0) {
        if (!this.info.apply_id) {
          return;
        }
        uni.navigateTo({
          url:
            "/page_product/pages/mall/index?id=" +
            this.info.shop_id +
            "&userId=" +
            this.info.apply_id,
        });
      } else if (e.index == 1) {
        uni.showToast({
          title: "功能暂未开放",
          duration: 2500,
          icon: "none",
        });
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
      if (this.$store.state.theLogonUser.level < this.info.buy_level) {
        // uni.showToast({
        //   title: "当前操作权限不足，请尽快完成会员升级！",
        //   duration: 2500,
        //   icon: "none",
        // });
        uni.navigateTo({
          url:
            "/page_product/pages/info/register?level=" +
            this.$store.state.theLogonUser.level,
        });
        return false;
      }
      if (e.content.text == "立即购买") {
        let param = [
          {
            id: this.id,
            num: 1,
            url: this.info.img_url ? this.info.img_url.split(",")[0] : "",
            title: this.info.title,
            price: this.info.sale_price,
            is_auto_check: this.info.is_auto_check,
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
    getDetail(type = "") {
      this.API.home
        .getTaskInfo({ id: this.id })
        .then((res) => {
          console.log(res);
          this.info = res.data;
          this.srcList = this.info.img_url ? this.info.img_url.split(",") : [];
          this.detailSrc = this.info.content_html
            ? this.info.content_html.split(",")
            : [];
          if (type) {
            this.getEvaluate();
          }
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.getDetail(type);
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
  .evaluate-box {
    border-top: 20rpx solid #fafafa;
    background: #ffffff;
    .evaluate-title {
      padding: 27rpx 29rpx;
      justify-content: space-between;
      border-bottom: 1rpx solid #e7e7e7;
      .evaluate-title-left {
        font-family: PingFang SC;
        font-weight: 400;
        font-size: 26rpx;
        color: #333333;
        .shu {
          margin-right: 15rpx;
          width: 6rpx;
          height: 33rpx;
          background: #ff812f;
        }
      }
    }
    .evaluate-list-box {
      padding: 0 29rpx;
      .more-evaluate {
        .evaluate-item {
          padding: 22rpx 0 40rpx;
          border-bottom: 1rpx solid #e7e7e7;
          .evaluate-item-top {
            display: flex;
            align-items: center;
            .comment-one-avatar {
              border-radius: 100%;
              width: 70rpx;
              height: 70rpx;
              padding: 0 !important;
              background-repeat: no-repeat !important;
              background-size: cover !important;
            }
            .evaluate-item-rate {
              display: flex;
              height: 70rpx;
              flex-direction: column;
              justify-content: space-around;
              margin-left: 14rpx;
              font-family: PingFang SC;
              font-weight: 400;
              font-size: 24rpx;
              color: #333333;
              /deep/ .u-rate__content {
                .u-rate__content__item:first-child {
                  .uicon-star-fill {
                    padding-left: 0 !important;
                  }
                }
              }
            }
          }
          .evaluate-item-content {
            margin-top: 25rpx;
            font-family: PingFang SC;
            font-weight: 400;
            font-size: 24rpx;
            color: #333333;
            line-height: 44rpx;
          }
          .evaluate-img-box {
            display: flex;
            margin-top: 28rpx;
            .evaluate-item-img {
              margin-right: 10rpx;
              &:last-child {
                margin-right: 0;
              }
              & > image {
                width: 200rpx;
                height: 200rpx;
              }
              .video-box {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 200rpx;
                height: 200rpx;
                background: rgba(0, 0, 0, 0.5);
              }
            }
            .border-left {
              & > image,
              .video-box {
                border-radius: 20rpx 0 0 20rpx;
              }
            }
            .border-right {
              & > image,
              .video-box {
                border-radius: 0 20rpx 20rpx 0;
              }
            }
          }
        }
        .evaluate-item:last-child {
          border-bottom: none;
        }
      }
      .btn-box {
        display: flex;
        align-items: center;
        justify-content: center;

        .more-btn {
          width: 240rpx;
          padding: 17rpx 0;
          margin: 10rpx 0 48rpx 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 100rpx;
          border: 1px solid #999999;
          font-family: PingFang SC;
          font-weight: 300;
          font-size: 24rpx;
          color: #7b7b7b;
        }
      }
      .no-evaluate {
        font-family: PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #333333;
        padding: 57rpx 0;
        text-align: center;
      }
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
  /deep/ .u-swiper__indicator {
    bottom: 54rpx !important;
    .indicator-num {
      width: 90rpx;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 20rpx 0rpx 0rpx 20rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }
  }
  .flex-align {
    display: flex;
    align-items: center;
  }
}
</style>