<template>
  <view class="content">
    <!-- 内容：关注的人 -->
    <view class="followed-users">
      <view
        class="followed-users-item flex-align"
        :class="[{ 'no-read': item.status == 2 && type == '互动' }]"
        v-for="(item, index) in pageData"
        :key="index"
      >
        <view class="followed-users-item-left flex-align">
          <view class="img-box">
            <view class="dian" v-if="item.status == 2 && type == '互动'"></view>
            <image
              @click="topPerSonalhome(item.from_user_id)"
              mode="aspectFill"
              :src="item.from_avatar_url"
            />
          </view>
          <view @click="toDetail(item)" class="message-info">
            <view class="message-name">{{ item.from_nick_name }}</view>
            <view
              class="message-desc"
              :class="type == '关注' ? 'gz-desc' : 'hd-desc'"
            >
              {{ item.msg }}
            </view>
          </view>
        </view>
        <view
          v-if="type == '关注'"
          @click="topPerSonalhome(item.from_user_id)"
          class="message-btn"
          >TA的主页</view
        >
        <image
          @click="toDetail(item)"
          v-if="type == '互动'"
          class="img_url"
          :class="{ 'bg-img': item.img_url }"
          :src="$public.strToArr(item.img_url, ',')[0]"
          mode="aspectFill"
        ></image>
      </view>
      <!-- 底部垫层 -->
      <view @click="getMySystemMsgList()" class="space-line-bottom">
        <uni-load-more
          :status="isMore"
          :content-text="contentText"
        ></uni-load-more>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      contentText: {
        contentdown: "查看更多",
        contentrefresh: "加载中...",
        contentnomore: "到底了，可点击此处手动加载~",
      },

      // 类型：新的关注或者互动消息
      type: "",

      // 最后的加载组件的加载动画效果，
      isLoading: "loading",
      // 当前获取的校园墙页码，每次需要+1
      theGetListPage: 1,
      theGetListPagesize: 10,

      // 已读消息传的id,多个用逗号拼接
      theIds: "",
      tempIds: [], // 用于存id
      // 列表数据
      pageData: [],
    };
  },
  onLoad(option) {
    // 判断是新的关注还是互动消息
    this.type = option.type;
    uni.setNavigationBarTitle({
      title: option.type == "关注" ? "新的关注" : "互动消息",
    });
    let that = this;
    (async function () {
      await that.getMySystemMsgList();
      that.setSystemMsgIsRead();
    })();
  },
  // 页面触底的监听事件，配合pages.json中的"onReachBottomDistance": 0，0的位置写距离底部的距离
  onReachBottom() {
    // 触底后动画效果开启
    this.isLoading = "loading";

    // 调用接口
    let that = this;
    (async function () {
      await that.getMySystemMsgList();
      that.setSystemMsgIsRead();
    })();
  },
  methods: {
    //------------------------------------------------  页面跳转  -----------------------------------------------------
    //------------------------------------------------  页面跳转  -----------------------------------------------------
    //------------------------------------------------  页面跳转  -----------------------------------------------------
    // 跳转主页
    topPerSonalhome: function (id) {
      uni.navigateTo({
        url: "/pages/follow/personalhome?id=" + id,
      });
    },
    // 跳转详情页
    toDetail: function (item) {
      if (this.type != "互动") {
        return;
      }
      if (item.is_on == 1) {
        uni.navigateTo({
          url: "/pages/index/detail?id=" + item.moments_id,
        });
      } else {
        uni.showToast({
          title: "找不到对应的校园墙",
          duration: 2500,
          icon: "none",
        });
      }
    },
    //------------------------------------------------  接口调用  -----------------------------------------------------
    //------------------------------------------------  接口调用  -----------------------------------------------------
    //------------------------------------------------  接口调用  -----------------------------------------------------
    // 互动消息-分页获取我的互动、关注消息列表
    getMySystemMsgList: function () {
      let _this = this;
      return new Promise(function (resolve, reject) {
        let that = _this;
        that.isLoading = "loading"; // 加载中
        uni.request({
          url: that.$store.state.theUrl + "/wechat/sundry/getMySystemMsgList", //人员-分页获取我的关注好友，粉丝和同学
          method: "GET",
          header: {
            token: that.$store.state.theToken,
          },
          data: {
            page: that.theGetListPage,
            pagesize: that.theGetListPagesize,
            type: that.type, //类型：互动（默认）、关注
          },
          success: (res) => {
            console.log("getMySystemMsgList", res);
            let _that = that;
            // 如果是请求第一页，证明是首次请求，就重置一下
            if (_that.theGetListPage == 1) {
              _that.pageData = [];
              _that.tempIds = [];
            }

            if (res.data.code == 0) {
              if (res.data.data.length != 0) {
                for (let i = 0; i < res.data.data.length; i++) {
                  _that.pageData.push(res.data.data[i]);
                  _that.tempIds.push(res.data.data[i].id);
                }

                _that.theIds = _that.tempIds.join(",");
                _that.isLoading = "no-more"; // 取消加载动画
                // console.log('_that.addressData',_that.addressData);
                // 页面+1
                _that.theGetListPage += 1;
                resolve();
              } else {
                _that.isLoading = "no-more"; // 取消加载动画
                // uni.showToast({
                // 	title: '没有更多了哦~',
                // 	duration: 1500,
                // 	icon: 'none'
                // })
                resolve();
              }
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

                __that.getMySystemMsgList();
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
    // 已读消息
    setSystemMsgIsRead: function () {
      let _this = this;
      return new Promise(function (resolve, reject) {
        let that = _this;
        uni.request({
          url: that.$store.state.theUrl + "/wechat/sundry/setSystemMsgIsRead", //人员-分页获取我的关注好友，粉丝和同学
          method: "POST",
          header: {
            token: that.$store.state.theToken,
          },
          data: {
            ids: that.theIds, // 消息id，多个用逗号拼接
          },
          success: (res) => {
            console.log("setSystemMsgIsRead", res);
            let _that = that;

            if (res.data.code == 0) {
              for (let i = 0; i < _that.pageData.length; i++) {
                _that.pageData[i].status = 1;
              }
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

                __that.getMySystemMsgList();
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

<style lang="scss">
.followed-users {
  border-top: 20rpx solid #fafafa;
  overflow: hidden;
  .followed-users-item {
    padding: 20rpx 30rpx;
    justify-content: space-between;

    .followed-users-item-left {
      .img-box {
        position: relative;
        width: 100rpx;
        height: 100rpx;
        margin-right: 19rpx;
        .dian {
          position: absolute;
          top: 0;
          left: 0;
          width: 10rpx;
          height: 10rpx;
          background: #f23333;
          border-radius: 50%;
        }
        image {
          width: 100rpx;
          height: 100rpx;
          border-radius: 50%;
        }
      }
      .message-info {
        height: 100rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .message-name {
          font-family: PingFang SC;
          font-weight: 500;
          font-size: 26rpx;
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
          font-size: 24rpx;
          color: #666666;
        }
        .gz-desc {
          width: 50vw;
          overflow: hidden; /* 确保内容超出容器时会被隐藏 */
          white-space: nowrap; /* 确保文本在一行内显示，避免换行 */
          text-overflow: ellipsis; /* 用省略号表示被截断的文本 */
        }
        .hd-desc {
          width: 55vw;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
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
  .no-read {
    background: rgba(248, 159, 18, 0.05);
  }
}

.followed-users-one {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 3.5vw;
  width: 93vw;
  padding: 5.5vw 3.5vw;
}

.followed-users-one-left-avatar {
  border-radius: 100%;
  width: 17vw;
  height: 17vw;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  background-color: #e5feed !important;
}

.red-tip {
  width: 10px !important;
  height: 10px !important;
  border-radius: 100%;
  background-color: #ff0000;
  margin-left: 5px;
}

.followed-users-one-right {
  padding-left: 3.5vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 73.5vw;
}

.followed-users-one-right-left {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  width: 45vw;
}

.followed-users-one-right-left-name {
  font-size: 15px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
}

.followed-users-one-right-left-intro {
  margin-top: 5px;
  font-size: 12px;
  color: #bbbbbb;
}

.followed-users-one-right-right {
  height: 35px;
  line-height: 35px;
  background: #ff812f;
  padding: 0 10px;
  border-radius: 100px;
  font-size: 13px;
  color: #ffffff;
}

.img_url {
  width: 120rpx;
  height: 120rpx;
  border-radius: 10rpx;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  background-color: #e5e5e5 !important;

  background-position: center !important;
}
.bg-img {
  background: transparent !important;
}

.space-line-bottom {
  height: 80px;
}
.flex-align {
  display: flex;
  align-items: center;
}
</style>