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
      <view class="order-container">
        <view
          class="order-item"
          @click="changeType(item, index)"
          v-for="(item, index) in pxList"
          :key="index"
        >
          <image v-if="item.label == '综合'" src="@/static/icon-zh.png" />
          <image v-else-if="item.label == '销量'" src="@/static/icon-xl.png" />
          <image v-else src="@/static/icon-jg.png" />
          <text>{{ item.label }}</text>
        </view>
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
      orderType: "desc",
      order_field: "sort",
      isLoading: "loading",
      pxList: [
        {
          label: "综合",
          type: "sort",
        },
        {
          label: "销量",
          type: "sale_num",
        },
        {
          label: "价格",
          type: "sale_price",
        },
      ],
      // 当前获取的校园墙页码，每次需要+1
      theGetMomentsListPage: 1,
      theGetMomentsListPagesize: 4,
      searchText: "",
      searchRecord: [],
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
    if (options.text) {
      this.searchText = options.text;
      this.searchReasult();
    }
  },
  onReachBottom() {
    // 触底后动画效果开启
    this.isLoading = "loading";
    this.getList();
  },
  methods: {
    // 切换类型
    changeType(item, index) {
      if (this.order_field != item.type || index == 2) {
        this.order_field = item.type;
        if (index == 2) {
          this.orderType = this.orderType == "desc" ? "asc" : "desc";
        } else {
          this.orderType = "desc";
        }
        this.theGetMomentsListPage = 1;
        this.list = [];
        // 触底后动画效果开启
        this.isLoading = "loading";
        this.getList();
      }
    },
    // 跳转详情
    goDetail(item) {
      uni.navigateTo({
        url: "/page_product/pages/product/detail?id=" + item.id,
      });
    },
    changeText(val) {
      if (!val) {
        uni.navigateBack();
      }
    },
    cancel() {
      uni.navigateBack({
        delta: 2,
      });
    },
    // 获取历史纪录
    getSearchRecord() {
      this.searchRecord = uni.getStorageSync("searchRecord")
        ? JSON.parse(uni.getStorageSync("searchRecord"))
        : [] || [];
      if (this.searchRecord.length > 0) {
        for (let i in this.searchRecord) {
          if (i > 9) {
            this.searchRecord.splice(i, 1);
          }
        }
      }
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
        area_code: this.$store.state.store_addressNow.code,
      };
      this.API.home.getTaskList(params).then((res) => {
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
      });
    },
    searchReasult() {
      if (this.searchText) {
        this.getSearchRecord();
        for (var i in this.searchRecord) {
          if (this.searchText == this.searchRecord[i].value) {
            this.searchRecord.splice(i, 1);
          }
        }
        this.searchRecord.unshift({
          value: this.searchText,
        });
        uni.setStorageSync("searchRecord", JSON.stringify(this.searchRecord));
        this.getList();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.search-result {
  box-sizing: border-box;
  min-height: 100vh;
  background: #fafafa;
  .top-fixd {
    z-index: 5;
    background: #ffffff;
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    top: 0;
    .top-search {
      padding: 30rpx 30rpx 8rpx;
    }
    .order-container {
      display: flex;
      align-items: center;
      padding: 24rpx;
      .order-item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        image {
          width: 38rpx;
          height: 38rpx;
          margin-right: 3rpx;
        }
        &:after {
          position: absolute;
          right: 0;
          content: "";
          height: 24rpx;
          border-right: 1rpx solid #d7d7d7;
        }
        text {
          line-height: 36rpx;
        }
      }
      .order-item:last-child {
        &:after {
          border: none;
        }
      }
    }
  }
  .list-container {
    padding: 24rpx 30rpx 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    box-sizing: border-box;
    .list-item {
      margin-bottom: 20rpx;
      width: 335rpx;
      border-radius: 10rpx 10rpx 0rpx 0rpx;
      .image-box {
        background: #ffffff;
        border-radius: 10rpx 10rpx 0rpx 0rpx;
        width: 335rpx;
        height: 335rpx;
        z-index: 1;
        position: relative;
        image {
          border-radius: 10rpx 10rpx 0rpx 0rpx;
          width: 335rpx;
          height: 335rpx;
        }
      }
      .list-item-info {
        margin-top: -15rpx;
        padding: 30rpx 21rpx 32rpx;
        background: #ffffff;
        box-shadow: 0rpx 0rpx 7rpx 1rpx rgba(0, 0, 0, 0.04);
        border-radius: 0 0 10rpx 10rpx;
        border: 1px solid #f4f4f4;
        border-top: none;
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