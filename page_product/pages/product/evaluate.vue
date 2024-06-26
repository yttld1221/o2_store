<template>
  <view class="product-evaluate">
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
            <view @click="prewFile(imgItem, 'video')" class="video-box" v-else>
              <u-icon name="play-right" color="#FFFFFF" size="34"></u-icon>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 底部垫层 -->
    <view class="space-line-bottom">
      <uni-load-more :status="isLoading"></uni-load-more>
    </view>
    <view class="safe-bottom"></view>
    <prew-video ref="prewVideo"
  /></view>
</template>

<script>
import prewVideo from "../../components/prewVideo.vue";
export default {
  components: { prewVideo },
  data() {
    return {
      id: "",
      isLoading: "loading",
      theGetMomentsListPage: 1,
      theGetMomentsListPagesize: 10,
      evaluateList: [],
    };
  },
  onLoad(options) {
    if (options.id) {
      this.id = options.id;
      this.getEvaluate();
    }
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
.product-evaluate {
  border-top: 20rpx solid #fafafa;
  .more-evaluate {
    padding: 0 29rpx;
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