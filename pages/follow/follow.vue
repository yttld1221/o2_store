<template>
  <view class="follow">
    <!-- 导航栏 -->
    <view
      class="status-navBar"
      :style="'height:' + (statusBarHeight + navBarHeight) + 'px;'"
    >
      <view
        @click="changeFollow"
        class="navBar"
        :style="'height:' + navBarHeight + 'px;'"
      >
        <view
          :style="
            'height:' + navBarHeight + 'px;line-height:' + navBarHeight + 'px;'
          "
          >我的关注</view
        >
        <image src="/static/2_qiehuan@3x.png" mode="widthFix"></image>
      </view>
    </view>
    <!-- 内容：关注的人 -->
    <view
      v-if="navBarIndex == 0"
      class="fans-list"
      :style="'margin-top:' + (statusBarHeight + navBarHeight) + 'px;'"
    >
      <view
        class="fans-list-item flex-align"
        v-for="(item, index) in followedUsers"
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
        <view @click="toRegard(item, index)" class="fans-btn">
          <text>取关</text></view
        >
      </view>

      <!-- <view class="followed-users-one" v-for="(item, index) in followedUsers">
        <view
          @click="topPerSonalhome(item.id)"
          class="followed-users-one-left-avatar"
          :style="'background: url(' + item.avatar_url + ');'"
        ></view>
        <view class="followed-users-one-right">
          <view class="followed-users-one-right-left">
            <view class="followed-users-one-right-left-name">{{
              item.nick_name
            }}</view>
            <view class="followed-users-one-right-left-intro">{{
              item.intro
            }}</view>
          </view>
          <view
            @click="toRegard(item, index)"
            class="followed-users-one-right-right"
            >取消关注</view
          >
        </view>
      </view> -->
      <!-- 底部垫层 -->
      <view @click="getMyPerson()" class="space-line-bottom">
        <uni-load-more
          :status="isLoading"
          :content-text="contentText"
        ></uni-load-more>
      </view>
    </view>
    <!-- 内容：关注的帖子 -->
    <view
      v-if="navBarIndex == 1"
      class="followed-posts"
      :style="'margin-top:' + (statusBarHeight + navBarHeight) + 'px;'"
    >
      <view class="posts-data" v-for="(item, index) in school_datas">
        <post-type-zudui
          :isPersonalHome="true"
          @topPerSonalhome="topPerSonalhome"
          @toDetail="toDetail"
          :postsDataOneIndex="-1"
          :theData="item"
        ></post-type-zudui>
      </view>
      <!-- 底部垫层 -->
      <view @click="getMomentsList()" class="space-line-bottom">
        <uni-load-more
          :status="isLoading"
          :content-text="contentText"
        ></uni-load-more>
      </view>
    </view>

    <tab-Bar current="1"></tab-Bar>
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

      // 顶部状态栏和导航栏高度
      statusBarHeight: 0,
      navBarHeight: 0,
      // 当前页面切换,默认是人的关注
      navBarIndex: 0,

      // 最后的加载组件的加载动画效果，
      isLoading: "loading",
      // 当前获取的校园墙页码，每次需要+1
      theGetListPage: 1,
      theGetListPagesize: 10,

      // 我关注的人
      followedUsers: [],
      //
      school_datas: [
        // {
        // 	id: 1,
        // 	title: "欢迎来到氧气仓库官方资讯，这里有最前沿的校园资讯分享，快来和我一起看看吧～",
        // 	url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230518/1684379049443118.png,https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230518/1684379049443118.png,https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230518/1684379049443118.png,https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230518/1684379049443118.png", // 图片，多张用英文的逗号隔开
        // 	pid: 0,
        // 	is_on: 1, // 是否是上线状态，1表示是，2表示否
        // 	is_hot: 2, // 是否是热门，1表示是，2表示否
        // 	school_id: 3, // 发布人所在学校ID
        // 	type: "话题", //类型有：话题、组队/搭子、分享/安利、二手闲置、兼职、表白、求助、其他
        // 	label: "#打球,#吃喝玩,#看电影,#看电影,#看电影,#看电影,#看电影,#看电影,#看电影", // 标签，多个用英文的逗号隔开
        // 	is_anonymous: 1, // 是否匿名 1表示是，2表示不匿名
        // 	wages: "", // 兼职用的，工资金额或者显示"面议"
        // 	settlement: "", // 工资结算方式  用/拼接
        // 	hope_num: 10, // 组队的期望人数
        // 	free_type: "", // 组队的费用类型  免费/AA
        // 	is_entry: 1, // 本人是否报名组队，1是，2否
        // 	area_code: "640100", // 活动区地区代码
        // 	task_id: 0, // 关联的活动ID
        // 	created_at: "2023-05-18 11:05:13", // 第一次插入时间
        // 	released_at: "2024-03-11 16:05:13", // 发布时间
        // 	create_id: 50, // 发布人ID
        // 	sex_type: "", // 组队的性别要求
        // 	start_at: null, // 组队活动开始日期
        // 	end_at: null, // 组队活动开始日期
        // 	is_regard: 2, // 组队活动结束日期
        // 	is_thumb: 1, // 本人是否点过赞 1是2否
        // 	thumb_num: 1, // 点赞数
        // 	comment_num: 0, // 评论数
        // 	entry_num: 3, // 实际报名人数
        // 	nick_name: "氧*",
        // 	avatar_url: "https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/20230518/1684378586065116.png",
        // 	school_name: "宁波大学",
        // 	area_name: "银川市"
        // }
      ],
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
      previousPage: 1,
      isPage_2: false,
    });

    // 显示的时候重置一下
    this.theGetListPage = 1;
    if (this.navBarIndex == 0) {
      this.getMyPerson();
    } else {
      this.getMomentsList();
    }
  },
  // 监听下拉动作
  onPullDownRefresh() {
    // 重置获取的页码
    this.theGetListPage = 1;
    // 异步转同步调用
    (async () => {
      if (this.navBarIndex == 0) {
        await this.getMyPerson();
      } else {
        await this.getMomentsList();
      }
      // 等待接口返回后，取消下拉刷新动画
      uni.stopPullDownRefresh();
    })();
  },
  // 页面触底的监听事件，配合pages.json中的"onReachBottomDistance": 0，0的位置写距离底部的距离
  onReachBottom() {
    // 触底后动画效果开启
    this.isLoading = "loading";

    // 调用接口
    if (this.navBarIndex == 0) {
      this.getMyPerson();
    } else {
      this.getMomentsList();
    }
  },
  methods: {
    // 切换导航栏
    changeFollow: function () {
      // 重置
      this.theGetListPage = 1;
      if (this.navBarIndex == 0) {
        this.navBarIndex = 1;
        this.getMomentsList();
      } else {
        this.navBarIndex = 0;
        this.getMyPerson();
      }
    },
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
    toDetail: function (id) {
      uni.navigateTo({
        url: "/pages/index/detail?id=" + id,
      });
    },
    //------------------------------------------------  接口调用  -----------------------------------------------------
    //------------------------------------------------  接口调用  -----------------------------------------------------
    //------------------------------------------------  接口调用  -----------------------------------------------------
    // 取消关注
    toRegard: async function (item, index) {
      await this.$store.dispatch("toRegard", {
        id: item.id,
      });
      if (this.$store.state.is_regard_true == true) {
        this.followedUsers.splice(index, 1);
        uni.showToast({
          title: "已取消关注",
          duration: 1000,
          icon: "none",
        });
      }
    },

    // 我的关注的人
    getMyPerson: function () {
      let _this = this;
      return new Promise(function (resolve, reject) {
        let that = _this;
        that.isLoading = "loading"; // 加载中
        uni.request({
          url: that.$store.state.theUrl + "/wechat/sundry/getMyPerson", //人员-分页获取我的关注好友，粉丝和同学
          method: "POST",
          header: {
            token: that.$store.state.theToken,
          },
          data: {
            page: that.theGetListPage,
            pagesize: that.theGetListPagesize,
            type: "关注", //类型：关注、粉丝、同学
          },
          success: (res) => {
            // console.log('getMyPerson', res);
            let _that = that;
            // 如果是请求第一页，证明是首次请求，就重置一下
            if (_that.theGetListPage == 1) {
              _that.followedUsers = [];
            }

            if (res.data.code == 0) {
              if (res.data.data.length != 0) {
                for (let i = 0; i < res.data.data.length; i++) {
                  _that.followedUsers.push(res.data.data[i]);
                }

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

                __that.getMyPerson();
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
    // 分页获取接口数据
    getMomentsList: function () {
      let _this = this;
      return new Promise(function (resolve, reject) {
        let that = _this;
        that.isLoading = "loading"; // 加载中

        uni.request({
          url: that.$store.state.theUrl + "/wechat/moments/getMomentsList",
          method: "POST",
          header: {
            token: that.$store.state.theToken,
          },
          data: {
            // 传参不全，当前只用到onload时候需要的字段
            page: that.theGetListPage,
            pagesize: that.theGetListPagesize,
            is_collection: 1, // 本人是否收藏，1-是，0-不限（默认）
            type: "",
          },
          success: (res) => {
            // console.log('getMomentsList_res', res);
            let _that = that;
            // 如果是请求第一页，证明是首次请求，就重置一下
            if (_that.theGetListPage == 1) {
              _that.school_datas = [];
            }

            if (res.data.code == 0) {
              if (res.data.data.length != 0) {
                for (let i = 0; i < res.data.data.length; i++) {
                  _that.school_datas.push(res.data.data[i]);
                }

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

                __that.getMomentsList();
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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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

.followed-users {
  width: 100vw;
  z-index: 1;
  overflow: scroll;
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
}

.followed-users-one-right-left-name {
  font-size: 15px;
  font-weight: bold;
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

.followed-posts {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
}

.space-line-bottom {
  height: 180px;
}
</style>