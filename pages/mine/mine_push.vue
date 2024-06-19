<template>
  <view class="content">
    <!-- 第四行：列表按钮 -->
    <view class="the-line-4">
      <view
        :key="index"
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

    <!-- 内容 -->
    <view :style="'margin-top:' + contentHeight + 'px;'">
      <view
        :key="index"
        class="posts-data"
        v-for="(item, index) in school_datas"
      >
        <post-type-zudui
          :showPhone="false"
          @toJzDetail="toJzDetail"
          @toDetail="toDetail"
          @actionMore="actionMore"
          :isMine="true"
          :postsDataOneIndex="1"
          :theData="item"
        ></post-type-zudui>
      </view>
    </view>
    <!-- 底部垫层 -->
    <view @click="getMomentsList()" class="space-line-bottom">
      <uni-load-more
        :status="isLoading"
        :content-text="contentText"
      ></uni-load-more>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 用于 uni-load-more
      contentText: {
        contentdown: "查看更多",
        contentrefresh: "加载中...",
        contentnomore: "到底了，可点击此处手动加载~",
      },

      theIsOnIndex: 0,

      //
      line_4_items: ["全部", "已上线的", "草稿箱"],
      line_4_items_index: 0,

      // 最后的加载组件的加载动画效果，
      isLoading: "loading",

      // 用于分页加载传参
      // 当前获取的校园墙页码，每次需要+1
      theGetMomentsListPage: 1,
      theGetMomentsListPagesize: 5,

      school_datas: [],
      contentHeight: 0,
    };
  },
  onLoad() {
    let query = uni.createSelectorQuery().in(this);
    query
      .select(".the-line-4")
      .boundingClientRect((data) => {
        this.contentHeight = data.height;
      })
      .exec();
    this.theGetMomentsListPage = 1;
    this.getMomentsList();
  },
  // 监听下拉动作
  onPullDownRefresh() {
    // 重置获取的页码
    this.theGetMomentsListPage = 1;
    // 重置数组
    this.school_datas = [];
    // 异步转同步调用
    (async () => {
      await this.getMomentsList();
      // 等待接口返回后，取消下拉刷新动画
      uni.stopPullDownRefresh();
    })();
  },
  onShow() {
    // --------------------------------------------------------------调用初始数据--------------------------------------------------------------
    // --------------------------------------------------------------调用初始数据--------------------------------------------------------------
    // --------------------------------------------------------------调用初始数据--------------------------------------------------------------
  },
  // 页面触底的监听事件，配合pages.json中的"onReachBottomDistance": 0，0的位置写距离底部的距离
  onReachBottom() {
    // 触底后动画效果开启
    this.isLoading = "loading";

    // 调用接口
    this.getMomentsList();
  },
  methods: {
    // 切换状态
    line_4_itemsSelected: function (index) {
      // console.log(1111111);
      this.line_4_items_index = index;
      this.theIsOnIndex = index;
      this.school_datas = [];
      this.theGetMomentsListPage = 1;
      this.getMomentsList();
    },
    // 个人主页兼职不可以展示联系按钮
    toJzDetail: function (id) {
      console.log(id);
      let url = "/pages/index/detail?id=" + id;
      url += "&noPhone=1";
      let index = this.school_datas.findIndex((el) => el.id == id);
      if (index > -1) {
        url += this.school_datas[index].is_on == 1 ? "" : "&noMore=1";
      }
      uni.navigateTo({
        url,
      });
    }, // 跳转详情页
    toDetail: function (id) {
      console.log(id);
      let url = "/pages/index/detail?id=" + id;
      let index = this.school_datas.findIndex((el) => el.id == id);
      if (index > -1) {
        url += this.school_datas[index].is_on == 1 ? "" : "&noMore=1";
      }
      uni.navigateTo({
        url,
      });
    },
    //打开三个点的操作
    actionMore: function (option) {
      let that = this;
      let itemList = [option.is_on == 1 ? "下线撤回" : "上线发布"];
      if (option.is_on == 2) {
        itemList.unshift("编辑");
      }
      uni.showActionSheet({
        itemList,
        itemColor: "#333333",
        success: (res) => {
          // console.log(res.tapIndex);
          if (["下线撤回", "上线发布"].includes(itemList[res.tapIndex])) {
            this.toOn(option);
          } else if (["编辑"].includes(itemList[res.tapIndex])) {
            uni.navigateTo({
              url:
                "/page_product/pages/push/index?type=" +
                option.type +
                "&id=" +
                option.id,
            });
          }
        },
        fail: function (res) {
          // console.log(res.errMsg);
        },
      });
    },

    // 上下线
    toOn: async function (option) {
      // 每次调用前先重置一下
      this.$store.state.isOn_true = false;

      if (option.is_on == 1) {
        // 表示当前是上线，点击的目的是为了下线
        await this.$store.dispatch("upDownMyMoments", {
          id: option.id,
          is_on: 2,
          type: "发布管理",
        });
        if (this.$store.state.isOn_true == true) {
          // 调用成功
          this.line_4_itemsSelected(2); // 操作成功，就跳转草稿页
        }
      } else {
        await this.$store.dispatch("upDownMyMoments", {
          id: option.id,
          is_on: 1,
          type: "发布管理",
        });
        if (this.$store.state.isOn_true == true) {
          // 调用成功
          this.line_4_itemsSelected(1); // 操作成功，就跳转已上线页
        }
      }
    },
    //------------------------------------------------  接口方法  -----------------------------------------------------
    //------------------------------------------------  接口方法  -----------------------------------------------------
    //------------------------------------------------  接口方法  -----------------------------------------------------
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
            create_id: that.$store.state.theLogonUser.id,

            // 传参不全，当前只用到onload时候需要的字段
            page: that.theGetMomentsListPage,
            pagesize: that.theGetMomentsListPagesize,
            // 校园墙类型：话题、组队/搭子、分享/安利、二手闲置、兼职、表白、求助、其他，传空字符串为全部
            // schoolOneTitleIndex == 0 表示是综合，就是全部的意思，所以传空
            // type:(that.schoolOneTitleIndex == 0 ?'':that.titles[that.schoolOneTitleIndex]),
            type: "",
            // 是否上线 是否上线，1-是（默认），2-草稿，0-全部
            is_on: that.theIsOnIndex,
          },
          success: (res) => {
            // console.log('getMomentsList_res', res);
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
                console.log("_that.school_datas", _that.school_datas);
                _that.isLoading = "no-more"; // 取消加载动画
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
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.the-line-4 {
  z-index: 10;
  display: flex;
  flex-direction: row;
  width: 100vw;
  border-bottom: #f3f3f3 1px solid;
  background-color: #ffffff;
  position: fixed;
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
  margin-top: 10px;
  color: #bbbbbb;
  height: 25px;
  line-height: 25px;
}

.the-line-4-item-line {
  width: 25%;
  height: 3px;
  background-color: #f89f12;
  border-radius: 100px;
  margin-top: 7px;
}

.posts-data {
  width: 100vw;
}

.space-line-bottom {
  margin: 30rpx 0;
}
</style>