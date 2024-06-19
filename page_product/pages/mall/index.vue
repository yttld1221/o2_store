<template>
  <view class="mall">
    <view class="mall-top">
      <view class="info-container">
        <view class="info-name flex-algin">
          <view class="info-name-left flex-algin">
            <image mode="aspectFill" :src="userInfo.avatar_url"></image>
            <view class="name-box flex-algin">
              <view class="name-text">{{ userInfo.nick_name }}</view>
              <view class="time-text">{{ getTime() }}在线过</view>
            </view>
          </view>
        </view>
        <view class="info-desc">{{
          userInfo.intro ? userInfo.intro : "这家伙很神秘，没有写个人简介。"
        }}</view>
        <view class="info-school flex-algin">
          <view class="info-school-name info-school-box flex-algin">
            <image src="/static/1_school_icon@3x.png" mode="widthFix"></image>
            {{ userInfo.school_name }}</view
          >
          <view
            v-if="theLogonUser.specialty"
            class="info-school-major info-school-box flex-algin"
            >{{ theLogonUser.specialty }}</view
          >
        </view>
        <view class="other-info flex-algin">
          <view class="other-info-left flex-algin">
            <view class="flex-algin"
              ><text>{{ userInfo.regard_num }}</text
              >关注</view
            >
            <view @click="toFans()" class="mar-l-50 flex-algin"
              ><text>{{ userInfo.fans_num }}</text
              >粉丝</view
            >
          </view>
          <view
            :style="{ visibility: userId != theLogonUser.id ? '' : 'hidden' }"
            @click="followHandle()"
            class="other-info-right"
            :class="{ 'is-regard': userInfo.is_regard == 1 }"
            >{{ userInfo.is_regard == 1 ? "取消关注" : "关注" }}</view
          >
        </view>
      </view>
      <view class="tab-container flex-algin">
        <view class="tab-box flex-algin">
          <view
            @click="changeTab(index)"
            class="tab-item"
            :class="{ choose: current == index }"
            v-for="(item, index) in list"
            :key="index"
          >
            <view class="heng" v-if="current == index"></view>
            <text>{{ item.label }}</text>
          </view>
        </view>
        <u-icon
          @click="toSearch()"
          name="search"
          color="#333333"
          size="23"
        ></u-icon>
      </view>
    </view>
    <view
      :style="'margin-top:' + contentHeight + 'px;'"
      class="list-box"
      :class="{ 'shop-list': current == 0 }"
    >
      <view class="shop-list-box" v-if="current == 0">
        <view
          @click="goDetail(item)"
          class="list-item"
          v-for="(item, index) in shopList"
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
              <view class="list-item-price-right"
                >已售：{{ item.sale_num }}</view
              >
            </view>
          </view>
        </view>
      </view>
      <view v-else>
        <view class="posts-data" v-for="(item, index) in shopList">
          <post-type-zudui
            :showPhone="false"
            @toJzDetail="toJzDetail"
            @toDetail="toDetail"
            @toThumb="toThumb"
            @actionMore="actionMore"
            @zuduiButtons="zuduiButtons"
            :postsDataOneIndex="-1"
            :theData="item"
          ></post-type-zudui>
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
    <view class="safe-bottom"></view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      schoolOneTitleIndex: 0,
      titles: [
        "综合",
        "话题",
        "组队/搭子",
        "分享/安利",
        "兼职",
        "表白",
        "求助",
        "其他",
      ],
      userInfo: {},
      isLoading: "loading",
      // 当前获取的校园墙页码，每次需要+1
      theGetMomentsListPage: 1,
      theGetMomentsListPagesize: 4,
      contentText: {
        contentdown: "查看更多",
        contentrefresh: "加载中...",
        contentnomore: "到底了，可点击此处手动加载~",
      },
      current: 0,
      inviteId: "",
      list: [
        {
          label: "店铺",
          value: 0,
        },
        {
          label: "动态",
          value: 1,
        },
      ],
      id: "",
      userId: "",
      theLogonUser: {},
      contentHeight: 0,
      shopList: [],
    };
  },
  // 监听下拉动作
  onPullDownRefresh() {
    // 重置获取的页码
    this.theGetMomentsListPage = 1;
    // 重置数组
    this.shopList = [];
    // 异步转同步调用
    (async () => {
      await this.getList();
      // 等待接口返回后，取消下拉刷新动画
      uni.stopPullDownRefresh();
    })();
  },
  onReachBottom() {
    // 触底后动画效果开启
    this.isLoading = "loading";
    this.getList();
  },
  onLoad(options) {
    let query = uni.createSelectorQuery().in(this);
    query
      .select(".mall-top")
      .boundingClientRect((data) => {
        this.contentHeight = data.height;
      })
      .exec();
    if (options.id) {
      this.id = options.id;
      this.userId = options.userId;
      this.getDetail();
    }
  },
  onShareAppMessage(e) {
    console.log(e, this.inviteId);
    if (e.from == "button") {
      return {
        title: this.inviteId.title,
        path: `/pages/index/detail?id=${this.inviteId.id}`,
        imageUrl: this.inviteId.url
          ? this.inviteId.url.split(",")[0]
          : "/static/icon-zd.png",
      };
    }
  },
  methods: {
    // 邀请/组队按钮
    zuduiButtons: async function (option) {
      if (option.type == 1) {
        // 1表示是组队的按钮
        // 这是保存一下当前本人的加入状态，用于判断最后本地是显示加入还是退出
        let temp_is_entry = option.is_entry;
        await this.$store.dispatch("toEntry", {
          id: option.id,
          is_entry: option.is_entry,
        });

        // console.log('this.$store.state.is_entry_true ',this.$store.state.is_entry_true );
        if (this.$store.state.is_entry_true == true) {
          for (let i = 0; i < this.shopList.length; i++) {
            if (option.id == this.shopList[i].id) {
              if (temp_is_entry == 2) {
                // 使用$set响应的改变对象数据，第一个参数是对象本身，第二个参数是属性（记得加引号），第三个是改变后的值
                this.$set(
                  this.shopList[i],
                  "entry_num",
                  this.shopList[i].entry_num + 1
                );
                this.$set(this.shopList[i], "is_entry", 1);
                uni.showToast({
                  title: "加入成功",
                  duration: 1000,
                  icon: "none",
                });
              } else {
                this.$set(
                  this.shopList[i],
                  "entry_num",
                  this.shopList[i].entry_num - 1
                );
                this.$set(this.shopList[i], "is_entry", 2);
                uni.showToast({
                  title: "已退出组队",
                  duration: 1000,
                  icon: "none",
                });
              }
            }
          }
        }
      } else {
        this.inviteId = option;
      }
    },
    //打开三个点的操作
    actionMore: function (option) {
      let that = this;
      let temp_is_collection = option.is_collection;
      let itemList = [option.is_collection == 2 ? "收藏" : "取消收藏"];
      uni.showActionSheet({
        itemList,
        itemColor: "#333333",
        success: (res) => {
          // console.log(res.tapIndex);
          if (["收藏", "取消收藏"].includes(itemList[res.tapIndex])) {
            let _that = that;
            (async function () {
              await _that.$store.dispatch("toCollection", {
                id: option.id,
              });

              if (_that.$store.state.is_collection_true == true) {
                // 表示调用接口成功
                for (let i = 0; i < _that.shopList.length; i++) {
                  if (option.id == _that.shopList[i].id) {
                    if (temp_is_collection == 2) {
                      // 使用$set响应的改变对象数据，第一个参数是对象本身，第二个参数是属性（记得加引号），第三个是改变后的值
                      _that.$set(_that.shopList[i], "is_collection", 1);
                      uni.showToast({
                        title: "收藏成功",
                        duration: 1000,
                        icon: "none",
                      });
                    } else {
                      _that.$set(_that.shopList[i], "is_collection", 2);
                      uni.showToast({
                        title: "已取消收藏",
                        duration: 1000,
                        icon: "none",
                      });
                    }
                  }
                }
              }
            })();
          }
        },
        fail: function (res) {},
      });
    },
    toFans() {
      uni.navigateTo({
        url:
          "/page_product/pages/fans/index?userId=" +
          this.userId +
          "&name=" +
          this.userInfo.nick_name,
      });
    },
    toSearch() {
      uni.navigateTo({
        url: "/page_product/pages/search/index?shopId=" + this.id,
      });
    },
    // 转换时间
    getTime() {
      return this.$public.showDateTime(this.userInfo.last_login_at);
    },
    toThumb: async function (option) {
      // 这里之所以又加了一层，是为了拿到子组件传过来的option
      // 这是保存一下当前本人的点赞状态，用于判断最后本地是增加还是减少点赞数的
      let temp_is_thumb = option.is_thumb;
      await this.$store.dispatch("toThumb", {
        id: option.id,
        is_thumb: option.is_thumb,
      });

      // console.log('this.$store.state.is_thumb_true ',this.$store.state.is_thumb_true );
      if (this.$store.state.is_thumb_true == true) {
        for (let i = 0; i < this.shopList.length; i++) {
          if (option.id == this.shopList[i].id) {
            if (temp_is_thumb == 2) {
              // 使用$set响应的改变对象数据，第一个参数是对象本身，第二个参数是属性（记得加引号），第三个是改变后的值
              this.$set(
                this.shopList[i],
                "thumb_num",
                this.shopList[i].thumb_num + 1
              );
              this.$set(this.shopList[i], "is_thumb", 1);
              uni.showToast({
                title: "点赞成功",
                duration: 1000,
                icon: "none",
              });
            } else {
              this.$set(
                this.shopList[i],
                "thumb_num",
                this.shopList[i].thumb_num - 1
              );
              this.$set(this.shopList[i], "is_thumb", 2);
              uni.showToast({
                title: "已取消点赞",
                duration: 1000,
                icon: "none",
              });
            }
          }
        }
      }
    },
    // 跳转主页
    topPerSonalhome: function (option) {
      if (option.is_anonymous == 2) {
        // 不匿名
        uni.navigateTo({
          url: "/pages/follow/personalhome?id=" + option.id,
        });
      } else {
        uni.showToast({
          title: "这个人很神秘，不想让你看到TA的主页~",
          duration: 2500,
          icon: "none",
        });
      }
    },
    // 跳转详情页
    toDetail: function (id) {
      uni.navigateTo({
        url: "/pages/index/detail?id=" + id,
      });
    },
    // 个人主页兼职不可以展示联系按钮
    toJzDetail: function (id) {
      uni.navigateTo({
        url: "/pages/index/detail?id=" + id + "&noPhone=1",
      });
    },
    // 跳转详情
    goDetail(item) {
      uni.navigateTo({
        url: "/page_product/pages/product/detail?id=" + item.id,
      });
    },
    // 关注
    followHandle() {
      this.API.order
        .regard({
          to_user_id: this.userInfo.id,
        })
        .then((res) => {
          console.log(res.data);
          this.getDetail("follow");
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.followHandle();
          }
        });
    },
    // 切换tab
    changeTab(index) {
      console.log(index);
      this.current = index;
      // 重置获取的页码
      this.theGetMomentsListPage = 1;
      // 重置数组
      this.shopList = [];
      this.getList();
    },
    // 获取列表
    async getList() {
      this.isLoading = "loading";
      let res = "";
      let params = {
        page: this.theGetMomentsListPage,
        pagesize: this.theGetMomentsListPagesize,
      };
      try {
        // 使用数据
        if (this.current == 0) {
          params = { ...params, shop_id: this.id, is_product: 1 };
          res = await this.API.home.getTaskList(params);
        } else {
          params = { ...params, create_id: this.userId, is_anonymous: 2 };
          res = await this.API.order.getMomentsList(params);
        }
        if (res.code == 0) {
          console.log(res);
          // 如果是请求第一页，证明是首次请求，就重置一下
          if (this.theGetMomentsListPage == 1) {
            this.shopList = [];
          }
          if (res.data.length != 0) {
            for (let i = 0; i < res.data.length; i++) {
              this.shopList.push({
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
        }
      } catch (error) {
        if (error.code == 410) {
          await this.$store.dispatch("toLogon", {});
          this.getList();
        }
      }
    },
    // 获取详情
    getDetail(type = "") {
      this.API.order
        .getHomePageTop({
          user_id: this.userId,
          shop_id: this.id,
        })
        .then((res) => {
          console.log(res.data);
          this.userInfo = res.data;
          this.theLogonUser = this.$store.state.theLogonUser;
          if (!type) {
            this.getList();
          }
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
.mall {
  box-sizing: border-box;
  overflow: hidden;
  .mall-top {
    top: 0;
    background-image: url("https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/v2/20240524/2024-05-24_15_28_09_refund_0_22.png");
    width: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: fixed;
    z-index: 10;
    .info-container {
      padding: 30rpx 30rpx 0;
      .info-name {
        justify-content: space-between;
        .info-name-left {
          image {
            border-radius: 100%;
            width: 130rpx;
            height: 130rpx;
          }
          .name-box {
            justify-content: center;
            align-items: flex-start;
            margin-left: 30rpx;
            flex-direction: column;
            .name-text {
              font-family: PingFang SC;
              font-weight: 600;
              font-size: 38rpx;
              color: #333333;
              margin-bottom: 25rpx;
            }
            .time-text {
              font-family: PingFang SC;
              font-weight: 400;
              font-size: 22rpx;
              color: #666666;
            }
          }
        }
      }
      .info-desc {
        font-family: PingFang SC;
        font-weight: 400;
        font-size: 26rpx;
        color: #333333;
        margin-top: 37rpx;
      }
      .info-school {
        margin-top: 33rpx;
        .info-school-box {
          background: rgba(237, 244, 238, 1);
          border-radius: 30rpx;
          padding: 9rpx 21rpx;
          justify-content: center;
          font-family: PingFang SC;
          font-weight: 400;
          font-size: 22rpx;
          color: #666666;
        }
        .info-school-name {
          image {
            width: 30rpx;
            height: 30rpx;
            margin-right: 9rpx;
          }
        }
        .info-school-major {
          margin-left: 20rpx;
        }
      }
      .other-info {
        justify-content: space-between;
        margin-top: 19rpx;
        .other-info-left {
          line-height: 20rpx;
          font-family: PingFang SC;
          font-weight: 400;
          font-size: 24rpx;
          color: #000000;
          text {
            font-family: Myriad Pro;
            font-weight: 400;
            font-size: 34rpx;
            color: #000000;
            margin-right: 15rpx;
          }
          .mar-l-50 {
            margin-left: 50rpx;
          }
        }
        .other-info-right {
          padding: 15rpx 30rpx;
          background: #f89f12;
          border-radius: 50rpx;
          font-family: PingFang SC;
          font-weight: 400;
          font-size: 26rpx;
          color: #ffffff;
        }
        .is-regard {
          background: #bbbbbb;
        }
      }
    }
    .tab-container {
      justify-content: space-between;
      margin-top: 30rpx;
      background: #ffffff;
      border-radius: 40rpx 40rpx 0 0;
      padding: 30rpx 30rpx 0;
      .tab-box {
        .tab-item {
          display: flex;
          justify-content: center;
          position: relative;
          margin-right: 45rpx;
          text {
            font-family: PingFang SC;
            font-weight: 400;
            font-size: 32rpx;
            color: #333333;
            line-height: 37rpx;
            z-index: 1;
            position: relative;
          }
          .heng {
            bottom: 0;
            position: absolute;
            width: 64rpx;
            height: 10rpx;
            background: #ff812f;
          }
        }
        .tab-item:last-child {
          margin-right: 0;
        }
        .choose {
          text {
            font-family: PingFang SC;
            font-weight: 600;
            font-size: 32rpx;
            color: #333333;
          }
        }
      }
    }
  }
  .list-box {
    .shop-list-box {
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
    .posts-data {
      position: relative;
      z-index: 1;
    }
  }
  .shop-list {
    padding: 36rpx 30rpx 0;
  }
  .flex-algin {
    display: flex;
    align-items: center;
  }
  .safe-bottom {
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>