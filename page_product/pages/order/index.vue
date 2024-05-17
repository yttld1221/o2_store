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
      <view v-for="(item, index) in orderList" :key="index" class="list-item">
      </view>
    </view>
    <!-- 底部垫层 -->
    <view class="space-line-bottom" @click="getMomentsList()">
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
      // 用于 uni-load-more
      contentText: {
        contentdown: "查看更多",
        contentrefresh: "加载中...",
        contentnomore: "到底了，可点击此处手动加载~",
      },
      // 最后的加载组件的加载动画效果，
      isLoading: "loading",
      line_4_items: [
        { label: "全部", value: 0 },
        { label: "待支付", value: 1 },
        { label: "待发货", value: 2 },
        { label: "待收货", value: 5 },
        { label: "评价", value: 3 },
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
    let query = uni.createSelectorQuery().in(this);
    query
      .select(".the-line-4")
      .boundingClientRect((data) => {
        this.contentHeight = data.height;
      })
      .exec();
  },
  onShow() {
    // --------------------------------------------------------------调用初始数据--------------------------------------------------------------
    // --------------------------------------------------------------调用初始数据--------------------------------------------------------------
    // --------------------------------------------------------------调用初始数据--------------------------------------------------------------
    this.theGetMomentsListPage = 1;
    this.getMomentsList();
  },
  // 页面触底的监听事件，配合pages.json中的"onReachBottomDistance": 0，0的位置写距离底部的距离
  onReachBottom() {
    // 触底后动画效果开启
    this.isLoading = "loading";
    // 调用接口
    this.getMomentsList();
  },
  methods: {
    getMomentsList() {
      this.isLoading = "loading";
      let param = {
        page: this.theGetMomentsListPage,
        pagesize: this.theGetMomentsListPagesize,
        status: this.line_4_items[this.current].value,
        refund_id: 0,
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
            for (let i = 0; i < res.data.length; i++) {
              this.orderList.push(res.data[i]);
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
    }
  }
  .space-line-bottom {
    margin-top: 20px;
  }
}
</style>