<template>
  <view class="content">
    <view class="bg"></view>
    <!-- 第一行：头像、昵称等 -->
    <view class="the-line-1">
      <!-- 头像 -->
      <view
        class="the-line-1-left"
        :style="'background: url(' + thePersonalInfo.avatar_url + ');'"
      ></view>
      <!-- 昵称等 -->
      <view class="the-line-1-right">
        <!-- 昵称，二维码 -->
        <view class="the-line-1-right-top">
          <!-- 昵称 账号 -->
          <view class="the-line-1-right-top-left">
            <view class="the-line-1-right-top-left-name">{{
              thePersonalInfo.nick_name
            }}</view>
            <view class="the-line-1-right-top-left-num"
              >最近登录：{{
                $public.showDateTime(thePersonalInfo.last_login_at)
              }}</view
            >
          </view>
          <!-- 分享 -->
          <image
            class="share"
            src="/static/2_share@3x.png"
            mode="widthFix"
          ></image>
        </view>
        <!-- 学校 专业 -->
        <view class="the-line-1-right-bottom">
          <view class="the-line-1-right-bottom-school">
            <image src="/static/1_school_icon@3x.png" mode="widthFix"></image>
            <view>{{
              thePersonalInfo.school_name != ""
                ? thePersonalInfo.school_name
                : "学校不详"
            }}</view>
          </view>
          <view
            v-if="thePersonalInfo.specialty"
            class="the-line-1-right-bottom-school margin-left-10"
          >
            <view>{{ thePersonalInfo.specialty }}</view>
          </view>
        </view>
      </view>
    </view>
    <!-- 第二行：签名 -->
    <view :class="{ 'the-line-2': true, gray: thePersonalInfo.intro == '' }">
      {{
        thePersonalInfo.intro != ""
          ? thePersonalInfo.intro
          : "这家伙很神秘，没有写个人简介。"
      }}
    </view>
    <!-- 第三行：关注和 粉丝数-->
    <view class="the-line-3">
      <view class="the-line-3-nums">
        <view class="the-line-3-nums-regard_num"
          ><text>{{ thePersonalInfo.regard_num }}</text> 关注</view
        >
        <view @click="toFans()" class="the-line-3-nums-regard_num"
          ><text>{{ thePersonalInfo.fans_num }}</text> 粉丝</view
        >
      </view>
      <view v-if="isMe()" class="the-line-3-button">
        <view
          @click="toRegard('关注TA')"
          v-if="thePersonalInfo.is_regard == 2"
          class="button"
          >关注TA</view
        >
        <view
          @click="toRegard('取消关注')"
          v-if="thePersonalInfo.is_regard == 1"
          class="bg-gray"
          >取消关注</view
        >
      </view>
    </view>
    <!-- 第四行：列表按钮 -->
    <view class="the-line-4">
      <view
        @click="line_4_itemsSelected(index)"
        class="the-line-4-item"
        v-for="(item, index) in line_4_items"
      >
        <view
          :class="{
            'the-line-4-item-name': true,
            'the-line-4-item-selected': index == line_4_items_index,
          }"
          >{{ item }}</view
        >
        <view
          v-if="index == line_4_items_index"
          class="the-line-4-item-line"
        ></view>
      </view>
    </view>
    <!-- 第五行：列表内容 -->
    <view class="the-line-5">
      <view
        class="posts-data"
        :key="index"
        v-for="(item, index) in school_datas"
      >
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
    <!-- 底部垫层 -->
    <view class="space-line-bottom">
      <uni-load-more :status="isLoading"></uni-load-more>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 顶部状态栏和导航栏高度
      statusBarHeight: 0,
      navBarHeight: 0,

      // 最后的加载组件的加载动画效果，
      isLoading: "loading",
      // 当前获取的校园墙页码，每次需要+1
      theGetMomentsListPage: 1,
      theGetMomentsListPagesize: 10,

      //
      line_4_items: ["TA的动态"],
      line_4_items_index: 0,
      inviteId: "",
      // 主页个人信息
      thePersonalInfo: {
        id: 50,
        name: "官方账号用于资讯过审",
        nick_name: "不愿意透露姓名的唐马儒先生",
        avatar_url:
          "https://ljkj-web-kb.oss-cn-hangzhou.aliyuncs.com/avatar.png",
        school_id: 3,
        intro: "这次可不可以认真点帮我打个码。", // 自我介绍
        shop_id: 0,
        last_login_at: "2024-03-19 09:53:05", // 最近一次登入时间，精确到时分秒
        school_name: "宁波大学",
        merchant: "", // 店铺名称
        is_regard: 2, // 关注，1-是，2-否
        regard_num: 999, //	关注数
        fans_num: 999, // 粉丝数
      },
      // 帖子内容
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
  onLoad(option) {
    // console.log('option',option);

    let that = this;
    (async function () {
      // 调用页面数据
      await that.$store.dispatch("getHomePageTop", {
        id: option.id,
      });

      that.thePersonalInfo = that.$store.state.homePageData;

      that.getMomentsList();
    })();
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
  onShow() {},
  // 页面触底的监听事件，配合pages.json中的"onReachBottomDistance": 0，0的位置写距离底部的距离
  onReachBottom() {
    // 触底后动画效果开启
    this.isLoading = "loading";

    // 调用接口
    this.getMomentsList();
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
          for (let i = 0; i < this.school_datas.length; i++) {
            if (option.id == this.school_datas[i].id) {
              if (temp_is_entry == 2) {
                // 使用$set响应的改变对象数据，第一个参数是对象本身，第二个参数是属性（记得加引号），第三个是改变后的值
                this.$set(
                  this.school_datas[i],
                  "entry_num",
                  this.school_datas[i].entry_num + 1
                );
                this.$set(this.school_datas[i], "is_entry", 1);
                uni.showToast({
                  title: "加入成功",
                  duration: 1000,
                  icon: "none",
                });
              } else {
                this.$set(
                  this.school_datas[i],
                  "entry_num",
                  this.school_datas[i].entry_num - 1
                );
                this.$set(this.school_datas[i], "is_entry", 2);
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
                for (let i = 0; i < _that.school_datas.length; i++) {
                  if (option.id == _that.school_datas[i].id) {
                    if (temp_is_collection == 2) {
                      // 使用$set响应的改变对象数据，第一个参数是对象本身，第二个参数是属性（记得加引号），第三个是改变后的值
                      _that.$set(_that.school_datas[i], "is_collection", 1);
                      uni.showToast({
                        title: "收藏成功",
                        duration: 1000,
                        icon: "none",
                      });
                    } else {
                      _that.$set(_that.school_datas[i], "is_collection", 2);
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
        fail: function (res) {
          // console.log(res.errMsg);
        },
      });
    },
    toFans() {
      uni.navigateTo({
        url:
          "/page_product/pages/fans/index?userId=" +
          this.thePersonalInfo.id +
          "&name=" +
          this.thePersonalInfo.nick_name,
      });
    },
    // 是否是本人
    isMe: function () {
      return this.thePersonalInfo.id != this.$store.state.theLogonUser.id;
    },
    // 点击关注
    toRegard: async function (item) {
      if (item == "关注TA") {
        await this.$store.dispatch("toRegard", {
          id: this.thePersonalInfo.id,
        });

        this.thePersonalInfo.is_regard = 1;
        this.thePersonalInfo.fans_num += 1;
      } else {
        await this.$store.dispatch("toRegard", {
          id: this.thePersonalInfo.id,
        });

        this.thePersonalInfo.is_regard = 2;
        this.thePersonalInfo.fans_num -= 1;
      }
    },
    // 切换栏目
    line_4_itemsSelected: function (index) {
      this.line_4_items_index = index;
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
    // 点赞
    // 说明：点赞的接口放在index.js公共store中
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
        for (let i = 0; i < this.school_datas.length; i++) {
          if (option.id == this.school_datas[i].id) {
            if (temp_is_thumb == 2) {
              // 使用$set响应的改变对象数据，第一个参数是对象本身，第二个参数是属性（记得加引号），第三个是改变后的值
              this.$set(
                this.school_datas[i],
                "thumb_num",
                this.school_datas[i].thumb_num + 1
              );
              this.$set(this.school_datas[i], "is_thumb", 1);
              uni.showToast({
                title: "点赞成功",
                duration: 1000,
                icon: "none",
              });
            } else {
              this.$set(
                this.school_datas[i],
                "thumb_num",
                this.school_datas[i].thumb_num - 1
              );
              this.$set(this.school_datas[i], "is_thumb", 2);
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
    //------------------------------------------------  直接的接口方法  -----------------------------------------------------
    //------------------------------------------------  直接的接口方法  -----------------------------------------------------
    //------------------------------------------------  直接的接口方法  -----------------------------------------------------
    // 分页获取接口数据：没有再全局文件中放公共方法，是因为实际上传参都是不一致的，还是分开好
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
            // 发布人ID
            create_id: that.thePersonalInfo.id,

            // 传参不全，当前只用到onload时候需要的字段
            page: that.theGetMomentsListPage,
            pagesize: that.theGetMomentsListPagesize,
            // 校园墙类型：话题、组队/搭子、分享/安利、二手闲置、兼职、表白、求助、其他，传空字符串为全部
            // schoolOneTitleIndex == 0 表示是综合，就是全部的意思，所以传空
            // type:(that.schoolOneTitleIndex == 0 ?'':that.titles[that.schoolOneTitleIndex]),
            type: "",

            // 搜索字段，默认是个空
            title: that.searchInputText,
            // // 当前选中的学校id
            school_id: that.$store.state.store_schoolNow.id,
            // // 行政区划编码，选定的最低一级区域的编码，空字符串是全部
            area_code: that.$store.state.store_addressNow.code,
            is_anonymous: 2,
          },
          success: (res) => {
            console.log("getMomentsList_res", res);
            let _that = that;
            // 如果是请求第一页，证明是首次请求，就重置一下
            if (_that.theGetMomentsListPage == 1) {
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
                _that.theGetMomentsListPage += 1;
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
                __that.school_datas = [];
                // 获取省市数据
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

<style>
.bg {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 110vw;
  background-image: linear-gradient(
    to bottom right,
    #ffffff,
    #ffffff,
    #f4fcf5,
    #f4fcf5
  );
  z-index: -1;
}
.margin-left-10 {
  margin-left: 20rpx;
}

.the-line-1 {
  display: flex;
  flex-direction: row;
  padding: 3.5vw;
  width: 93vw;
}

.the-line-1-left {
  border-radius: 100%;
  width: 20vw;
  height: 20vw;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  background-color: #fafefb;
}

.the-line-1-right {
}

.the-line-1-right-top {
  width: 73vw;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.the-line-1-right-top-left {
  margin-left: 15px;
}

.the-line-1-right-top-left-name {
  font-size: 20px;
  font-weight: bold;
}

.the-line-1-right-top-left-num {
  font-size: 12px;
  margin-top: 10px;
  color: #727272;
}

.share {
  width: 5.5vw;
  height: 5.5vw;
}

.the-line-1-right-bottom {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 15px;
  flex-wrap: nowrap;
  overflow: scroll;
}

.the-line-1-right-bottom-school {
  display: flex;
  align-items: center;
  background: rgba(237, 244, 238, 1);
  border-radius: 30rpx;
  padding: 9rpx 21rpx;
  justify-content: center;
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 22rpx;
  color: #666666;
  margin-top: 15px;
}

.the-line-1-right-bottom-school image {
  width: 30rpx;
  height: 30rpx;
  margin-right: 9rpx;
}

.the-line-1-right-bottom-school view {
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 22rpx;
  color: #666666;
}

.the-line-2 {
  padding: 0 3.5vw;
  font-size: 13px;
}
.gray {
  color: #bbbbbb;
}

.the-line-3 {
  padding: 0 3.5vw;
  font-size: 13px;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.the-line-3-nums {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.the-line-3-nums-regard_num {
  margin-right: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.the-line-3-nums text {
  font-size: 20px !important;
  font-weight: bold;
  margin-right: 5px;
}

.button {
  height: 35px;
  line-height: 35px;
  background: #ff812f;
  padding: 0 10px;
  border-radius: 100px;
  font-size: 13px;
  color: #ffffff;
}
.bg-gray {
  height: 35px;
  line-height: 35px;
  background: #bbbbbb;
  padding: 0 10px;
  border-radius: 100px;
  font-size: 13px;
  color: #ffffff;
}
.the-line-4 {
  display: flex;
  flex-direction: row;
  width: 93vw;
  border-bottom: #f3f3f3 1px solid;
  background-color: #ffffff;
  padding: 0 3.5vw;

  margin-top: 5.5vw;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: #e9f0ea 0 -5px 15px 0;
}

.the-line-4-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
}

.the-line-4-item-selected {
  color: #000000 !important;
}

.the-line-4-item-name {
  color: #bbbbbb;
  margin-top: 4.5vw;
}

.the-line-4-item-line {
  width: 50%;
  height: 3px;
  background-color: #f89f12;
  border-radius: 100px;
  margin-top: 3.5vw;
}
.the-line-5 {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
}
.posts-data {
  /* width: 93vw !important; */
}
.space-line-bottom {
  height: 100px;
}
</style>