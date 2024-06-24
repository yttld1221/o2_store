<template>
  <view class="search-result">
    <view class="top-fixd">
      <view class="top-search">
        <u-search
          placeholder="请输入搜索关键词"
          v-model="searchText"
          :showAction="true"
          actionText="取消"
          :clearabled="true"
          @change="changeText"
          @search="searchReasult"
          @custom="cancel"
        ></u-search>
      </view>
      <view class="type-container">
        <scroll-view
          class="scroll-view"
          scroll-x="true"
          scroll-with-animation="true"
        >
          <view
            class="type-item"
            @click="changeType(item, index)"
            v-for="(item, index) in titles"
            :key="index"
          >
            <view class="type-item-text">
              <text>{{ item }}</text>
              <view v-if="chooseIndex == index" class="short-line"></view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
    <view
      :class="{ 'al-box': titles[chooseIndex] == '分享/安利' }"
      class="list-container"
      :style="'margin-top:' + contentHeight + 'px;'"
    >
      <view
        :class="titles[chooseIndex] == '分享/安利' ? 'al-item' : 'posts-data'"
        :key="index"
        v-for="(item, index) in list"
      >
        <post-type-zudui
          compoentType="list"
          @toDetail="toDetail"
          @topPerSonalhome="topPerSonalhome"
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
  components: {},
  data() {
    return {
      inviteId: "",
      chooseIndex: 0,
      titles: [
        "全部",
        "话题",
        "组队/搭子",
        "分享/安利",
        "兼职",
        "表白",
        "求助",
        "其他",
      ],
      isLoading: "loading",
      // 当前获取的校园墙页码，每次需要+1
      theGetMomentsListPage: 1,
      theGetMomentsListPagesize: 10,
      searchText: "",
      contentText: {
        contentdown: "查看更多",
        contentrefresh: "加载中...",
        contentnomore: "到底了，可点击此处手动加载~",
      },
      list: [],
      contentHeight: 0,
    };
  },
  onLoad(options) {
    let query = uni.createSelectorQuery().in(this);
    query
      .select(".top-fixd")
      .boundingClientRect((data) => {
        this.contentHeight = data.height;
      })
      .exec();
    this.getList();
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
  onReachBottom() {
    // 触底后动画效果开启
    this.isLoading = "loading";
    this.getList();
  },
  methods: {
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
        for (let i = 0; i < this.list.length; i++) {
          if (option.id == this.list[i].id) {
            if (temp_is_thumb == 2) {
              // 使用$set响应的改变对象数据，第一个参数是对象本身，第二个参数是属性（记得加引号），第三个是改变后的值
              this.$set(this.list[i], "thumb_num", this.list[i].thumb_num + 1);
              this.$set(this.list[i], "is_thumb", 1);
              uni.showToast({
                title: "点赞成功",
                duration: 1000,
                icon: "none",
              });
            } else {
              this.$set(this.list[i], "thumb_num", this.list[i].thumb_num - 1);
              this.$set(this.list[i], "is_thumb", 2);
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
    //打开三个点的操作
    actionMore: function (option) {
      let that = this;
      let temp_is_collection = option.is_collection;
      let itemList = [
        option.is_collection == 2 ? "收藏" : "取消收藏",
        option.is_regard == 1 ? "取消关注" : "关注TA",
        "不看此类话题",
      ];
      if (this.$store.state.theLogonUser.id == option.create_id) {
        itemList.splice(1, 1);
      }
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
                for (let i = 0; i < _that.list.length; i++) {
                  if (option.id == _that.list[i].id) {
                    if (temp_is_collection == 2) {
                      // 使用$set响应的改变对象数据，第一个参数是对象本身，第二个参数是属性（记得加引号），第三个是改变后的值
                      _that.$set(_that.list[i], "is_collection", 1);
                      uni.showToast({
                        title: "收藏成功",
                        duration: 1000,
                        icon: "none",
                      });
                    } else {
                      _that.$set(_that.list[i], "is_collection", 2);
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
          } else if (["取消关注", "关注TA"].includes(itemList[res.tapIndex])) {
            this.followHandle(option);
          } else if (["不看此类话题"].includes(itemList[res.tapIndex])) {
            this.ignoreType(option);
          }
        },
        fail: function (res) {
          // console.log(res.errMsg);
        },
      });
    },
    // 忽略话题
    ignoreType(option) {
      this.API.home
        .addDelMyIgnoreType({
          ignore_type: option.type,
          type: 1,
        })
        .then((res) => {
          console.log(res.data);
          this.choiseOneTitle(0);
          uni.showToast({
            title: "操作成功",
            duration: 1000,
            icon: "none",
          });
        })
        .catch(async (err) => {
          if (err.code == 410) {
            await this.$store.dispatch("toLogon", {});
            this.ignoreType(option);
          }
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
            this.list[option.index],
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
          for (let i = 0; i < this.list.length; i++) {
            if (option.id == this.list[i].id) {
              if (temp_is_entry == 2) {
                // 使用$set响应的改变对象数据，第一个参数是对象本身，第二个参数是属性（记得加引号），第三个是改变后的值
                this.$set(
                  this.list[i],
                  "entry_num",
                  this.list[i].entry_num + 1
                );
                this.$set(this.list[i], "is_entry", 1);
                uni.showToast({
                  title: "加入成功",
                  duration: 1000,
                  icon: "none",
                });
              } else {
                this.$set(
                  this.list[i],
                  "entry_num",
                  this.list[i].entry_num - 1
                );
                this.$set(this.list[i], "is_entry", 2);
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
    // 跳转详情页
    toDetail: function (id) {
      uni.navigateTo({
        url: "/pages/index/detail?id=" + id,
      });
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
    changeType(item, index) {
      this.chooseIndex = index;
      this.searchReasult();
    },
    cancel() {
      uni.navigateBack({
        delta: 1,
      });
    },
    getList() {
      this.isLoading = "loading"; // 加载中
      let params = {
        page: this.theGetMomentsListPage,
        pagesize: this.theGetMomentsListPagesize,
        title: this.searchText,
        type: this.chooseIndex == 0 ? "" : this.titles[this.chooseIndex],
        // // 当前选中的学校id
        school_id: this.$store.state.store_schoolNow.id,
        // // 行政区划编码，选定的最低一级区域的编码，空字符串是全部
        area_code: this.$store.state.store_addressNow.code,
      };
      this.API.order
        .getMomentsList(params)
        .then((res) => {
          console.log(res);
          // 如果是请求第一页，证明是首次请求，就重置一下
          if (this.theGetMomentsListPage == 1) {
            this.list = [];
          }
          if (res.data.length != 0) {
            if (this.titles[this.chooseIndex] != "分享/安利") {
              res.data = res.data.filter((el) => el.type != "分享/安利");
            }
            for (let i = 0; i < res.data.length; i++) {
              this.list.push({
                ...res.data[i],
                img_url: res.data[i].url ? res.data[i].url.split(",")[0] : "",
              });
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
            this.getList();
          }
        });
    },
    searchReasult() {
      this.theGetMomentsListPage = 1;
      this.list = [];
      this.getList();
    },
  },
};
</script>
<style lang="scss">
.search-result {
  box-sizing: border-box;
  min-height: 100vh;
  background: #fafafa;
  overflow: hidden;
  .top-fixd {
    z-index: 5;
    background: #ffffff;
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    top: 0;
    .top-search {
      padding: 30rpx 30rpx 8rpx;
    }
    .type-container {
      padding: 0 30rpx;
      .scroll-view {
        white-space: nowrap;
        display: flex;
        height: 85rpx;
        .type-item {
          height: 85rpx;
          overflow: hidden;
          display: inline-block;
          margin-right: 67rpx;
          position: relative;
          .type-item-text {
            height: 85rpx;
            font-family: PingFang SC;
            font-weight: 500;
            font-size: 26rpx;
            color: #333333;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            & > text {
              margin-top: 8rpx;
            }
          }
        }
        .type-item:last-child {
          margin-right: 0;
        }
      }

      .short-line {
        position: absolute;
        bottom: 0;
        width: 40rpx;
        height: 8rpx;
        background: linear-gradient(270deg, #ffc974, #f89f12);
        border-radius: 200rpx;
      }
    }
  }
  .list-container {
    box-sizing: border-box;

    .posts-data {
      position: relative;
      z-index: 1;
      width: 100vw;
    }
  }
  .al-box {
    width: 100%;
    box-sizing: border-box;
    padding: 0 30rpx;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    .al-item {
      margin: 20rpx 0 0 0;
      border-radius: 2rpx 2rpx 0 0;
      padding: 0 10rpx;
      width: 50%;
      box-sizing: border-box;
      .compoent-al {
        & > image {
          width: 100%;
          height: 430rpx;
          border-radius: 2rpx 2rpx 0 0;
        }
      }
      &:nth-child(2n-1) {
        padding-left: 0;
      }
      &:nth-child(2n) {
        padding-right: 0;
      }
    }
  }
}
</style>