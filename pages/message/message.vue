<template>
  <view class="content">
    <!-- 导航栏 -->
    <view
      class="status-navBar"
      :style="'height:' + (statusBarHeight + navBarHeight) + 'px;'"
    >
      <view class="navBar" :style="'height:' + navBarHeight + 'px;'">
        <view
          :style="
            'height:' + navBarHeight + 'px;line-height:' + navBarHeight + 'px;'
          "
          >消息中心</view
        >
      </view>
    </view>
    <view
      class="message-container"
      :style="'margin-top:' + (statusBarHeight + navBarHeight) + 'px;'"
    >
      <view class="search-box">
        <u-search
          @click="toSearch()"
          disabled
          placeholder="请输入搜索关键词"
          v-model="searchInputText"
          :showAction="false"
        ></u-search
      ></view>
      <view class="message-list">
        <!-- 关注 -->
        <view @click="toRegard('关注')" class="message-list-item flex-align">
          <view class="message-list-item-left flex-align">
            <image src="/static/4_guanzhu@3x.png" mode="widthFix" />
            <view class="message-info">
              <view class="message-name red-tip-box"
                >新的关注<view
                  v-if="pageData.regard.has_not_read == 1"
                  class="red-tip"
                ></view
              ></view>
              <view class="message-desc">
                {{ pageData.regard.data.msg }}
              </view>
            </view>
          </view>
          <uni-icons color="#333333" type="right" size="20"></uni-icons>
        </view>
        <!-- 互动 -->
        <view @click="toRegard('互动')" class="message-list-item flex-align">
          <view class="message-list-item-left flex-align">
            <image src="/static/4_hudong@3x@3x.png" mode="widthFix" />
            <view class="message-info">
              <view class="message-name red-tip-box"
                >互动消息<view
                  v-if="pageData.interact.has_not_read == 1"
                  class="red-tip"
                ></view
              ></view>
              <view class="message-desc">
                {{ pageData.interact.data.msg }}
              </view>
            </view>
          </view>
          <uni-icons color="#333333" type="right" size="20"></uni-icons>
        </view>
        <view
          class="message-list-item flex-align"
          v-for="(item, index) in messageList"
          :key="index"
        >
          <view class="message-list-item-left flex-align">
            <image
              @click="topPerSonalhome(item.id)"
              mode="aspectFill"
              :src="item.avatar_url"
            />
            <view class="message-info">
              <view class="message-name">{{ item.nick_name }}</view>
              <view class="message-desc">
                {{ item.intro ? item.intro : "这家伙很神秘，没有写个人简介。" }}
              </view>
            </view>
          </view>
          <uni-icons color="#333333" type="right" size="20"></uni-icons>
        </view>
      </view>
    </view>
    <!-- 底部垫层 -->
    <view class="space-line-bottom"> </view>
    <view class="safe-bottom"></view>
    <tab-Bar current="3"></tab-Bar>
  </view>
</template>

