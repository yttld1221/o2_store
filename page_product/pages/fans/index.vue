<template>
  <view class="fans">
    <view class="fans-list">
      <view
        class="fans-list-item flex-align"
        v-for="(item, index) in list"
        :key="index"
      >
        <view class="fans-list-item-left flex-align">
          <image
            @click="topPerSonalhome(item.id)"
            mode="aspectFill"
            :src="item.avatar_url"
          />
          <view class="fans-info">
            <view class="fans-name">{{ item.nick_name }}</view>
            <view class="fans-desc">
              {{ item.intro ? item.intro : "这家伙很神秘，没有写个人简介。" }}
            </view>
          </view>
        </view>
        <view
          @click="regardHandle(item, index)"
          class="fans-btn"
          :class="{ 'is-regard': item.is_regard == 1 }"
          ><text v-if="!otherId">{{
            item.is_regard == 1 ? "互相关注" : "回关"
          }}</text>
          <text v-else>{{
            item.is_regard == 1 ? "已关注" : "关注"
          }}</text></view
        >
      </view>
    </view>
    <view @click="getFans()" class="space-line-bottom">
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
      contentText: {
        contentdown: "查看更多",
        contentrefresh: "加载中...",
        contentnomore: "到底了，可点击此处手动加载~",
      }, // 最后的加载组件的加载动画效果，
      isLoading: "loading",
      // 当前获取的校园墙页码，每次需要+1
      theGetListPage: 1,
      theGetListPagesize: 10,
      list: [],
      otherId: "",
    };
  },
  onLoad(options) {
    if (options.userId) {
      this.otherId = options.userId;
      uni.setNavigationBarTitle({
        title: options.name,
      });
    }
    this.getFans();
  },
  // 监听下拉动作
  onPullDownRefresh() {
    // 重置获取的页码
    this.theGetListPage = 1;
    // 重置数组
    this.list = [];
    // 异步转同步调用
    (async () => {
      await this.getFans();
      // 等待接口返回后，取消下拉刷新动画
      uni.stopPullDownRefresh();
    })();
  },
  onReachBottom() {
    // 调用接口
    this.getFans();
  },
  methods: {
    // 跳转主页
    topPerSonalhome(id) {
      uni.navigateTo({
        url: "/pages/follow/personalhome?id=" + id,
      });
    },
    regardHandle(item, index) {
      if (item.id == this.$store.state.theLogonUser.id) {
        uni.showToast({
          title: "不能关注自己",
          duration: 1000,
          icon: "none",
        });
        return;
      }
      this.API.order
        .regard({
          to_user_id: item.id,
        })
        .then((res) => {
          console.log(res.data);
          this.$set(this.list[index], "is_regard", item.is_regard == 1 ? 2 : 1);
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.regardHandle();
          }
        });
    },
    getFans() {
      this.isLoading = "loading"; // 加载中
      let params = {
        page: this.theGetListPage,
        pagesize: this.theGetListPagesize,
        type: "粉丝",
        user_id: this.otherId,
      };
      if (!this.otherId) {
        delete params.user_id;
      }
      this.API.user
        .getMyPerson(params)
        .then((res) => {
          console.log(res);
          // 如果是请求第一页，证明是首次请求，就重置一下
          if (this.theGetListPage == 1) {
            this.list = [];
          }
          if (res.data.length != 0) {
            for (let i = 0; i < res.data.length; i++) {
              this.list.push(res.data[i]);
            }
            this.isLoading = "no-more"; // 取消加载动画
            // 页面+1
            this.theGetListPage += 1;
          } else {
            this.isLoading = "no-more"; // 取消加载动画
          }
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.getFans();
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.fans {
  .fans-list {
    padding: 0 30rpx 0 20rpx;
    border-top: 20rpx solid #fafafa;
    overflow: hidden;
    .fans-list-item {
      padding: 20rpx 0;
      justify-content: space-between;
      .fans-list-item-left {
        image {
          width: 100rpx;
          height: 100rpx;
          margin-right: 19rpx;
          border-radius: 50%;
        }
        .fans-info {
          height: 100rpx;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .fans-name {
            font-family: PingFang SC;
            font-weight: 500;
            font-size: 28rpx;
            color: #000000;
          }
          .fans-desc {
            font-family: PingFang SC;
            font-weight: 400;
            font-size: 22rpx;
            color: #b3b3b3;
            width: 55vw;
            overflow: hidden; /* 确保内容超出容器时会被隐藏 */
            white-space: nowrap; /* 确保文本在一行内显示，避免换行 */
            text-overflow: ellipsis; /* 用省略号表示被截断的文本 */
          }
        }
      }
      .fans-btn {
        background: #ff812f;
        color: #ffffff;
        border-radius: 50rpx;
        padding: 15rpx 30rpx;
        font-family: PingFang SC;
        font-weight: 400;
        font-size: 26rpx;
      }
      .is-regard {
        background: #bbbbbb;
      }
    }
  }
  .flex-align {
    display: flex;
    align-items: center;
  }
}
</style>