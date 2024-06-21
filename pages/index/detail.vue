<template>
  <view class="content">
    <view v-if="!['兼职', '分享/安利', ''].includes(detailData.type)">
      <!-- 内容 -->
      <view class="posts-data">
        <post-type-zudui
          :showPhone="showPhone"
          :showMore="showMore"
          @toThumb="toThumb"
          @zuduiButtons="zuduiButtons"
          @topPerSonalhome="topPerSonalhome"
          @actionMore="actionMore"
          :isDetail="true"
          :postsDataOneIndex="1"
          :theData="detailData"
        ></post-type-zudui>
      </view>

      <!-- 评论区域 -->
      <view class="comment">
        <view class="comment-title">精彩评论</view>
        <view
          class="comment-one"
          :key="index"
          v-for="(item, index) in theComments"
        >
          <!-- 头像 -->
          <view
            @click="topPerSonalhome({ id: item.create_id, is_anonymous: 2 })"
            class="comment-one-avatar"
            :style="'background: url(' + item.avatar_url + ');'"
          ></view>
          <!-- 内容 -->
          <view class="comment-one-content">
            <view class="comment-one-content-line-1">
              <!-- 名字和时间 -->
              <view class="comment-one-content-line-1-left">
                <view class="left-name">{{ item.nick_name }}</view>
                <view v-if="theComments.length > 0" class="left-time">{{
                  showDateTime(item)
                }}</view>
                <!-- <view class="left-time">{{item.created_at != '刚刚'?$public.showDateTime(item.created_at):'刚刚'}}</view> -->
              </view>
              <!-- 点赞 -->
              <view
                @click="commentThumb(item, index)"
                class="comment-one-content-line-1-right"
              >
                <view
                  class="right-num"
                  :style="item.is_thumb == 2 ? '#000000' : 'color: #ff6155;'"
                  >{{ item.thumb_num }}</view
                >
                <uni-icons
                  type="hand-up"
                  :color="item.is_thumb == 2 ? '#000000' : '#ff6155'"
                  size="20"
                ></uni-icons>
              </view>
            </view>
            <!-- <text class="hf-btn">回复</text> -->
            <view class="comment-one-content-line-2">{{ item.msg }}</view>
          </view>
        </view>
      </view>
      <!-- 底部间隔 -->
      <view class="space-line-bottom">
        <uni-load-more :status="loading"></uni-load-more>
      </view>
    </view>
    <view class="jz-detail" v-else-if="detailData.type == '兼职'">
      <view class="jz-box">
        <view class="jz-top" :class="{ 'mt-box': detailData.wages == '面议' }">
          <view :style="{ width: detailData.wages == '面议' ? '80%' : '100%' }">
            <!-- 标题 -->
            <view class="type-line-1">
              <view
                class="type-line-1-title"
                :style="{ width: detailData.wages == '面议' ? '80%' : '70%' }"
                >{{ detailData.title }}</view
              >
              <view v-if="detailData.wages != '面议'" class="type-line-1-amount"
                >{{ detailData.wages
                }}<view class="type-line-2-settlement amount-text">{{
                  detailData.settlement
                }}</view></view
              >
            </view>
            <!-- 地址和结算方式 -->
            <view class="type-line-2">
              <view class="type-line-2-address">
                <u-icon
                  name="map-fill"
                  color="rgba(190,190,190,1)"
                  size="20"
                ></u-icon>
                <view class="type-line-2-address-name">{{
                  detailData.area_name
                }}</view>
              </view>
              <view
                v-if="detailData.wages != '面议'"
                class="type-line-2-settlement"
                >{{ detailData.settlement }}</view
              >
            </view>
          </view>
          <view class="my-text" v-if="detailData.wages == '面议'">{{
            detailData.wages
          }}</view>
        </view>
      </view>
      <view class="jz-content">
        <view class="jz-content-title"> 职位描述 </view>
        <view class="jz-content-desc">
          <view>工作内容：</view>
          <view>{{ detailData.content }}</view>
        </view>
      </view>
      <view class="jz-address">
        <view class="jz-address-label"> 工作地址 </view>
        <view class="jz-address-text">{{ detailData.city }}</view>
      </view>
    </view>
    <view class="al-detail" v-else-if="detailData.type == '分享/安利'">
      <u-swiper
        radius="0"
        bgColor="#FFFFFF"
        @click="previewImage"
        height="750rpx"
        :list="srcList"
        @change="(e) => (currentNum = e.current)"
        :autoplay="false"
        indicatorStyle="right: 0px"
      >
        <u-swiper-item
          slot="item"
          v-for="(item, index) in srcList"
          :key="index"
        >
          <u-image
            :src="item"
            width="100%"
            height="750rpx"
            mode="aspectFill"
          ></u-image>
        </u-swiper-item>
        <view slot="indicator" class="indicator-num">
          <text class="indicator-num__text"
            ><text style="font-size: 28rpx">{{ currentNum + 1 }}</text
            ><text style="font-size: 18rpx">/{{ srcList.length }}</text></text
          >
        </view>
      </u-swiper>
      <view class="al-regard flex-align">
        <view class="al-regard-left flex-align">
          <view
            @click="
              topPerSonalhome({ id: detailData.create_id, is_anonymous: 2 })
            "
            class="comment-one-avatar avatar-img"
            :style="'background: url(' + detailData.avatar_url + ');'"
          ></view>
          <view class="al-regard-info">
            <view class="name-text">{{ detailData.nick_name }}</view>
            <view class="time-text">{{ getTime(detailData.released_at) }}</view>
          </view>
        </view>
        <view
          v-if="isMe()"
          class="regard-btn"
          :style="{
            background: detailData.is_regard == 1 ? '#bbbbbb' : '#ff812f',
          }"
          @click="toFollow()"
        >
          {{ detailData.is_regard == 1 ? "取消关注" : "关注" }}
        </view>
      </view>
      <view class="al-content">
        <view class="al-content-title">{{ detailData.title }}</view>
        <view class="al-content-text">{{ detailData.content }}</view>
        <view
          v-if="detailData.task_id"
          class="al-product flex-align"
          @click="toProduct()"
        >
          <view class="icon-box">
            <u-icon
              name="shopping-cart-fill"
              color="#FFFFFF"
              size="20"
            ></u-icon>
          </view>
          <view class="al-product-title flex-align"
            ><text>购物</text> <view class="shu"></view>
            <view class="title-text">{{ detailData.task_title }}</view></view
          >
        </view>
      </view>
    </view>
    <!-- 评论输入框 -->
    <view
      v-if="
        !['兼职', '分享/安利', ''].includes(detailData.type) &&
        detailData.is_on == 1
      "
      class="comment-input"
      :style="'bottom:' + 0 + 'px;'"
    >
      <view class="btn-box">
        <uni-easyinput
          :trim="true"
          cursorSpacing="50"
          v-model="theInputComment"
          confirmType="send"
          placeholder="想要说点什么..."
        />
        <view @click="toComment" class="comment-button">发送</view>
      </view>
    </view>
    <view v-else-if="detailData.type == '兼职' && detailData.is_on == 1">
      <view class="safe-bottom"></view>
      <view class="fix-bottom-box">
        <view class="fix-bottom" v-if="detailData.type == '兼职'">
          <view
            class="pay-btn"
            @click="
              topPerSonalhome({ id: detailData.create_id, is_anonymous: 2 })
            "
            >立即联系</view
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { addressList } from "../../page_product/components/piaoyi-cityPicker/cityData";
export default {
  data() {
    return {
      currentNum: 0,
      srcList: [],
      inviteId: "",
      addressArr: [],
      showMore: true,
      showPhone: true,
      id: "",
      // 底部显示加载中的动画效果  more表示加载前，loading表示加载中，no-more表示没有更多数据
      isLoading: "loading",

      // 由于接口分也逻辑，如果拿完的是最后一页，下一页是会报错的，所以需要知道当前是否是最后一页，否则不允许调用接口的
      totalCount: 11, // 初始值必须大于theGetCommentListPagesize

      theGetCommentListPage: 1,
      theGetCommentListPagesize: 10,

      // 详情页数据
      detailData: { type: "" },

      // 要发布的评论
      theInputComment: "",
      // 评论
      theComments: [],
    };
  },
  onLoad(option) {
    // 调用详情接口
    if (option.id) {
      this.id = option.id;
      this.getDetail();
    }
    if (option.noPhone) {
      this.showPhone = false;
    }
    if (option.noMore) {
      this.showMore = false;
    }
    uni.$on("changeRegard", (data) => {
      if (this.detailData.type == "分享/安利") {
        this.$set(this.detailData, "is_regard", data);
      }
    });
  },
  // 监听下拉动作
  onPullDownRefresh() {
    let that = this;
    if (!["兼职", "分享/安利"].includes(that.detailData.type)) {
      // 重置获取的页码
      that.theGetCommentListPage = 1;

      // 重置评论数组
      that.theComments = [];

      // 重置输入框内容
      that.theInputComment = "";

      // 重置总条数
      that.totalCount = 11;

      // 异步转同步调用
      (async function () {
        // 获取评论列表（第一页的）

        await that.getCommentList();

        // 等待接口返回后，取消下拉刷新动画
        uni.stopPullDownRefresh();
      })();
    } else {
      uni.stopPullDownRefresh();
    }
  },
  // 页面触底的监听事件，配合pages.json中的"onReachBottomDistance": 0，0的位置写距离底部的距离
  onReachBottom() {
    if (!["兼职", "分享/安利"].includes(this.detailData.type)) {
      // 触底后动画效果开启
      this.isLoading = "loading";

      // 调用接口
      this.getCommentList();
    }
  },
  //分享按钮
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
    // 是否是本人
    isMe() {
      return this.detailData.create_id != this.$store.state.theLogonUser.id;
    },
    toProduct() {
      if (this.detailData.task_is_on == 1) {
        uni.navigateTo({
          url:
            "/page_product/pages/product/detail?id=" + this.detailData.task_id,
        });
      } else {
        uni.showToast({
          title: "关联商品已下线",
          duration: 2500,
          icon: "none",
        });
      }
    },
    getTime: function (theTime) {
      if (theTime) {
        // 转化时间戳的方法
        // 发帖时间的时间戳
        let timestamp_at = new Date(theTime).getTime();
        // 当前时间的时间戳
        let timestamp_now = new Date().getTime();

        // 相差的时间，转化为了分钟
        let difference = (timestamp_now - timestamp_at) / 1000 / 60;
        if (difference < 5) {
          // 小于1个小时，就显示时间
          // console.log(difference+'分钟前');
          return "刚刚";
        } else if (difference >= 5 && difference < 60) {
          return Math.floor(difference) + "分钟前";
        } else {
          let theYear = theTime.substring(0, 4);
          let theMonth = theTime.substring(5, 7);
          let theDay = theTime.substring(8, 10);

          let now = new Date();
          let nowYear = now.getFullYear() + "";
          let nowMonth =
            now.getMonth() + 1 < 10
              ? "0" + (now.getMonth() + 1)
              : now.getMonth() + 1 + "";
          let nowDay =
            now.getDate() < 10 ? "0" + now.getDate() : now.getDate() + "";
          // 同一天的话
          if (theYear == nowYear && theMonth == nowMonth && theDay == nowDay) {
            return "今天" + " " + theTime.substring(11, 19);
          } else {
            return theTime;
          }
        }
      }
    },
    getAddText(code) {
      let text = "";
      this.addressArr.forEach((el) => {
        el.children.forEach((item) => {
          if (item.value == code) {
            text = el.label + item.label;
          }
        });
      });
      return text;
    },
    getArea() {
      this.addressArr = [];
      addressList.forEach((el) => {
        this.addressArr.push({
          value: el.code,
          label: el.name,
          children: el.children.map((item) => {
            return {
              value: item.code + "00",
              label: item.name,
            };
          }),
        });
      });
      this.detailData.city = this.getAddText(this.detailData.area_code);
    },
    getDetail() {
      this.API.home
        .getMomentInfo({
          moments_id: this.id,
        })
        .then((res) => {
          this.detailData = res.data;
          if (!["兼职", "分享/安利"].includes(this.detailData.type)) {
            this.getCommentList();
          } else if (["兼职"].includes(this.detailData.type)) {
            this.getArea();
          }
          if (
            ["兼职", "分享/安利", "组队/搭子"].includes(this.detailData.type)
          ) {
            uni.setNavigationBarTitle({
              title:
                this.detailData.type == "分享/安利"
                  ? "安利详情"
                  : this.detailData.type == "兼职"
                  ? "兼职详情"
                  : "组队详情",
            });
            if (["分享/安利"].includes(this.detailData.type)) {
              this.srcList = this.detailData.url
                ? this.detailData.url.split(",")
                : [];
            }
          }
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.getDetail();
          }
        });
    },
    //---------------------------------------------------------------界面处理方法---------------------------------------------------------------
    //---------------------------------------------------------------界面处理方法---------------------------------------------------------------
    //---------------------------------------------------------------界面处理方法---------------------------------------------------------------
    showDateTime: function (item) {
      return item.created_at != "刚刚"
        ? this.$public.showDateTime(item.created_at)
        : "刚刚";
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
        // 表示点赞操作成功了
        if (temp_is_thumb == 2) {
          // 原来的如果是2（未点赞状态，那么操作成功后这里应该改成1）
          // 使用$set响应的改变对象数据，第一个参数是对象本身，第二个参数是属性（记得加引号），第三个是改变后的值
          this.$set(
            this.detailData,
            "thumb_num",
            this.detailData.thumb_num + 1
          );
          this.$set(this.detailData, "is_thumb", 1);
          uni.showToast({
            title: "点赞成功",
            duration: 1000,
            icon: "none",
          });
        } else {
          // 反之
          this.$set(
            this.detailData,
            "thumb_num",
            this.detailData.thumb_num - 1
          );
          this.$set(this.detailData, "is_thumb", 2);
          uni.showToast({
            title: "已取消点赞",
            duration: 1000,
            icon: "none",
          });
        }
      }
    },
    //打开三个点的操作
    actionMore: function (option) {
      console.log(option);
      let that = this;
      let temp_is_collection = option.is_collection;
      let itemList = [
        option.is_collection == 2 ? "收藏" : "取消收藏",
        option.is_regard == 1 ? "取消关注" : "关注TA",
      ];
      if (
        this.$store.state.theLogonUser.id == option.create_id ||
        !this.showPhone
      ) {
        itemList.splice(1, 1);
      }
      uni.showActionSheet({
        itemList,
        itemColor: "#333333",
        success: function (res) {
          if (["收藏", "取消收藏"].includes(itemList[res.tapIndex])) {
            let _that = that;
            (async function () {
              await _that.$store.dispatch("toCollection", {
                id: option.id,
              });

              if (_that.$store.state.is_collection_true == true) {
                // 表示调用接口成功
                if (temp_is_collection == 2) {
                  // 使用$set响应的改变对象数据，第一个参数是对象本身，第二个参数是属性（记得加引号），第三个是改变后的值
                  _that.$set(_that.detailData, "is_collection", 1);
                  uni.showToast({
                    title: "收藏成功",
                    duration: 1000,
                    icon: "none",
                  });
                } else {
                  _that.$set(_that.detailData, "is_collection", 2);
                  uni.showToast({
                    title: "已取消收藏",
                    duration: 1000,
                    icon: "none",
                  });
                }
              }
            })();
          } else if (["取消关注", "关注TA"].includes(itemList[res.tapIndex])) {
            this.followHandle(option);
          }
        },
        fail: function (res) {
          // console.log(res.errMsg);
        },
      });
    },
    toFollow() {
      this.followHandle({
        create_id: this.detailData.create_id,
        is_regard: this.detailData.is_regard,
      });
    },
    // 关注
    followHandle(option) {
      this.API.order
        .regard({
          to_user_id: option.create_id,
        })
        .then((res) => {
          console.log(res.data);
          this.$set(
            this.detailData,
            "is_regard",
            option.is_regard == 1 ? 2 : 1
          );
          uni.showToast({
            title: option.is_regard == 1 ? "已取消关注" : "关注成功",
            duration: 1000,
            icon: "none",
          });
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.followHandle(option);
          }
        });
    },
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
          // 表示接口调用成功了
          if (temp_is_entry == 2) {
            // 使用$set响应的改变对象数据，第一个参数是对象本身，第二个参数是属性（记得加引号），第三个是改变后的值
            this.$set(
              this.detailData,
              "entry_num",
              this.detailData.entry_num + 1
            );
            this.$set(this.detailData, "is_entry", 1);
            // 添加本人到组队成员（主要是为了显示头像）
            this.detailData.members.push({
              id: this.$store.state.theLogonUser.id,
              nick_name: this.$store.state.theLogonUser.nick_name,
              avatar_url: this.$store.state.theLogonUser.avatar_url,
            });
            uni.showToast({
              title: "加入成功",
              duration: 1000,
              icon: "none",
            });
          } else {
            this.$set(
              this.detailData,
              "entry_num",
              this.detailData.entry_num - 1
            );
            this.$set(this.detailData, "is_entry", 2);
            // 去掉组队成员中的头像
            for (let i = 0; i < this.detailData.members.length; i++) {
              // 通过id找到要去掉的成员（本人）的索引位置
              if (
                this.$store.state.theLogonUser.id ==
                this.detailData.members[i].id
              ) {
                this.detailData.members.splice(i, 1);
              }
            }
            uni.showToast({
              title: "已退出组队",
              duration: 1000,
              icon: "none",
            });
          }
        }
      } else {
        this.inviteId = option;
      }
    },
    //---------------------------------------------------------------服务端接口---------------------------------------------------------------
    //---------------------------------------------------------------服务端接口---------------------------------------------------------------
    //---------------------------------------------------------------服务端接口---------------------------------------------------------------
    // 分页获取评论接口
    getCommentList: function () {
      let _this = this;
      return new Promise(function (resolve, reject) {
        let that = _this;
        that.isLoading = "loading"; // 加载中
        // 判断是否是最后一页了
        if (that.theComments.length < that.totalCount) {
          uni.request({
            url: that.$store.state.theUrl + "/wechat/moments/getCommentList",
            method: "POST",
            header: {
              token: that.$store.state.theToken,
            },
            data: {
              page: that.theGetCommentListPage,
              pagesize: that.theGetCommentListPagesize,
              moments_id: that.detailData.id,
            },
            success: (res) => {
              // console.log('getCommentList', res);
              let _that = that;
              // 如果是请求第一页，证明是首次请求，就重置一下
              if (_that.theGetCommentListPage == 1) {
                _that.theComments = [];

                _that.totalCount = res.data.count;
              }

              if (res.data.code == 0) {
                for (let i = 0; i < res.data.data.length; i++) {
                  _that.theComments.push(res.data.data[i]);
                }

                _that.theGetCommentListPage += 1;
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

                  __that.getCommentList();
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
              console.log(333);
              uni.showToast({
                title: "网络失败，请重试！多次无效后，反馈官方客服哦！",
                duration: 2500,
                icon: "none",
              });
            },
          });
        }
      });
    },
    // 发布评论接口
    toComment: function () {
      let _this = this;
      return new Promise(function (resolve, reject) {
        let that = _this;
        if (![1, 2].includes(that.$store.state.theLogonUser.level)) {
          // uni.showToast({
          //   title: "请前往注册认证",
          //   duration: 2500,
          //   icon: "none",
          // });
          uni.navigateTo({
            url:
              "/page_product/pages/info/register?level=" +
              that.$store.state.theLogonUser.level,
          });
          return;
        }
        // 判断如果是空字符串，证明是首次加载进来，不应该调用接口
        if (that.theInputComment != "") {
          uni.request({
            url: that.$store.state.theUrl + "/wechat/moments/comment",
            method: "POST",
            header: {
              token: that.$store.state.theToken,
            },
            data: {
              msg: that.theInputComment,
              moments_id: that.detailData.id,
            },
            success: (res) => {
              // console.log('toComment', res);
              let _that = that;

              if (res.data.code == 0) {
                _that.theComments.unshift({
                  id: 0,
                  moments_id: _that.detailData.id,
                  msg: _that.theInputComment,
                  create_id: _that.$store.state.theLogonUser.id,
                  created_at: "刚刚",
                  thumb_num: 0,
                  is_thumb: 2, // 本人是否点赞过 1是2否
                  nick_name: _that.$store.state.theLogonUser.nick_name,
                  avatar_url: _that.$store.state.theLogonUser.avatar_url,
                });
                // 重置
                _that.theInputComment = "";

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

                  // 获取省市数据
                  __that.toComment();
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
        } else {
          uni.showToast({
            title: "评论内容不能为空哦~",
            duration: 2500,
            icon: "none",
          });
        }
      });
    },
    // 评论点赞取消
    commentThumb: function (item, index) {
      let that = this;
      let tempItem = item;
      uni.request({
        url: that.$store.state.theUrl + "/wechat/moments/commentThumb",
        method: "POST",
        header: {
          token: that.$store.state.theToken,
        },
        data: {
          comment_id: item.id,
        },
        success: (res) => {
          // console.log('commentThumb', res);
          let _that = that;

          if (res.data.code == 0) {
            if (tempItem.is_thumb == 2) {
              _that.theComments[index].is_thumb = 1;
              _that.theComments[index].thumb_num += 1;
            } else {
              _that.theComments[index].is_thumb = 2;
              _that.theComments[index].thumb_num -= 1;
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

              // 获取省市数据
              __that.commentThumb();
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
    },
  },
};
</script>

<style lang="scss" >
::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.content {
  display: flex;
  flex-direction: column;
  overflow: scroll;
  background-color: #ffffff;
}

.posts-data {
  width: 100vw;
}

.space-line {
  width: 100vw;
  height: 10px;
  background-color: #fafafa;
}

.comment {
  padding: 30rpx;
  background-color: #ffffff;
}

.comment-title {
  font-family: PingFang SC;
  font-weight: 600;
  font-size: 30rpx;
  color: #111111;
  margin-bottom: 40rpx;
}

.comment-one {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 50rpx;
}
.comment-one:last-child {
  margin-bottom: 0;
}

.comment-one-avatar {
  /* border: #111111 1px solid; */
  border-radius: 100%;
  width: 70rpx;
  height: 70rpx;
  padding: 0 !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
}

.comment-one-content {
  width: calc(100% - 90rpx);
  margin-left: 20rpx;
}

.comment-one-content-line-1 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.comment-one-content-line-1-left {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.left-name {
  font-family: PingFang SC;
  font-weight: 600;
  font-size: 28rpx;
  color: #000000;
}

.left-time {
  margin-left: 28rpx;
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 22rpx;
  color: #666666;
}

.comment-one-content-line-1-right {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.right-num {
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 20rpx;
  color: #333333;
  margin-right: 9rpx;
}

.comment-one-content-line-2 {
  font-family: PingFang SC;
  font-weight: 300;
  font-size: 24rpx;
  color: #111111;
  margin-top: 10rpx;
}

.space-line-bottom {
  height: 100px;
}

.comment-input {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 999;
  padding: 20rpx 30rpx 40rpx;
  background-color: #ffffff;
  box-sizing: border-box;
  .btn-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    /deep/ .uni-easyinput {
      .is-input-border {
        border: 2rpx solid #dcdfe6;
      }
      .uni-easyinput__content-input {
        height: 66rpx;
      }
    }
  }
}

.comment-button {
  width: 127rpx;
  height: 70rpx;
  line-height: 70rpx;
  background-color: #ff812f;
  color: #ffffff;
  border-radius: 200rpx;
  text-align: center;
  margin-left: 23rpx;
}
.hf-btn {
  color: #f89f12;
  margin-left: 40rpx;
  vertical-align: middle;
}
.jz-detail {
  padding: 27rpx 30rpx 126rpx;
  .jz-box {
    width: 100%;
    .jz-more {
      display: flex;
      justify-content: flex-end;
    }
    .jz-top {
      width: 100%;
    }
    .jz-company {
      margin-top: 40rpx;
      border-top: 1rpx solid #eeeeee;
      padding-top: 20rpx;
      display: flex;
      justify-content: flex-end;
      .phone-btn {
        width: 146rpx;
        height: 45rpx;
        line-height: 45rpx;
        text-align: center;
        background: #ff5809;
        border-radius: 60rpx;
        font-family: PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #ffffff;
      }
    }
    .type-line-1 {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    .type-line-1-title {
      font-family: PingFang SC;
      font-weight: 600;
      font-size: 44rpx;
      color: #333333;
      box-sizing: border-box;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .type-line-1-amount {
      font-family: DIN Alternate;
      font-weight: bold;
      font-size: 40rpx;
      color: #ff812f;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .amount-text {
      height: 0rpx;
      visibility: hidden;
    }
    .type-line-2 {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: 28rpx;
    }
    .type-line-2-address {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-family: PingFang SC;
      font-weight: 400;
      font-size: 22rpx;
      color: #666666;
    }
    .type-line-2-address-name {
      margin-left: 18rpx;
      font-family: PingFang SC;
      font-weight: 400;
      font-size: 22rpx;
      color: #666666;
    }
    .type-line-2-settlement {
      font-family: PingFang SC;
      font-weight: 400;
      font-size: 22rpx;
      color: #666666;
    }
  }
  .jz-content {
    margin-top: 41rpx;
    border-bottom: 1rpx solid #eeeeee;
    border-top: 1rpx solid #eeeeee;
    padding: 38rpx 0;
    .jz-content-title {
      font-family: PingFang SC;
      font-weight: 600;
      font-size: 32rpx;
      color: #333333;
    }
    .jz-content-desc {
      background: #f9f6f5;
      border-radius: 22rpx;
      padding: 33rpx 47rpx;
      margin-top: 34rpx;
      font-family: PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #333333;
      line-height: 38rpx;
    }
  }
  .jz-address {
    padding: 38rpx 0;
    .jz-address-label {
      font-family: PingFang SC;
      font-weight: 600;
      font-size: 32rpx;
      color: #333333;
    }
    .jz-address-text {
      margin-top: 40rpx;
      font-family: PingFang SC;
      font-weight: 500;
      font-size: 24rpx;
      color: #333333;
    }
  }
  .mt-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .my-text {
      font-family: PingFang SC;
      font-weight: 600;
      font-size: 33rpx;
      color: #ff812f;
    }
  }
}
.al-detail {
  .al-regard {
    border-bottom: 10rpx solid #f7f7f7;
    padding: 30rpx;
    justify-content: space-between;
    .al-regard-left {
      .avatar-img {
        width: 80rpx;
        height: 80rpx;
      }
      .al-regard-info {
        height: 80rpx;
        margin-left: 14rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .name-text {
          font-family: PingFang SC;
          font-weight: bold;
          font-size: 26rpx;
          color: #333333;
        }
        .time-text {
          font-family: PingFang SC;
          font-weight: 400;
          font-size: 22rpx;
          color: #666666;
        }
      }
    }
    .regard-btn {
      padding: 15rpx 30rpx;
      font-family: PingFang SC;
      font-weight: 400;
      font-size: 26rpx;
      color: #ffffff;
      text-align: center;
      border-radius: 100rpx;
    }
  }
  .al-content {
    padding: 40rpx 30rpx;
    .al-content-title {
      font-family: PingFang SC;
      font-weight: bold;
      font-size: 28rpx;
      color: #393a3e;
      margin-bottom: 20rpx;
    }
    .al-content-text {
      font-family: PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #393a3e;
      line-height: 50rpx;
    }
  }
  .al-product {
    margin-top: 20rpx;
    font-family: PingFang SC;
    font-weight: bold;
    font-size: 26rpx;
    color: #393a3e;
    padding: 30rpx;
    background: #f7f7f7;
    border-radius: 10rpx;
    display: flex;
    align-items: center;
    .icon-box {
      width: 40rpx;
      height: 40rpx;
      background: #ff812f;
      border-radius: 10rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .al-product-title {
      box-sizing: border-box;
      width: calc(100% - 54rpx);
      margin-left: 14rpx;
      font-family: PingFang SC;
      font-weight: bold;
      font-size: 26rpx;
      color: #393a3e;
      & > text {
        word-break: keep-all;
      }
      .shu {
        width: 1rpx;
        height: 22rpx;
        margin: 0 14rpx;
        background: #777777;
      }
      .title-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
/deep/ .u-swiper__indicator {
  bottom: 54rpx !important;
  .indicator-num {
    width: 90rpx;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 20rpx 0rpx 0rpx 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
  }
}
.safe-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
.fix-bottom-box {
  z-index: 10;
  background: #ffffff;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 20rpx 30rpx;
  box-sizing: border-box;
  .fix-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: env(safe-area-inset-bottom);
  }
  .pay-btn {
    width: 100%;
    height: 76rpx;
    background: linear-gradient(-55deg, #ff9b5a, #ff812f);
    border-radius: 38rpx;
    font-family: PingFang SC;
    font-weight: 400;
    font-size: 26rpx;
    color: #ffffff;
    line-height: 76rpx;
    text-align: center;
  }
}
.flex-align {
  display: flex;
  align-items: center;
}
</style>