<script>
export default {
  data() {
    return {
      messageList: [],
      searchInputText: "",
      // 顶部状态栏和导航栏高度
      statusBarHeight: 0,
      navBarHeight: 0,

      // 页面数据
      pageData: {
        regard: {
          // 关注
          has_not_read: 1, //是否有未读信息，1-是，2-否
          data: {
            id: 1,
            msg: "",
            created_at: "2024-03-17 09:23:24",
          },
        },
        interact: {
          //互动
          has_not_read: 1, //是否有未读信息，1-是，2-否
          data: {
            id: 2,
            msg: "",
            created_at: "2024-03-17 09:26:31",
          },
        },
      },
    };
  },
  onLoad() {
    // 获取状态和导航栏高度
    let barObj = this.$public.getTopIconDistance();
    this.statusBarHeight = barObj.statusBarHeight;
    this.navBarHeight = barObj.navBarHeight;
  },
  onShow() {
    // 记录当前的previousPage，用于二次点击发布回到原来页面
    this.$store.commit("changePreviousPage", {
      previousPage: 3,
      isPage_2: false,
    });

    let that = this;
    (async function () {
      await that.getSystemSummaryMsg();
      if (
        that.pageData.regard.has_not_read == 2 &&
        that.pageData.interact.has_not_read == 2
      ) {
        that.$store.commit("changeRedTip", {
          isRedTip: false,
        });
      }
    })();
    // console.log('that.$store.state.isRedTip',that.$store.state.isRedTip);
  },
  methods: {
    //------------------------------------------------  页面跳转  -----------------------------------------------------
    //------------------------------------------------  页面跳转  -----------------------------------------------------
    //------------------------------------------------  页面跳转  -----------------------------------------------------
    // 跳转新的关注页面
    toRegard: function (type) {
      uni.navigateTo({
        // type=1 表示是index页面过来的
        url: "/pages/message/regard?type=" + type,
      });
    },
    //------------------------------------------------  接口调用  -----------------------------------------------------
    //------------------------------------------------  接口调用  -----------------------------------------------------
    //------------------------------------------------  接口调用  -----------------------------------------------------
    // 获取消息统计
    getSystemSummaryMsg: function () {
      let _this = this;
      return new Promise(function (resolve, reject) {
        let that = _this;
        uni.request({
          url: that.$store.state.theUrl + "/wechat/sundry/getSystemSummaryMsg", //获取关注和互动消息汇总数据
          method: "GET",
          header: {
            token: that.$store.state.theToken,
          },
          success: (res) => {
            // console.log('getSystemSummaryMsg', res);
            let _that = that;

            if (res.data.code == 0) {
              _that.pageData = res.data.data;
              resolve();
            } else if (res.data.code == 500) {
              uni.showToast({
                title: "服务器连接失败，请反馈官方客服哦~",
                duration: 2500,
                icon: "none",
              });
            } else if (res.data.code == 410) {
              let __that = _that;
              // 异步转同步，
              (async function () {
                // 登录
                await __that.$store.dispatch("toLogon", {});

                // 重置

                __that.getSystemSummaryMsg();
              })();
            } else {
              uni.showToast({
                title: res.data.msg,
                duration: 2500,
                icon: "none",
              });
            }
          },
          fail: (res) => {
            uni.showToast({
              title: "网络失败，请重试！多次无效后，反馈官方客服哦！",
              duration: 2500,
              icon: "none",
            });
          },
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.status-navBar {
  width: 100vw;
  position: fixed;
  top: 0;
  background-color: #ffffff;
  z-index: 8;
}

.navBar {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #ffffff;
  text-align: start;
  padding-left: 3.5vw;
}

.navBar view {
  font-size: 15px;
  font-weight: bold;
}

.navBar image {
  margin-left: 5px;
  width: 3.5vw;
  height: 3.5vw;
}

.the-line-1 {
  width: 93vw;
  padding: 3.5vw;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.the-line-1-image {
  width: 17vw;
  height: 17vw;
}

.the-line-1-right {
  width: 76vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.the-line-1-right-left {
  margin-left: 3.5vw;
}

.the-line-1-right-left-top {
  font-weight: bold;
  font-size: 15px;
  display: flex;
  flex-direction: row;
}

.the-line-1-right-left-bottom {
  font-size: 13px;
  color: #bbbbbb;
  margin-top: 10px;
  width: 65vw;
}

.the-line-2 {
  width: 93vw;
  padding: 3.5vw;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.red-tip {
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  background-color: #ff0000;
  margin-left: 15rpx;
}

.uni-icons {
  width: 11vw;
  text-align: center;
}
.message-container {
  padding: 40rpx 30rpx 0;
  .message-list {
    overflow: hidden;
    .message-list-item {
      margin-top: 25rpx;
      justify-content: space-between;
      .message-list-item-left {
        image {
          width: 100rpx;
          height: 100rpx;
          margin-right: 19rpx;
          border-radius: 50%;
        }
        .message-info {
          height: 100rpx;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .message-name {
            font-family: PingFang SC;
            font-weight: 500;
            font-size: 28rpx;
            color: #000000;
          }
          .red-tip-box {
            position: relative;
            display: flex;
            align-items: flex-start;
          }
          .message-desc {
            font-family: PingFang SC;
            font-weight: 400;
            font-size: 22rpx;
            color: #b3b3b3;
            width: 65vw;
            overflow: hidden; /* 确保内容超出容器时会被隐藏 */
            white-space: nowrap; /* 确保文本在一行内显示，避免换行 */
            text-overflow: ellipsis; /* 用省略号表示被截断的文本 */
          }
        }
      }
      .message-btn {
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
}
.space-line-bottom {
  height: 250rpx;
}
.safe-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}

.flex-align {
  display: flex;
  align-items: center;
}
</style>