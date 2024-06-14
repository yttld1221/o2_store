<template>
  <view class="search-result">
    <view class="top-fixd">
      <view class="top-search">
        <u-search
          placeholder="请输入搜索关键词"
          v-model="searchText"
          :showAction="true"
          actionText="取消"
          :clearabled="true"
          @change="changeText"
          @search="searchReasult"
          @custom="cancel"
        ></u-search>
      </view>
      <view class="type-container">
        <scroll-view
          class="scroll-view"
          scroll-x="true"
          scroll-with-animation="true"
        >
          <view
            class="type-item"
            @click="changeType(item, index)"
            v-for="(item, index) in titles"
            :key="index"
          >
            <view class="type-item-text">
              <text>{{ item }}</text>
              <view v-if="chooseIndex == index" class="short-line"></view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
    <view class="list-container" :style="'margin-top:' + contentHeight + 'px;'">
      <view
        @click="goDetail(item)"
        class="list-item"
        v-for="(item, index) in list"
        :key="index"
      >
        <view class="image-box">
          <image mode="aspectFill" :src="item.img_url" />
        </view>
        <view class="list-item-info">
          <view class="list-item-title">{{ item.title }}</view>
          <view class="list-item-price flex-algin">
            <view class="list-item-price-left"
              >¥<text style="font-size: 34rpx">{{
                item.sale_price
              }}</text></view
            >
            <view class="list-item-price-right">已售：{{ item.sale_num }}</view>
          </view>
        </view>
      </view>
    </view>
    <!-- 底部垫层 -->
    <view @click="getList()" class="space-line-bottom">
      <uni-load-more
        :status="isLoading"
        :content-text="contentText"
      ></uni-load-more>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      chooseIndex: 0,
      titles: [
        "全部",
        "话题",
        "组队/搭子",
        "分享/安利",
        "兼职",
        "表白",
        "求助",
        "其他",
      ],
      isLoading: "loading",
      // 当前获取的校园墙页码，每次需要+1
      theGetMomentsListPage: 1,
      theGetMomentsListPagesize: 4,
      searchText: "",
      contentText: {
        contentdown: "查看更多",
        contentrefresh: "加载中...",
        contentnomore: "到底了，可点击此处手动加载~",
      },
      list: [],
      contentHeight: 0,
    };
  },
  onLoad(options) {
    let query = uni.createSelectorQuery().in(this);
    query
      .select(".top-fixd")
      .boundingClientRect((data) => {
        this.contentHeight = data.height;
      })
      .exec();
  },
  onReachBottom() {
    // 触底后动画效果开启
    this.isLoading = "loading";
    this.getList();
  },
  methods: {
    changeText(val) {},
    changeType(item, index) {
      this.chooseIndex = index;
    },
    cancel() {
      uni.navigateBack({
        delta: 1,
      });
    },
    getList() {
      this.isLoading = "loading"; // 加载中
      let params = {
        page: this.theGetMomentsListPage,
        pagesize: this.theGetMomentsListPagesize,
        title: this.searchText,
        order_type: this.orderType,
        order_field: this.order_field,
        is_product: 1,
      };
      if (this.shopId) {
        params = {
          ...params,
          shop_id: this.shopId,
        };
      } else {
        params = {
          ...params,
          area_code: this.$store.state.store_addressNow.code,
        };
      }
      this.API.home
        .getTaskList(params)
        .then((res) => {
          console.log(res);
          // 如果是请求第一页，证明是首次请求，就重置一下
          if (this.theGetMomentsListPage == 1) {
            this.list = [];
          }
          if (res.data.length != 0) {
            for (let i = 0; i < res.data.length; i++) {
              this.list.push({
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
            this.getList();
          }
        });
    },
    searchReasult() {
      if (this.searchText) {
        this.getList();
      } else {
        uni.showToast({
          title: "请输入搜索关键词",
          duration: 2500,
          icon: "none",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.search-result {
  box-sizing: btype-box;
  min-height: 100vh;
  background: #fafafa;
  .top-fixd {
    z-index: 5;
    background: #ffffff;
    box-sizing: btype-box;
    position: fixed;
    width: 100%;
    top: 0;
    .top-search {
      padding: 30rpx 30rpx 8rpx;
    }
    .type-container {
      padding: 0 30rpx;
      .scroll-view {
        white-space: nowrap;
        display: flex;
        height: 85rpx;
        .type-item {
          height: 85rpx;
          overflow: hidden;
          display: inline-block;
          margin-right: 67rpx;
          position: relative;
          .type-item-text {
            height: 85rpx;
            font-family: PingFang SC;
            font-weight: 500;
            font-size: 26rpx;
            color: #333333;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            & > text {
              margin-top: 8rpx;
            }
          }
        }
        .type-item:last-child {
          margin-right: 0;
        }
      }

      .short-line {
        position: absolute;
        bottom: 0;
        width: 40rpx;
        height: 8rpx;
        background: linear-gradient(270deg, #ffc974, #f89f12);
        border-radius: 200rpx;
      }
    }
  }
  .list-container {
    padding: 24rpx 30rpx 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    box-sizing: btype-box;
    .list-item {
      margin-bottom: 20rpx;
      width: 335rpx;
      btype-radius: 10rpx 10rpx 0rpx 0rpx;
      .image-box {
        background: #ffffff;
        btype-radius: 10rpx 10rpx 0rpx 0rpx;
        width: 335rpx;
        height: 335rpx;
        z-index: 1;
        position: relative;
        image {
          btype-radius: 10rpx 10rpx 0rpx 0rpx;
          width: 335rpx;
          height: 335rpx;
        }
      }
      .list-item-info {
        margin-top: -15rpx;
        padding: 30rpx 21rpx 32rpx;
        background: #ffffff;
        box-shadow: 0rpx 0rpx 7rpx 1rpx rgba(0, 0, 0, 0.04);
        btype-radius: 0 0 10rpx 10rpx;
        border: 1px solid #f4f4f4;
        btype-top: none;
        .list-item-title {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-family: PingFang SC;
          font-weight: 500;
          font-size: 24rpx;
          color: #393a3e;
          margin-bottom: 24rpx;
        }
        .list-item-price {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          .list-item-price-left {
            font-family: PingFang SC;
            font-weight: 300;
            font-size: 22rpx;
            color: #f23333;
            line-height: 24rpx;
          }
          .list-item-price-right {
            font-family: PingFang SC;
            font-weight: 400;
            font-size: 22rpx;
            color: #999999;
          }
        }
      }
    }
  }
}
</style>