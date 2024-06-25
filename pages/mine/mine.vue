<template>
  <view class="content">
    <!-- 我的二维码 -->
    <!-- 添加话题的弹窗 -->
    <uni-popup ref="erweima_popup" type="center">
      <view class="erweima_popup-box">
        <view class="back" @click="closePopup_erweima">
          <uni-icons type="closeempty" size="25" color="#727272"></uni-icons>
        </view>
        <image
          :show-menu-by-longpress="true"
          class="popup-erweima"
          :src="erweima_img"
          mode="widthFix"
        ></image>
        <view class="popup-erweima-title">· 我的邀请码 ·</view>
        <view class="popup-erweima-content">世界越来越小，你我越来越近。</view>
      </view>
    </uni-popup>

    <view class="bg"></view>
    <!-- 第一行：头像、昵称等 -->
    <view
      class="the-line-1"
      :style="'margin-top:' + (statusBarHeight + navBarHeight) + 'px;'"
    >
      <!-- 头像 -->
      <!-- <view class="the-line-1-left" :style="'background: url('+theLogonUser.avatar_url+');'"></view> -->
      <view
        @click="toPersonal(theLogonUser.level)"
        class="the-line-1-left"
        :style="'background: url(' + theLogonUser.avatar_url + ');'"
      ></view>
      <!-- 昵称等 -->
      <view class="the-line-1-right">
        <!-- 昵称，二维码 -->
        <view class="the-line-1-right-top">
          <!-- 昵称 账号 -->
          <!-- <view class="the-line-1-right-top-left"> -->
          <view @click="toPersonal(theLogonUser.level)">
            <view class="the-line-1-right-top-left-name">{{
              theLogonUser.nick_name
            }}</view>
            <view class="the-line-1-right-top-left-num">
              绑定手机号：{{
                theLogonUser.phone != "" && theLogonUser.phone != null
                  ? theLogonUser.phone.substring(0, 3) +
                    "****" +
                    theLogonUser.phone.substring(7, 11)
                  : "还没绑哦"
              }}
            </view>
          </view>
          <!-- 二维码 -->
          <image
            @click="openPopup_erweima"
            class="erweima"
            src="/static/5_erweima.png"
            mode="widthFix"
          >
          </image>
        </view>
        <!-- 学校 专业 -->
        <view class="the-line-1-right-bottom">
          <view
            v-if="theLogonUser.level != 0"
            class="the-line-1-right-bottom-school"
          >
            <image src="/static/1_school_icon@3x.png"></image>
            <view>{{ theLogonUser.school_name }}</view>
          </view>

          <view
            v-if="theLogonUser.level != 0 && theLogonUser.specialty"
            class="the-line-1-right-bottom-school margin-left-10"
          >
            <view>{{ theLogonUser.specialty }}</view>
          </view>
          <view
            @click="toRegister(theLogonUser.level)"
            v-if="theLogonUser.level == 0"
            class="the-line-1-right-bottom-school"
          >
            <view>未注册/认证，点击前往</view>
          </view>
        </view>
      </view>
    </view>
    <!-- 第二行：关注、粉丝、欧元、积分等数据 -->
    <view class="the-line-2">
      <view
        @click="toMoudle(index)"
        class="the-line-2-item"
        v-for="(item, index) in line_2_items"
      >
        <view class="the-line-2-item-num">{{ item.num }}</view>
        <view class="the-line-2-item-name">{{ item.name }}</view>
      </view>
    </view>
    <!-- 第三行：订单管理、发布管理等 -->
    <view class="the-line-3">
      <view class="the-line-3-top">
        <view
          @click="toMinePush(index)"
          v-if="item.enable"
          class="the-line-3-top-item"
          v-for="(item, index) in line_3_items"
        >
          <image :src="item.src" mode="widthFix"></image>
          <view>{{ item.name }}</view>
        </view>
      </view>
      <image
        class="the-line-3-bottom"
        src="https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/v2/20240511/admin/0ea97dedc8c1adfd15d2f17197fdd882.png"
        mode="widthFix"
      ></image>
    </view>
    <!-- 第四行：列表按钮 -->
    <view class="the-line-4">
      <view
        @click="line_4_itemsSelected(index, '状态切换')"
        class="the-line-4-item"
        v-for="(item, index) in line_4_items"
      >
        <view
          :class="{
            'the-line-4-item-name': true,
            'the-line-4-item-selected': index == line_4_items_index,
          }"
          >{{ item }}
        </view>
        <view
          v-if="index == line_4_items_index"
          class="the-line-4-item-line"
        ></view>
      </view>
    </view>
    <!-- 第五行：列表内容 -->
    <view v-if="line_4_items_index == 0" class="list-container">
      <view
        @click="goDetail(item)"
        class="list-item"
        v-for="(item, index) in school_datas"
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
    <view class="the-line-5" v-else>
      <view
        class="posts-data"
        :key="index"
        v-for="(item, index) in school_datas"
      >
        <post-type-zudui
          @topPerSonalhome="topPerSonalhome"
          @toDetail="toDetail"
          :showMore="false"
          :postsDataOneIndex="-1"
          @zuduiButtons="zuduiButtons"
          :isPersonalHome="true"
          :theData="item"
        ></post-type-zudui>
      </view>
    </view>
    <!-- 底部垫层 -->
    <view class="space-line-bottom">
      <uni-load-more :status="isMore"></uni-load-more>
    </view>
    <view class="safe-bottom"></view>
    <tab-Bar ref="theMessage" current="4"></tab-Bar>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 顶部状态栏和导航栏高度
      statusBarHeight: 0,
      navBarHeight: 0,

      // 我的二维码
      erweima_img: "",

      // 登录信息
      theLogonUser: {
        avatar_url: "",
      },

      // 由于接口分也逻辑，如果拿完的是最后一页，下一页是会报错的，所以需要知道当前是否是最后一页，否则不允许调用接口的
      totalCount: 11, // 初始值必须大于theGetCommentListPagesize

      // 关注、粉丝等
      line_2_items: [
        {
          num: 0,
          name: "关注",
        },
        {
          num: 0,
          name: "粉丝",
        },
        {
          num: 0,
          name: "鸥元",
        },
        {
          num: 0,
          name: "积分",
        },
        {
          num: 0,
          name: "赞过",
        },
      ],
      // 功能板块
      line_3_items: [
        {
          src: "/static/5_line_3_1@3x.png",
          name: "订单管理",
          enable: true,
        },
        {
          src: "/static/5_line_3_2@3x.png",
          name: "发布管理",
          enable: true,
        },
        {
          src: "/static/5_line_3_3@3x.png",
          name: "工作室",
          enable: true,
        },
        {
          src: "/static/5_line_3_4@3x.png",
          name: "更多功能",
          enable: true,
        },
      ],
      //
      line_4_items: ["收藏", "组队", "点赞"],
      line_4_items_index: 0,

      // 用于分页加载传参
      // 当前获取的校园墙页码，每次需要+1
      theGetMomentsListPage: 1,
      theGetMomentsListPagesize: 4,

      //
      school_datas: [],
      inviteId: {},
    };
  },
  onLoad() {
    // 获取状态和导航栏高度
    let barObj = this.$public.getTopIconDistance();
    this.statusBarHeight = barObj.statusBarHeight;
    this.navBarHeight = barObj.navBarHeight;
  },
  onShow() {
    // 获取登录人信息
    this.theLogonUser = this.$store.state.theLogonUser;
    console.log("this.theLogonUser", this.theLogonUser);
    let that = this;
    (async function () {
      // 接口：获取当前几个统计数据（关注、粉丝、积分等）
      await that.getMyStatisticsNum();
      that.theGetMomentsListPage = 1;
      that.school_datas = [];
      that.totalCount = 10;
      that.line_4_itemsSelected(that.line_4_items_index, "其他");
    })();

    // 记录当前的previousPage，用于二次点击发布回到原来页面
    this.$store.commit("changePreviousPage", {
      previousPage: 4,
      isPage_2: false,
    });

    // console.log('this.theLogonUser.level', this.theLogonUser.level);
  },
  // 监听下拉动作
  onPullDownRefresh() {
    let that = this;

    // 异步转同步调用
    (async function () {
      // 接口：获取当前几个统计数据（关注、粉丝、积分等）
      await that.getMyStatisticsNum();

      that.line_4_itemsSelected(0, "状态切换");
      // 等待接口返回后，取消下拉刷新动画
      uni.stopPullDownRefresh();
    })();
  },
  // 页面触底的监听事件，配合pages.json中的"onReachBottomDistance": 0，0的位置写距离底部的距离
  onReachBottom() {
    // 调用接口 line_4_items_index=0 为第一个的列表  1表示第二列的列表
    this.line_4_itemsSelected(this.line_4_items_index, "其他");
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
                this.school_datas.splice(i, 1);
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
    // 跳转详情
    goDetail(item) {
      uni.navigateTo({
        url: "/page_product/pages/product/detail?id=" + item.id,
      });
    },
    toMoudle(index) {
      if (index == 1) {
        uni.navigateTo({
          url: "/page_product/pages/fans/index",
        });
      }
    },
    // 消息动画
    animtionAction: function () {
      let that = this;
      let animtionActionInter = setInterval(function () {
        that.$refs.theMessage.animtionAction();
      }, 1000);
      that.$store.commit("changeRedTip", {
        isRedTip: true,
      });

      setTimeout(function () {
        clearInterval(animtionActionInter);
      }, 5000);
    },

    // 获取收藏商品列表
    getschool_datas(type = "") {
      this.isLoading = "loading"; // 加载中
      let param = {
        page: this.theGetMomentsListPage,
        pagesize: this.theGetMomentsListPagesize,
        is_collection: 1,
      };
      this.API.home
        .getTaskList(param)
        .then((res) => {
          console.log(res);
          // 如果是请求第一页，证明是首次请求，就重置一下
          if (this.theGetMomentsListPage == 1) {
            this.school_datas = [];
          }
          this.totalCount = res.count;
          if (res.data.length != 0) {
            for (let i = 0; i < res.data.length; i++) {
              this.school_datas.push({
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
          if (type) {
            this.toScroll(type);
          }
          console.log(this.school_datas);
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.getschool_datas(type);
          }
        });
    },
    toScroll(type) {
      console.log(type);
      if (type == "状态切换") {
        setTimeout(() => {
          uni.pageScrollTo({
            selector: ".content",
            scrollTop: 200,
          });
        }, 100);
      }
    },

    // 收藏和点赞的切换按钮
    line_4_itemsSelected: async function (index, type) {
      if (type == "状态切换" && this.line_4_items_index == index) {
        return false;
      }
      if (type == "状态切换") {
        // 只有在点击切换栏的时候，才重置
        this.theGetMomentsListPage = 1;
        this.school_datas = [];
        this.totalCount = 10;
      }
      this.line_4_items_index = index;

      if (index == 0) {
        if (this.school_datas.length < this.totalCount) {
          this.getschool_datas(type);
        }
      } else {
        let param = {
          // 传参不全，当前只用到onload时候需要的字段
          page: this.theGetMomentsListPage,
          pagesize: this.theGetMomentsListPagesize,
          type: "",
        };
        if (index == 1) {
          param.is_entry = 1;
        } else {
          param.is_thumb = 1;
        }
        // 接口，默认请求 我加入的组队
        await this.getMomentsList(param);
        this.toScroll(type);
      }
    },
    // 打开我的二维码
    openPopup_erweima: async function () {
      await this.getShareQrCode();
      this.$refs.erweima_popup.open();
    },
    // 关闭
    closePopup_erweima: function () {
      this.$refs.erweima_popup.close();
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
    // 跳转个人主页
    toPersonal: function (level) {
      if (level != 0) {
        uni.navigateTo({
          url: "/page_product/pages/info/personal?level=" + level,
        });
      } else {
        // 否则就让他先去注册
        let that = this;
        uni.showModal({
          title: "温馨提示：",
          content: "需要认证用户才能修改个人信息哦，点击“去认证”继续吧~",
          confirmText: "去认证",
          confirmColor: "#f89f12",
          showCancel: true,
          success: function (res) {
            if (res.confirm) {
              that.toRegister(0);
            } else if (res.cancel) {
            }
          },
        });
      }
    },
    // 跳转注册界面
    toRegister: function (level) {
      uni.navigateTo({
        url: "/page_product/pages/info/register?level=" + level,
      });
    },
    // 跳转发布管理页面
    toMinePush: function (index) {
      if (index == 1) {
        uni.navigateTo({
          url: "/pages/mine/mine_push",
        });
      } else if (index == 2) {
        if (this.$store.state.theLogonUser.level != 0) {
          if (this.$store.state.theLogonUser.shop_id == 0) {
            uni.navigateTo({
              url: "/page_product/pages/mall/addMall",
            });
          } else if (this.$store.state.theLogonUser.shop_status == 1) {
            uni.navigateTo({
              url:
                "/page_product/pages/mall/index?id=" +
                this.$store.state.theLogonUser.shop_id +
                "&userId=" +
                this.$store.state.theLogonUser.id,
            });
          } else if (this.$store.state.theLogonUser.shop_status == 2) {
            uni.navigateTo({
              url:
                "/page_product/pages/mall/addMall?id=" +
                this.$store.state.theLogonUser.shop_id,
            });
          } else {
            uni.showToast({
              title: "工作室待审核",
              icon: "none",
            });
          }
        } else {
          this.$public.disabled_tip("工作室");
        }
      } else if (index == 3) {
        this.$public.disabled_tip("更多");
      } else {
        uni.navigateTo({
          url: "/page_product/pages/order/index",
        });
      }
    },
    //------------------------------------------------  接口请求  -----------------------------------------------------
    //------------------------------------------------  接口请求  -----------------------------------------------------
    //------------------------------------------------  接口请求  -----------------------------------------------------
    //获取我的二维码  返回：	文件流，base64加密，可以直接src里面显示
    getShareQrCode: function () {
      let _this = this;
      return new Promise(function (resolve, reject) {
        let that = _this;
        uni.request({
          url: that.$store.state.theUrl + "/wechat/sundry/getShareQrCode",
          method: "POST",
          header: {
            token: that.$store.state.theToken,
          },
          success: (res) => {
            // console.log('getShareQrCode', res);
            let _that = that;

            if (res.data.code == 0) {
              _that.erweima_img = res.data.data.img;

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
                // 重新获取登录人信息
                __that.theLogonUser = __that.$store.state.theLogonUser;

                // 获取省市数据
                __that.getShareQrCode();
              })();
            } else if (res.data.code == 411) {
              // let __that = _that;
              // uni.showModal({
              // 	title: '温馨提示：',
              // 	content: '需要认证用户才能申请个人邀请码，点击“去认证”继续吧~',
              // 	confirmText: '去认证',
              // 	confirmColor: '#f89f12',
              // 	showCancel: true,
              // 	success: function(res) {
              // 		if (res.confirm) {
              // 			__that.toRegister(0);
              // 		} else if (res.cancel) {
              // 		}
              // 	}
              // });
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

    //杂项统计数据，获取积分、粉丝数和点赞数
    getMyStatisticsNum: function () {
      let _this = this;
      return new Promise(function (resolve, reject) {
        let that = _this;
        uni.request({
          url: that.$store.state.theUrl + "/wechat/sundry/getMyStatisticsNum",
          method: "POST",
          header: {
            token: that.$store.state.theToken,
          },
          success: (res) => {
            // console.log('getMyStatisticsNum', res);
            let _that = that;

            if (res.data.code == 0) {
              _that.line_2_items[0].num = res.data.data.regard_num;
              _that.line_2_items[1].num = res.data.data.fans_num;
              _that.line_2_items[2].num = res.data.data.money_num;
              _that.line_2_items[3].num = res.data.data.score_num;
              _that.line_2_items[4].num = res.data.data.thumb_num;

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
                // 重新获取登录人信息
                __that.theLogonUser = __that.$store.state.theLogonUser;

                // 获取省市数据
                __that.getMyStatisticsNum();
                resolve();
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

    // 分页获取接口数据：没有再全局文件中放公共方法，是因为实际上传参都是不一致的，还是分开好
    getMomentsList: function (obj) {
      let _this = this;
      return new Promise(function (resolve, reject) {
        let that = _this;
        that.isLoading = "loading"; // 加载中
        if (that.school_datas.length < that.totalCount) {
          uni.request({
            url: that.$store.state.theUrl + "/wechat/moments/getMomentsList",
            method: "POST",
            header: {
              token: that.$store.state.theToken,
            },
            data: obj,
            success: (res) => {
              // console.log('getMomentsList_res', res);
              let _that = that;
              // 如果是请求第一页，证明是首次请求，就重置一下
              if (_that.theGetMomentsListPage == 1) {
                _that.school_datas = [];

                // 只有第一次请求的时候，也就是页码是1的时候，赋值一下总条数
                _that.totalCount = res.data.count;
              }

              if (res.data.code == 0) {
                if (res.data.data.length != 0) {
                  for (let i = 0; i < res.data.data.length; i++) {
                    _that.school_datas.push(res.data.data[i]);
                  }
                  _that.isLoading = "no-more"; // 取消加载动画
                  // 页面+1
                  _that.theGetMomentsListPage += 1;
                  resolve();
                } else {
                  _that.isLoading = "no-more"; // 取消加载动画
                  resolve();
                }
              } else if (res.data.code == 500) {
                uni.showToast({
                  title: "服务器连接失败，请反馈官方客服哦~",
                  duration: 2500,
                  icon: "none",
                });
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
          // console.log(222);
        }
      });
    },
  },
};
</script>

<style lang="scss">
.erweima_popup-box {
  padding: 25px 0;
  width: 85vw;
  background-color: #ffffff;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.popup-erweima {
  width: 65vw;
  height: 65vw;
  margin-top: 25px;
}

.popup-erweima-title {
  font-size: 16px;
  font-weight: bold;
  margin-top: 25px;
}

.popup-erweima-content {
  margin-top: 10px;
  font-size: 14px;
  color: #f89f12;
}

.back {
  position: absolute;
  top: 10px;
  right: 15px;
  z-index: 99999999;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.back text {
  font-size: 14px;
  color: #727272;
  margin-left: 5px;
}

.bg {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 778rpx;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("https://schoolwx.oss-cn-hangzhou.aliyuncs.com/school/img/v2/20240606/admin/93d40006fec76998aa820e7a274534ac.png");
  z-index: -1;
}

.margin-left-10 {
  margin-left: 20rpx;
}

.the-line-1 {
  display: flex;
  flex-direction: row;
  padding: 24rpx 30rpx 0;
}

.the-line-1-left {
  border-radius: 100%;
  width: 133rpx;
  height: 133rpx;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  background-color: #fafefb;
}

.the-line-1-right {
  width: calc(100% - 161rpx);
  margin-left: 28rpx;
}

.the-line-1-right-top {
  margin-top: 12rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.the-line-1-right-top-left {
  margin-left: 15px;
}

.the-line-1-right-top-left-name {
  font-family: PingFang SC;
  font-weight: 600;
  font-size: 38rpx;
  color: #333333;
}

.the-line-1-right-top-left-num {
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 22rpx;
  color: #666666;
  margin-top: 20rpx;
}

.erweima {
  width: 7vw;
  height: 7vw;
}

.the-line-1-right-bottom {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  overflow: scroll;
  margin-top: 20rpx;
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
  margin-top: 61rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  & > view {
    flex: 1;
  }
}

.the-line-2-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.the-line-2-item-num {
  font-family: DIN Alternate;
  font-weight: bold;
  font-size: 38rpx;
  color: #000000;
}

.the-line-2-item-name {
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 24rpx;
  color: #666666;
  margin-top: 24rpx;
}

.the-line-3 {
  padding: 0 26rpx;
  display: flex;
  flex-direction: column;
  margin-top: 49rpx;
  border-top-left-radius: 40rpx;
  border-top-right-radius: 40rpx;
  box-shadow: #e9f0ea 0 -5px 15px 0;
  background-color: #ffffff;
}

.the-line-3-top {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 23rpx;
  margin-top: 42rpx;
}

.the-line-3-top-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.the-line-3-top-item image {
  width: 48rpx;
  height: 48rpx;
}

.the-line-3-top-item view {
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 22rpx;
  color: #333333;
  margin-top: 20rpx;
}

.the-line-3-bottom {
  margin-top: 21rpx;
  width: 100%;
  height: 187rpx;
}

.the-line-4 {
  display: flex;
  flex-direction: row;
  width: 100vw;
  border-bottom: #f3f3f3 1px solid;
  background-color: #ffffff;
}

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
  font-size: 28rpx !important;
  color: #bbbbbb;
  margin-top: 30rpx;
}

.the-line-4-item-line {
  width: 90rpx;
  height: 6rpx;
  background-color: #f89f12;
  border-radius: 100px;
  margin-top: 30rpx;
}

.the-line-5 {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
}

.posts-data {
  width: 100vw !important;
}

.space-line-bottom {
  height: 250rpx;
}
.safe-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
.list-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 29rpx 30rpx 0;
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
</style>